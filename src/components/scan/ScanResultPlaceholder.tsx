import { FileText } from 'lucide-react';

const ScanResultPlaceholder = () => (
  <div className="hidden xl:flex h-full flex-1 items-center justify-center rounded-2xl border-border bg-muted/20 p-8">
    <div className="flex flex-col items-center text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <FileText className="h-5 w-5 text-muted-foreground" />
      </div>
      <p className="mt-3 text-sm font-medium text-muted-foreground">
        Extraction result will appear here
      </p>
      <p className="mt-1 text-xs text-muted-foreground/70">
        Upload or capture a receipt to get started
      </p>
    </div>
  </div>
);

export default ScanResultPlaceholder;
