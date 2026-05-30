import { useRef, useCallback } from 'react';
import { Camera, ImagePlus } from 'lucide-react';

interface ScanCameraViewProps {
  onCapture: (file: File) => void;
}

const ScanCameraView = ({ onCapture }: ScanCameraViewProps) => {
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const openCamera = useCallback(() => {
    cameraInputRef.current?.click();
  }, []);

  const openGallery = useCallback(() => {
    galleryInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      e.target.value = '';
      if (file) onCapture(file);
    },
    [onCapture],
  );

  return (
    <div className="relative h-full w-full overflow-hidden bg-linear-to-br from-primary/10 via-background to-primary/5 lg:rounded-2xl lg:border-2 lg:border-primary/30">
      {/* Decorative corner brackets */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-6 top-16 h-14 w-14 rounded-tl-lg border-l-3 border-t-3 border-primary/40 sm:left-10 sm:top-20 sm:h-16 sm:w-16 lg:left-12 lg:top-16" />
        <div className="absolute right-6 top-16 h-14 w-14 rounded-tr-lg border-r-3 border-t-3 border-primary/40 sm:right-10 sm:top-20 sm:h-16 sm:w-16 lg:right-12 lg:top-16" />
        <div className="absolute bottom-16 left-6 h-14 w-14 rounded-bl-lg border-b-3 border-l-3 border-primary/40 sm:bottom-20 sm:left-10 sm:h-16 sm:w-16 lg:bottom-24 lg:left-12" />
        <div className="absolute bottom-16 right-6 h-14 w-14 rounded-br-lg border-b-3 border-r-3 border-primary/40 sm:bottom-20 sm:right-10 sm:h-16 sm:w-16 lg:bottom-24 lg:right-12" />
      </div>

      {/* Center content */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 py-10 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/15 backdrop-blur-sm sm:h-24 sm:w-24">
          <Camera className="h-9 w-9 text-primary sm:h-10 sm:w-10" />
        </div>

        <h3 className="mt-6 text-lg font-semibold text-foreground sm:text-xl">
          Capture your receipt
        </h3>
        <p className="mt-2 max-w-xs text-sm text-muted-foreground">
          Tap the button below to open your device camera and snap a clear photo of your receipt.
        </p>

        {/* Primary CTA */}
        <button
          type="button"
          onClick={openCamera}
          className="mt-8 inline-flex w-64 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:bg-primary/90 active:scale-95"
          aria-label="Open camera"
        >
          <Camera className="h-5 w-5" />
          Open Camera
        </button>

        {/* Secondary CTA */}
        <button
          type="button"
          onClick={openGallery}
          className="mt-3 inline-flex w-64 items-center justify-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3.5 text-sm font-semibold text-foreground backdrop-blur-sm transition-colors hover:bg-card lg:hidden"
          aria-label="Choose from gallery"
        >
          <ImagePlus className="h-5 w-5" />
          Choose from gallery
        </button>
      </div>

      {/* Hidden camera input */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Hidden gallery input */}
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ScanCameraView;
