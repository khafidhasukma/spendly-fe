import { useState, useCallback, useEffect, useRef } from 'react';
import { toast } from 'sonner';
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
import { usePageTitle } from '@/hooks';
import type { ScanMode } from '@/components/scan/ScanTabSwitcher';
import { scansApi, type ScanResult } from '@/api/endpoints/scans';

type PageState = 'idle' | 'processing' | 'result';

const POLL_INTERVAL_MS = 1500;
const POLL_TIMEOUT_MS = 60_000; // 60s safety timeout

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
  usePageTitle('Scan Receipt');
  const isDesktop = useIsDesktop();
  const [mode, setMode] = useState<ScanMode>('scan');
  const [state, setState] = useState<PageState>('idle');
  const [preview, setPreview] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [reviewDrawerOpen, setReviewDrawerOpen] = useState(false);
  const [scanId, setScanId] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);

  // Track in-flight polling so we can cancel cleanly on reset/unmount
  const pollAbortRef = useRef<{ cancelled: boolean } | null>(null);

  // Reusable cleanup
  const cancelPolling = useCallback(() => {
    if (pollAbortRef.current) {
      pollAbortRef.current.cancelled = true;
      pollAbortRef.current = null;
    }
  }, []);

  const handleReset = useCallback(() => {
    cancelPolling();
    // Best-effort: delete the scan if it exists and we never confirmed
    if (scanId) {
      scansApi.delete(scanId).catch(() => { /* ignore */ });
    }
    setState('idle');
    setPreview(null);
    setProgress(0);
    setReviewDrawerOpen(false);
    setScanId(null);
    setScanResult(null);
  }, [cancelPolling, scanId]);

  // Smooth progress animation while polling
  useEffect(() => {
    if (state !== 'processing') return;
    const id = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev; // hold at 95% until result arrives
        return prev + Math.round(Math.random() * 6 + 2);
      });
    }, 350);
    return () => clearInterval(id);
  }, [state]);

  // Upload + poll flow
  const handleFileSelect = useCallback(async (file: File) => {
    const url = URL.createObjectURL(file);
    setPreview(url);
    setState('processing');
    setProgress(5);

    let uploaded;
    try {
      uploaded = await scansApi.upload(file);
      setScanId(uploaded.scan_id);
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Failed to upload receipt';
      toast.error(message);
      setState('idle');
      setPreview(null);
      return;
    }

    // Begin polling for AI processing result
    cancelPolling();
    const token = { cancelled: false };
    pollAbortRef.current = token;

    const startedAt = Date.now();

    const poll = async () => {
      while (!token.cancelled) {
        if (Date.now() - startedAt > POLL_TIMEOUT_MS) {
          toast.error('Scan is taking too long. Please try again.');
          if (!token.cancelled) {
            setState('idle');
            setPreview(null);
            setScanId(null);
          }
          return;
        }

        try {
          const result = await scansApi.getById(uploaded.scan_id);
          if (token.cancelled) return;

          if (result.status === 'completed') {
            setScanResult(result);
            setProgress(100);
            setState('result');
            if (!isDesktop) setReviewDrawerOpen(true);
            return;
          }

          if (result.status === 'failed') {
            toast.error('AI could not extract data from this receipt. Please fill in manually.');
            setScanResult(result); // still show form so user can fill it
            setProgress(100);
            setState('result');
            if (!isDesktop) setReviewDrawerOpen(true);
            return;
          }
        } catch {
          // transient error — keep polling silently
        }

        await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
      }
    };

    poll();
  }, [cancelPolling, isDesktop]);

  // Cleanup polling on unmount
  useEffect(() => {
    return () => { cancelPolling(); };
  }, [cancelPolling]);

  const handleSaveTransaction = useCallback(() => {
    // After confirm() succeeds, the child component calls this.
    // We don't delete here — the scan is already linked to a transaction.
    cancelPolling();
    setState('idle');
    setPreview(null);
    setProgress(0);
    setReviewDrawerOpen(false);
    setScanId(null);
    setScanResult(null);
  }, [cancelPolling]);

  const handleModeChange = (newMode: ScanMode) => {
    setMode(newMode);
    handleReset();
  };

  return (
    <>
      {/* Mobile view  */}
      <div className="lg:hidden flex flex-col h-full relative">
        {/* Tabs overlaid on top */}
        <div className="absolute top-0 inset-x-0 z-20 px-4 pt-8 pb-2 bg-linear-to-b from-black/60 via-black/30 to-transparent">
          <ScanTabSwitcher active={mode} onChange={handleModeChange} />
        </div>

        {/* Content fills the area */}
        <div className="flex-1 flex flex-col min-h-0">
          {state === 'idle' && mode === 'scan' && (
            <div className="flex-1 min-h-0">
              <ScanCameraView onCapture={handleFileSelect} />
            </div>
          )}

          {state === 'idle' && mode === 'manual' && (
            <div className="flex-1 overflow-y-auto px-4 pt-16 pb-4 sm:px-5 min-h-0 bg-background">
              <ScanManualInput />
            </div>
          )}

          {state === 'processing' && preview && (
            <div className="flex-1 flex flex-col items-center justify-center px-4 pb-4 min-h-0 bg-background">
              <ScanProcessing
                preview={preview}
                progress={Math.min(progress, 100)}
                onCancel={handleReset}
              />
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

        {/* Review drawer */}
        {!isDesktop && scanId && (
          <ScanMobileReviewDrawer
            open={reviewDrawerOpen}
            onOpenChange={setReviewDrawerOpen}
            scanId={scanId}
            scanResult={scanResult}
            onSave={handleSaveTransaction}
            onRetake={handleReset}
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
                {state === 'result' && scanId ? (
                  <ScanExtractionResult
                    scanId={scanId}
                    scanResult={scanResult}
                    onSave={handleSaveTransaction}
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
