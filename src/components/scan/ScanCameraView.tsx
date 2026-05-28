import { useRef, useState, useCallback, useEffect } from 'react';
import { Camera, VideoOff, Maximize, Minimize, Zap, ZapOff, ImagePlus } from 'lucide-react';

interface ScanCameraViewProps {
  onCapture: (file: File) => void;
}

const ScanCameraView = ({ onCapture }: ScanCameraViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const trackRef = useRef<MediaStreamTrack | null>(null);

  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [torchOn, setTorchOn] = useState(false);
  const [torchSupported, setTorchSupported] = useState(false);
  const [capturing, setCapturing] = useState(false);

  // Start camera — always use back camera, exclude ultra-wide/0.5x
  const startCamera = useCallback(async () => {
    // Stop existing stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
      trackRef.current = null;
    }

    try {
      // Step 1: Get initial permission with a simple request
      const probeStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' } },
        audio: false,
      });
      probeStream.getTracks().forEach((t) => t.stop());

      // Step 2: Enumerate devices to find the main back camera (not 0.5x/ultra-wide)
      let deviceId: string | undefined;
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoInputs = devices.filter((d) => d.kind === 'videoinput');

        // Filter back-facing cameras
        const back = videoInputs.filter((d) =>
          /back|rear|environment/i.test(d.label),
        );

        if (back.length > 0) {
          // Exclude ultra-wide / 0.5x / wide-angle cameras
          const main = back.find(
            (d) => !/ultra|wide|tele|0\.5|0,5|macro/i.test(d.label),
          );
          deviceId = main?.deviceId ?? back[0]?.deviceId;
        }
      } catch {
        // ignore
      }

      // Step 3: Open the camera with high resolution
      let stream: MediaStream;
      const baseConstraints = deviceId
        ? { deviceId: { exact: deviceId } }
        : { facingMode: { exact: 'environment' as const } };

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            ...baseConstraints,
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          },
          audio: false,
        });
      } catch {
        // Fallback without resolution constraints
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            video: baseConstraints,
            audio: false,
          });
        } catch {
          // Last resort
          stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: { ideal: 'environment' } },
            audio: false,
          });
        }
      }

      streamRef.current = stream;
      const track = stream.getVideoTracks()[0];
      trackRef.current = track;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      // Apply continuous autofocus
      if (track) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await track.applyConstraints({ advanced: [{ focusMode: 'continuous' } as any] });
        } catch {
          // not supported
        }

        // Detect torch support
        const detectTorch = () => {
          try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const caps = track.getCapabilities() as any;
            if (caps?.torch) {
              setTorchSupported(true);
            }
          } catch {
            // ignore
          }
        };

        detectTorch();
        // Some devices need a delay before capabilities are reported
        setTimeout(detectTorch, 500);
        setTimeout(detectTorch, 1500);
      }

      setReady(true);
      setError(false);
    } catch {
      setError(true);
      setReady(false);
    }
  }, []);

  // Initialize camera on mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fullscreen listener
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      await containerRef.current.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  }, []);

  // Toggle torch (flash LED) on/off
  const toggleTorch = useCallback(async () => {
    const track = trackRef.current;
    if (!track) return;
    const next = !torchOn;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await track.applyConstraints({ advanced: [{ torch: next } as any] });
      setTorchOn(next);
    } catch {
      // If it fails, torch is not actually supported
      setTorchSupported(false);
    }
  }, [torchOn]);

  // Tap-to-focus
  const handleTapToFocus = useCallback(async () => {
    const track = trackRef.current;
    if (!track) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await track.applyConstraints({ advanced: [{ focusMode: 'manual' } as any] });
      setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        track.applyConstraints({ advanced: [{ focusMode: 'continuous' } as any] }).catch(() => {});
      }, 150);
    } catch {
      // ignore
    }
  }, []);

  /**
   * Capture photo using ImageCapture API for max resolution.
   * The torch stays on during capture if enabled (no need for fillLightMode).
   * Falls back to canvas if ImageCapture is unavailable.
   */
  const handleCapture = useCallback(async () => {
    const track = trackRef.current;
    const video = videoRef.current;
    if (!track || !video) return;

    setCapturing(true);

    try {
      let blob: Blob | null = null;

      // Method 1: ImageCapture API — captures at full sensor resolution
      if (typeof ImageCapture !== 'undefined') {
        const imageCapture = new ImageCapture(track);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const photoSettings: any = {};

        // Request maximum photo resolution
        try {
          const capabilities = await imageCapture.getPhotoCapabilities();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const caps = capabilities as any;
          if (caps.imageWidth?.max) photoSettings.imageWidth = caps.imageWidth.max;
          if (caps.imageHeight?.max) photoSettings.imageHeight = caps.imageHeight.max;
        } catch {
          // use defaults
        }

        blob = await imageCapture.takePhoto(photoSettings);
      }

      // Method 2: Canvas fallback
      if (!blob) {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0);
          blob = await new Promise<Blob | null>((resolve) => {
            canvas.toBlob((b) => resolve(b), 'image/jpeg', 0.95);
          });
        }
      }

      if (blob) {
        const file = new File([blob], `receipt-${Date.now()}.jpg`, { type: 'image/jpeg' });
        // Turn off torch before leaving
        if (torchOn && trackRef.current) {
          try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            await trackRef.current.applyConstraints({ advanced: [{ torch: false } as any] });
          } catch { /* ignore */ }
        }
        streamRef.current?.getTracks().forEach((t) => t.stop());
        if (document.fullscreenElement) document.exitFullscreen();
        onCapture(file);
      }
    } catch {
      // Fallback canvas capture
      try {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0);
          canvas.toBlob((b) => {
            if (b) {
              const file = new File([b], `receipt-${Date.now()}.jpg`, { type: 'image/jpeg' });
              streamRef.current?.getTracks().forEach((t) => t.stop());
              if (document.fullscreenElement) document.exitFullscreen();
              onCapture(file);
            }
          }, 'image/jpeg', 0.95);
        }
      } catch {
        // ignore
      }
    } finally {
      setCapturing(false);
    }
  }, [onCapture, torchOn]);

  const handleGallerySelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    onCapture(file);
  }, [onCapture]);

  if (error) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/20 px-6 py-16 sm:py-20 lg:rounded-2xl">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <VideoOff className="h-7 w-7 text-destructive" />
        </div>
        <p className="mt-4 text-sm font-medium text-foreground">Camera not available</p>
        <p className="mt-1 max-w-xs text-center text-xs text-muted-foreground">
          Please allow camera access in your browser settings, or switch to the Manual tab to input manually.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden bg-black lg:rounded-2xl lg:border-2 lg:border-primary/30"
    >
      {/* Live camera feed — never mirrored */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        onClick={handleTapToFocus}
        className="block h-full w-full object-cover"
      />

      {/* Loading state */}
      {!ready && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            <span className="text-xs text-white/70">Starting camera...</span>
          </div>
        </div>
      )}

      {/* Capture flash effect */}
      {capturing && (
        <div className="absolute inset-0 bg-white/80 animate-pulse pointer-events-none z-30" />
      )}

      {/* Viewfinder overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Hint text at the top */}
        <div className="absolute inset-x-0 top-30 flex justify-center sm:top-18 lg:top-8">
          <span className="rounded-full bg-black/50 backdrop-blur-sm px-4 py-2 text-[10px] uppercase tracking-widest text-white/80 sm:text-xs">
            Align receipt within the frame
          </span>
        </div>

        {/* Corner brackets */}
        <div className="absolute left-6 top-28 h-14 w-14 border-l-3 border-t-3 border-white/80 rounded-tl-lg sm:left-10 sm:top-32 sm:h-16 sm:w-16 lg:left-12 lg:top-16" />
        <div className="absolute right-6 top-28 h-14 w-14 border-r-3 border-t-3 border-white/80 rounded-tr-lg sm:right-10 sm:top-32 sm:h-16 sm:w-16 lg:right-12 lg:top-16" />
        <div className="absolute bottom-32 left-6 h-14 w-14 border-b-3 border-l-3 border-white/80 rounded-bl-lg sm:bottom-36 sm:left-10 sm:h-16 sm:w-16 lg:bottom-24 lg:left-12" />
        <div className="absolute bottom-32 right-6 h-14 w-14 border-b-3 border-r-3 border-white/80 rounded-br-lg sm:bottom-36 sm:right-10 sm:h-16 sm:w-16 lg:bottom-24 lg:right-12" />

        {/* Scan line animation */}
        <div className="absolute left-8 right-8 top-30 bottom-34 overflow-hidden sm:left-12 sm:right-12 sm:top-34 sm:bottom-38 lg:left-14 lg:right-14 lg:top-18 lg:bottom-26">
          <div className="absolute inset-x-0 h-0.5 bg-linear-to-r from-transparent via-emerald-400 to-transparent animate-scan-line" />
        </div>
      </div>

      {/* Bottom controls area */}
      <div className="absolute bottom-0 inset-x-0 flex items-end justify-between px-6 pb-5 pt-20 bg-linear-to-t from-black/80 via-black/40 to-transparent sm:px-8 sm:pb-6 lg:px-10 lg:pb-8">
        {/* Left: Gallery button (mobile) */}
        <div className="flex flex-col items-center gap-1 lg:hidden">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 text-white transition-colors hover:bg-white/25"
            aria-label="Choose from gallery"
          >
            <ImagePlus className="h-5 w-5" />
          </button>
          <span className="text-[9px] uppercase tracking-wide text-white/70 font-medium">Gallery</span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleGallerySelect}
          />
        </div>

        {/* Left: Flash toggle (desktop) */}
        <button
          type="button"
          onClick={toggleTorch}
          disabled={!torchSupported}
          className="hidden lg:flex h-11 w-11 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white transition-colors hover:bg-white/25 disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label={torchOn ? 'Turn off flash' : 'Turn on flash'}
        >
          {torchOn ? <Zap className="h-5 w-5 text-yellow-400" /> : <ZapOff className="h-5 w-5" />}
        </button>

        {/* Center: Capture */}
        <button
          type="button"
          onClick={handleCapture}
          disabled={capturing || !ready}
          className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-white/20 backdrop-blur-sm transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 sm:h-18 sm:w-18"
          aria-label="Capture receipt"
        >
          <Camera className="h-6 w-6 text-white sm:h-7 sm:w-7" />
        </button>

        {/* Right: Flash toggle (mobile) */}
        <div className="flex flex-col items-center gap-1 lg:hidden">
          <button
            type="button"
            onClick={toggleTorch}
            disabled={!torchSupported}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 text-white transition-colors hover:bg-white/25 active:scale-95 disabled:opacity-30"
            aria-label={torchOn ? 'Turn off flash' : 'Turn on flash'}
          >
            {torchOn ? <Zap className="h-5 w-5 text-yellow-400" /> : <ZapOff className="h-5 w-5" />}
          </button>
          <span className="text-[9px] uppercase tracking-wide text-white/70 font-medium">Flash</span>
        </div>

        {/* Right: Fullscreen (desktop only) */}
        <button
          type="button"
          onClick={toggleFullscreen}
          className="hidden lg:flex h-11 w-11 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white transition-colors hover:bg-white/25"
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        >
          {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
        </button>
      </div>

      {/* Flash indicator */}
      {torchOn && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 rounded-full bg-yellow-500/20 backdrop-blur-sm px-3 py-1.5 border border-yellow-500/30 lg:top-6 lg:right-6">
          <Zap className="h-3.5 w-3.5 text-yellow-400" />
          <span className="text-[10px] font-medium text-yellow-300 uppercase tracking-wide">
            Flash On
          </span>
        </div>
      )}
    </div>
  );
};

export default ScanCameraView;
