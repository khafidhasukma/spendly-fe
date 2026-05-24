import { Check, X } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const rows = [
  { feature: 'Automatic recording' },
  { feature: 'AI analysis' },
  { feature: 'Budget alerts' },
  { feature: 'Visual categories' },
  { feature: 'Spending forecast' },
  { feature: 'Free forever' },
];

const ComparisonSection = () => {
  const sectionRef = useScrollReveal();

  return (
    <section className="relative py-10 sm:py-18 md:py-24 bg-background">
      <div ref={sectionRef} className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="text-center mb-14" data-animate>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Comparison</p>
          <h2 className="text-2xl font-bold text-foreground font-manrope sm:text-3xl lg:text-4xl">
            Manual vs <span className="text-primary">Spendly</span>
          </h2>
        </div>

        <div className="max-w-2xl mx-auto overflow-hidden rounded-2xl border border-border" data-animate>
          <div className="grid grid-cols-[1fr_80px_80px] sm:grid-cols-[1fr_100px_100px] items-center border-b border-border px-5 py-4 bg-muted/40">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Feature</span>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide text-center">Manual</span>
            <span className="text-xs font-semibold text-primary uppercase tracking-wide text-center">Spendly</span>
          </div>

          {rows.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-[1fr_80px_80px] sm:grid-cols-[1fr_100px_100px] items-center px-5 py-3.5 ${
                i < rows.length - 1 ? 'border-b border-border/50' : ''
              } ${i % 2 === 0 ? 'bg-card' : 'bg-muted/20'}`}
            >
              <span className="text-sm text-foreground">{row.feature}</span>
              <div className="flex justify-center">
                <X className="h-4 w-4 text-muted-foreground/40" />
              </div>
              <div className="flex justify-center">
                <Check className="h-4 w-4 text-primary" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
