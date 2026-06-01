import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { scansApi } from '@/api';
import type { ScanResult } from '@/types';

export type ScanPageState = 'idle' | 'processing' | 'result';

const POLL_INTERVAL_MS = 3000;
const POLL_TIMEOUT_MS = 180_000;

interface UseScanUploadOptions {
  onCompleted?: () => void;
}

export function useScanUpload({ onCompleted }: UseScanUploadOptions = {}) {
  const [state, setState] = useState<ScanPageState>('idle');
  const [preview, setPreview] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [scanId, setScanId] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);

  const pollAbortRef = useRef<{ cancelled: boolean } | null>(null);

  const cancelPolling = useCallback(() => {
    if (pollAbortRef.current) {
      pollAbortRef.current.cancelled = true;
      pollAbortRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    cancelPolling();
    if (scanId) {
      scansApi.delete(scanId).catch(() => { /* best-effort */ });
    }
    setState('idle');
    setPreview(null);
    setProgress(0);
    setScanId(null);
    setScanResult(null);
  }, [cancelPolling, scanId]);

  const finalize = useCallback(() => {
    cancelPolling();
    setState('idle');
    setPreview(null);
    setProgress(0);
    setScanId(null);
    setScanResult(null);
  }, [cancelPolling]);

  // Smooth progress animation while polling
  useEffect(() => {
    if (state !== 'processing') return;
    const id = setInterval(() => {
      setProgress((prev) => (prev >= 95 ? prev : prev + Math.round(Math.random() * 6 + 2)));
    }, 350);
    return () => clearInterval(id);
  }, [state]);

  const upload = useCallback(async (file: File) => {
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

          if (result.status === 'completed' || result.status === 'failed') {
            if (result.status === 'failed') {
              toast.error('AI could not extract data from this receipt. Please fill in manually.');
            }
            setScanResult(result);
            setProgress(100);
            setState('result');
            onCompleted?.();
            return;
          }
        } catch {
          // transient — keep polling silently
        }
        await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
      }
    };

    poll();
  }, [cancelPolling, onCompleted]);

  useEffect(() => {
    return () => { cancelPolling(); };
  }, [cancelPolling]);

  return {
    state,
    preview,
    progress: Math.min(progress, 100),
    scanId,
    scanResult,
    upload,
    reset,
    finalize,
  };
}
