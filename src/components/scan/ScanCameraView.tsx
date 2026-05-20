import { useRef, useEffect, useState, useCallback } from 'react';
import { Camera, VideoOff, Maximize, Minimize, Zap, ZapOff } from 'lucide-react';

interface ScanCameraViewProps {
  onCapture: (file: File) => void;
}

const ScanCameraView = ({ onCapture }: ScanCameraViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [torchOn, setTorchOn] = useState(false);
  const [torchSupported, setTorchSupported] = useState(false);

  useEffect(() => {
    let active = true;

    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });
        if (!active) {
          mediaStream.getTracks().forEach((t) => t.stop());
          return;
        }
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }

        const track = mediaStream.getVideoTracks()[0];
        if (track) {
          const capabilities = track.getCapabilities?.() as MediaTrackCapabilities & { torch?: boolean };
          if (capabilities?.torch) {
            setTorchSupported(true);
          }
        }
      } catch {
        if (active) setError(true);
      }
    };

    startCamera();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    return () => {
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, [stream]);

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

  const toggleTorch = useCallback(async () => {
    if (!stream) return;
    const track = stream.getVideoTracks()[0];
    if (!track) return;
    const next = !torchOn;
    try {
      await track.applyConstraints({ advanced: [{ torch: next } as MediaTrackConstraintSet] });
      setTorchOn(next);
    } catch {
      // torch not supported at runtime
    }
  }, [stream, torchOn]);

  const handleCapture = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0);
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], `receipt-${Date.now()}.jpg`, { type: 'image/jpeg' });
        stream?.getTracks().forEach((t) => t.stop());
        if (document.fullscreenElement) document.exitFullscreen();
        onCapture(file);
      }
    }, 'image/jpeg', 0.92);
  }, [stream, onCapture]);

  if (error) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/20 px-6 py-16 sm:py-20 lg:rounded-2xl">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <VideoOff className="h-7 w-7 text-destructive" />
        </div>
        <p className="mt-4 text-sm font-medium text-foreground">Camera not available</p>
        <p className="mt-1 max-w-xs text-center text-xs text-muted-foreground">
          Please allow camera access in your browser settings, or switch to the Gallery tab to upload an image.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative h-full overflow-hidden bg-black lg:rounded-2xl lg:border-2 lg:border-primary/30"
    >
      {/* Live camera feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="block h-full w-full object-cover"
      />

      {/* Viewfinder overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Corner brackets */}
        <div className="absolute left-6 top-6 h-10 w-10 border-l-2 border-t-2 border-primary/70 rounded-tl-sm sm:left-10 sm:top-10 sm:h-12 sm:w-12 lg:left-12 lg:top-12" />
        <div className="absolute right-6 top-6 h-10 w-10 border-r-2 border-t-2 border-primary/70 rounded-tr-sm sm:right-10 sm:top-10 sm:h-12 sm:w-12 lg:right-12 lg:top-12" />
        <div className="absolute bottom-24 left-6 h-10 w-10 border-b-2 border-l-2 border-primary/70 rounded-bl-sm sm:bottom-28 sm:left-10 sm:h-12 sm:w-12 lg:bottom-20 lg:left-12" />
        <div className="absolute bottom-24 right-6 h-10 w-10 border-b-2 border-r-2 border-primary/70 rounded-br-sm sm:bottom-28 sm:right-10 sm:h-12 sm:w-12 lg:bottom-20 lg:right-12" />

        {/* Scan line animation */}
        <div className="absolute inset-x-8 top-8 bottom-28 overflow-hidden sm:inset-x-12 sm:top-12 sm:bottom-32 lg:inset-x-14 lg:top-14 lg:bottom-24">
          <div className="absolute inset-x-0 h-0.5 bg-linear-to-r from-transparent via-primary to-transparent animate-scan-line" />
        </div>

        {/* Center hint text */}
        <div className="absolute inset-x-0 top-12 -translate-y-1/2 flex justify-center">
          <span className="rounded-full bg-black/40 backdrop-blur-sm px-3 py-2 text-[10px] uppercase tracking-widest text-white/80">
            Align receipt within the frame
          </span>
        </div>
      </div>

      {/* Bottom bar: capture + controls */}
      <div className="absolute bottom-0 inset-x-0 flex items-end justify-between px-5 pb-5 pt-12 bg-linear-to-t from-black/60 to-transparent sm:px-8 sm:pb-6 lg:px-10 lg:pb-8">
        {/* Left: Torch */}
        <button
          type="button"
          onClick={toggleTorch}
          disabled={!torchSupported}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white transition-colors hover:bg-white/25 disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label={torchOn ? 'Turn off flash' : 'Turn on flash'}
        >
          {torchOn ? <Zap className="h-4 w-4 text-yellow-400" /> : <ZapOff className="h-4 w-4" />}
        </button>

        {/* Center: Capture */}
        <button
          type="button"
          onClick={handleCapture}
          className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-white/20 backdrop-blur-sm transition-transform hover:scale-105 active:scale-95 sm:h-18 sm:w-18"
          aria-label="Capture receipt"
        >
          <Camera className="h-6 w-6 text-white" />
        </button>

        {/* Right: Fullscreen */}
        <button
          type="button"
          onClick={toggleFullscreen}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white transition-colors hover:bg-white/25"
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        >
          {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
        </button>
      </div>

      {/* Hidden canvas for capture */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default ScanCameraView;
