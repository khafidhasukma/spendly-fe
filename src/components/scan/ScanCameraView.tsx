import { useRef, useState, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Camera, VideoOff, Maximize, Minimize, Zap, ZapOff, ImagePlus, SwitchCamera } from 'lucide-react';

interface ScanCameraViewProps {
  onCapture: (file: File) => void;
}

const ScanCameraView = ({ onCapture }: ScanCameraViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [torchOn, setTorchOn] = useState(false);
  const [torchSupported, setTorchSupported] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [hasMultipleCameras, setHasMultipleCameras] = useState(false);

  // Check for multiple cameras
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoInputs = devices.filter((d) => d.kind === 'videoinput');
      setHasMultipleCameras(videoInputs.length > 1);
    }).catch(() => {
      // ignore
    });
  }, []);

  // Fullscreen listener
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Check torch support when stream is available
  const handleUserMedia = useCallback((stream: MediaStream) => {
    const track = stream.getVideoTracks()[0];
    if (!track) return;

    // Apply continuous autofocus
    try {
      track.applyConstraints({
        advanced: [{ focusMode: 'continuous' } as unknown as MediaTrackConstraintSet],
      });
    } catch {
      // not supported
    }

    // Check torch capability
    const checkTorch = () => {
      try {
        const capabilities = track.getCapabilities() as MediaTrackCapabilities & { torch?: boolean };
        if (capabilities?.torch) {
          setTorchSupported(true);
        }
      } catch {
        // ignore
      }
    };

    checkTorch();
    setTimeout(checkTorch, 800);
  }, []);

  const handleUserMediaError = useCallback(() => {
    setError(true);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      await containerRef.current.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  }, []);

  const toggleTorch = useCallback(async () => {
    const video = webcamRef.current?.video;
    if (!video?.srcObject) return;
    const stream = video.srcObject as MediaStream;
    const track = stream.getVideoTracks()[0];
    if (!track) return;

    const next = !torchOn;
    try {
      await track.applyConstraints({
        advanced: [{ torch: next } as unknown as MediaTrackConstraintSet],
      });
      setTorchOn(next);
    } catch {
      setTorchSupported(false);
    }
  }, [torchOn]);

  const switchCamera = useCallback(() => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
    setTorchOn(false);
  }, []);

  const handleCapture = useCallback(() => {
    if (!webcamRef.current) return;

    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    // Convert base64 to File
    fetch(imageSrc)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], `receipt-${Date.now()}.jpg`, { type: 'image/jpeg' });

        // Stop the stream before navigating away
        const video = webcamRef.current?.video;
        if (video?.srcObject) {
          const stream = video.srcObject as MediaStream;
          stream.getTracks().forEach((t) => t.stop());
        }

        if (document.fullscreenElement) document.exitFullscreen();
        onCapture(file);
      });
  }, [onCapture]);

  const handleGallerySelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Stop the stream
    const video = webcamRef.current?.video;
    if (video?.srcObject) {
      const stream = video.srcObject as MediaStream;
      stream.getTracks().forEach((t) => t.stop());
    }

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

  const videoConstraints: MediaTrackConstraints = {
    facingMode,
    width: { ideal: 1920 },
    height: { ideal: 1080 },
  };

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden bg-black lg:rounded-2xl lg:border-2 lg:border-primary/30"
    >
      {/* Live camera feed via react-webcam */}
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        screenshotQuality={0.92}
        videoConstraints={videoConstraints}
        onUserMedia={handleUserMedia}
        onUserMediaError={handleUserMediaError}
        className="block h-full w-full object-cover"
        mirrored={facingMode === 'user'}
      />

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

        {/* Left: Torch (desktop) */}
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
          className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-white/20 backdrop-blur-sm transition-transform hover:scale-105 active:scale-95 sm:h-18 sm:w-18"
          aria-label="Capture receipt"
        >
          <Camera className="h-6 w-6 text-white sm:h-7 sm:w-7" />
        </button>

        {/* Right: Switch camera (mobile) */}
        <div className="flex flex-col items-center gap-1 lg:hidden">
          {hasMultipleCameras ? (
            <>
              <button
                type="button"
                onClick={switchCamera}
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 text-white transition-colors hover:bg-white/25 active:scale-95"
                aria-label="Switch camera"
              >
                <SwitchCamera className="h-5 w-5" />
              </button>
              <span className="text-[9px] uppercase tracking-wide text-white/70 font-medium">Flip</span>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={toggleTorch}
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 text-white transition-colors hover:bg-white/25 active:scale-95"
                aria-label={torchOn ? 'Turn off flash' : 'Turn on flash'}
              >
                {torchOn ? <Zap className="h-5 w-5 text-yellow-400" /> : <ZapOff className="h-5 w-5" />}
              </button>
              <span className="text-[9px] uppercase tracking-wide text-white/70 font-medium">Flash</span>
            </>
          )}
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
    </div>
  );
};

export default ScanCameraView;
