import { useState, useCallback, useEffect } from 'react';
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
} from '@/components/scan';
import type { ScanMode } from '@/components/scan/ScanTabSwitcher';

type PageState = 'idle' | 'processing' | 'result';

const MOCK_RESULT = {
  merchant: 'Superindo',
  amount: 188_000,
  date: 'May 1st, 2026',
  category: 'Groceries',
  paymentMethod: 'Debit - BCA',
  confidence: 94,
};

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : false,
  );

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return isDesktop;
};

const ScanStrukPage = () => {
  const isDesktop = useIsDesktop();
  const [mode, setMode] = useState<ScanMode>('scan');
  const [state, setState] = useState<PageState>('idle');
  const [preview, setPreview] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [reviewDrawerOpen, setReviewDrawerOpen] = useState(false);

  const handleFileSelect = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    setPreview(url);
    setState('processing');
    setProgress(0);
  }, []);

  useEffect(() => {
    if (state !== 'processing') return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.round(Math.random() * 12 + 5);
        if (next >= 100) {
          clearInterval(interval);
          setState('result');
          if (!isDesktop) setReviewDrawerOpen(true);
          return 100;
        }
        return next;
      });
    }, 300);

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const handleReset = () => {
    setState('idle');
    setPreview(null);
    setProgress(0);
    setReviewDrawerOpen(false);
  };

  const handleModeChange = (newMode: ScanMode) => {
    setMode(newMode);
    handleReset();
  };

  return (
    <>
      {/* mobile view */}
      <div className="lg:hidden -m-4 sm:-m-5 md:-m-6 -mb-20 flex flex-col h-[calc(100vh-3.5rem-4rem)] sm:h-[calc(100vh-4rem-4rem)]">
        {/* Tabs */}
        <div className="relative z-30 px-3 pt-3 pb-2 sm:px-4 sm:pt-4">
          <ScanTabSwitcher active={mode} onChange={handleModeChange} />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col min-h-0">
          {state === 'idle' && mode === 'scan' && (
            <div className="flex-1 min-h-0">
              <ScanCameraView onCapture={handleFileSelect} />
            </div>
          )}

          {state === 'idle' && mode === 'gallery' && (
            <div className="flex-1 flex flex-col px-4 pb-4 min-h-0">
              <div className="flex-1 flex items-center justify-center">
                <ScanUploadZone onFileSelect={handleFileSelect} />
              </div>
            </div>
          )}

          {state === 'idle' && mode === 'manual' && (
            <div className="flex-1 overflow-y-auto px-4 pb-4 sm:px-5 min-h-0">
              <ScanManualInput />
            </div>
          )}

          {state === 'processing' && preview && (
            <div className="flex-1 flex flex-col items-center justify-center px-4 pb-4 min-h-0">
              <ScanProcessing
                preview={preview}
                progress={Math.min(progress, 100)}
              />
            </div>
          )}

          {state === 'result' && preview && (
            <div className="flex-1 flex items-center justify-center px-4 pb-4 min-h-0">
              <img
                src={preview}
                alt="Scanned receipt"
                className="max-h-full w-auto rounded-xl object-contain shadow-md"
              />
            </div>
          )}
        </div>

        {/* Review drawer */}
        {!isDesktop && (
          <ScanMobileReviewDrawer
            open={reviewDrawerOpen}
            onOpenChange={setReviewDrawerOpen}
            data={MOCK_RESULT}
            onSave={handleReset}
            onRetake={handleReset}
          />
        )}
      </div>

      {/* desktop view */}
      <div className="hidden lg:block space-y-8">
        <PageHeader
          title="Scan & Input Transaction"
          description="Automatically scan your receipts, import from gallery, or input transactions manually."
        />

        <ScanTabSwitcher active={mode} onChange={handleModeChange} />

        {mode === 'manual' ? (
          <ScanManualInput />
        ) : (
          <>
            <div className="xl:grid xl:grid-cols-5 xl:items-stretch xl:gap-6 space-y-4 xl:space-y-0">
              {/* Left col */}
              <div className="flex flex-col gap-4 xl:col-span-3">
                {state === 'idle' && mode === 'scan' && (
                  <div className="h-112">
                    <ScanCameraView onCapture={handleFileSelect} />
                  </div>
                )}

                {state === 'idle' && mode === 'gallery' && (
                  <ScanUploadZone onFileSelect={handleFileSelect} />
                )}

                {state === 'processing' && preview && (
                  <ScanProcessing
                    preview={preview}
                    progress={Math.min(progress, 100)}
                    onCancel={handleReset}
                  />
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
                {state === 'result' ? (
                  <ScanExtractionResult
                    data={MOCK_RESULT}
                    onSave={handleReset}
                    onDiscard={handleReset}
                  />
                ) : (
                  <div className="hidden xl:flex h-full flex-1 items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 p-8">
                    <div className="flex flex-col items-center text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                        <svg className="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
                        </svg>
                      </div>
                      <p className="mt-3 text-sm font-medium text-muted-foreground">
                        Extraction result will appear here
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground/70">
                        Upload or capture a receipt to get started
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ScanStrukPage;
