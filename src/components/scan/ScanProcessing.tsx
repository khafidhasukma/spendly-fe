interface ScanProcessingProps {
  preview: string;
  progress: number;
  onCancel: () => void;
}

const ScanProcessing = ({ preview, progress }: ScanProcessingProps) => {
  const displayProgress = Math.min(Math.round(progress), 100);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-between gap-4 py-4">
      {/* Receipt preview */}
      <div className="relative flex-1 w-full flex items-center justify-center min-h-0">
        <div className="relative h-full w-full">
          <img
            src={preview}
            alt="Receipt"
            className="h-full w-auto rounded-xl object-contain shadow-lg"
          />
          {/* Scan line overlay */}
          <div className="absolute inset-0 overflow-hidden rounded-xl">
            <div className="absolute inset-x-0 h-0.5 bg-linear-to-r from-transparent via-primary to-transparent animate-scan-line" />
          </div>
          {/* Processing badge */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-card/90 backdrop-blur-sm border border-border px-4 py-2 shadow-sm">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="text-xs font-medium text-foreground whitespace-nowrap">Processing OCR...</span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-64 shrink-0 lg:max-w-72">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Extracting data</span>
          <span>{displayProgress}%</span>
        </div>
        <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${displayProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ScanProcessing;
