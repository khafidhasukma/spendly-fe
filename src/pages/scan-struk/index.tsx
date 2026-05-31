import { useEffect, useState } from 'react';
import PageHeader from '@/components/ui/page-header';
import {
  ScanUploadZone,
  ScanCameraView,
  ScanProcessing,
  ScanExtractionResult,
  ScanFeatureCards,
  ScanManualInput,
  ScanTabSwitcher,
  ScanMobileReviewDrawer,
  ScanResultPlaceholder,
} from '@/components/scan';
import { usePageTitle, useIsDesktop } from '@/hooks';
import type { ScanMode } from '@/components/scan/ScanTabSwitcher';
import { useScanUpload } from '@/features/scan';

const ScanStrukPage = () => {
  usePageTitle('Scan Receipt');
  const isDesktop = useIsDesktop();
  const [mode, setMode] = useState<ScanMode>('scan');
  const [reviewDrawerOpen, setReviewDrawerOpen] = useState(false);

  const { state, preview, progress, scanId, scanResult, upload, reset, finalize } = useScanUpload({
    onCompleted: () => {
      if (!isDesktop) setReviewDrawerOpen(true);
    },
  });

  useEffect(() => {
    if (state === 'idle') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setReviewDrawerOpen(false);
    }
  }, [state]);

  const handleSaveTransaction = () => {
    finalize();
    setReviewDrawerOpen(false);
  };

  const handleModeChange = (newMode: ScanMode) => {
    setMode(newMode);
    reset();
  };

  return (
    <>
      {/* Mobile view */}
      <div className="lg:hidden flex flex-col h-full relative">
        <div className="absolute top-0 inset-x-0 z-20 px-4 pt-8 pb-2 bg-linear-to-b from-black/60 via-black/30 to-transparent">
          <ScanTabSwitcher active={mode} onChange={handleModeChange} />
        </div>

        <div className="flex-1 flex flex-col min-h-0">
          {state === 'idle' && mode === 'scan' && (
            <div className="flex-1 min-h-0">
              <ScanCameraView onCapture={upload} />
            </div>
          )}

          {state === 'idle' && mode === 'manual' && (
            <div className="flex-1 overflow-y-auto px-4 pt-16 pb-4 sm:px-5 min-h-0 bg-background">
              <ScanManualInput />
            </div>
          )}

          {state === 'processing' && preview && (
            <div className="flex-1 flex flex-col items-center justify-center px-4 pb-4 min-h-0 bg-background">
              <ScanProcessing preview={preview} progress={progress} onCancel={reset} />
            </div>
          )}

          {state === 'result' && preview && (
            <div className="flex-1 flex items-center justify-center px-4 pb-4 min-h-0 bg-background">
              <img
                src={preview}
                alt="Scanned receipt"
                className="max-h-full w-full rounded-xl object-contain shadow-md"
              />
            </div>
          )}
        </div>

        {!isDesktop && scanId && (
          <ScanMobileReviewDrawer
            open={reviewDrawerOpen}
            onOpenChange={setReviewDrawerOpen}
            scanId={scanId}
            scanResult={scanResult}
            onSave={handleSaveTransaction}
            onRetake={reset}
          />
        )}
      </div>

      {/* Desktop view */}
      <div className="hidden lg:block space-y-8">
        <PageHeader
          title="Scan & Input Transaction"
          description="Automatically scan your receipts, import from gallery, or input transactions manually."
        />

        <ScanTabSwitcher active={mode} onChange={handleModeChange} />

        {mode === 'manual' ? (
          <ScanManualInput />
        ) : (
          <div className="xl:grid xl:grid-cols-5 xl:items-stretch xl:gap-6 space-y-4 xl:space-y-0">
            {/* Left col */}
            <div className="flex flex-col gap-4 xl:col-span-3">
              {state === 'idle' && mode === 'scan' && (
                <div className="h-112">
                  <ScanCameraView onCapture={upload} />
                </div>
              )}

              {state === 'idle' && mode === 'gallery' && (
                <ScanUploadZone onFileSelect={upload} />
              )}

              {state === 'processing' && preview && (
                <ScanProcessing preview={preview} progress={progress} onCancel={reset} />
              )}

              {state === 'result' && preview && (
                <div className="overflow-hidden rounded-2xl border border-border bg-muted/20 p-6">
                  <img
                    src={preview}
                    alt="Scanned receipt"
                    className="mx-auto max-h-96 rounded-lg object-contain"
                  />
                </div>
              )}

              <ScanFeatureCards />
            </div>

            {/* Right col */}
            <div className="flex h-full flex-col xl:col-span-2">
              {state === 'result' && scanId ? (
                <ScanExtractionResult
                  scanId={scanId}
                  scanResult={scanResult}
                  onSave={handleSaveTransaction}
                  onDiscard={reset}
                />
              ) : (
                <ScanResultPlaceholder />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ScanStrukPage;
