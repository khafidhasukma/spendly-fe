import { ShieldCheck, Zap } from 'lucide-react';

const ScanFeatureCards = () => {
  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
      <div className="rounded-xl border border-border bg-card p-4">
        <ShieldCheck className="h-5 w-5 text-primary" />
        <h4 className="mt-2 text-sm font-semibold text-foreground">Secure Upload</h4>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          Your receipt data is processed locally and never stored on third-party servers.
        </p>      </div>
      <div className="rounded-xl border border-border bg-card p-4">
        <Zap className="h-5 w-5 text-secondary" />
        <h4 className="mt-2 text-sm font-semibold text-foreground">Instant OCR</h4>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          Our AI extracts vendor names, totals, and line items in under 3 seconds with 99% accuracy.
        </p>
      </div>
    </div>
  );
};

export default ScanFeatureCards;
