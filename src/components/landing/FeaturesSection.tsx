import { TrendingUp, PieChart } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const FeaturesSection = () => {
  const sectionRef = useScrollReveal();

  return (
    <section id="features" className="relative py-10 sm:py-18 md:py-24 bg-background">
      <div ref={sectionRef} className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-10 sm:mb-14 max-w-lg" data-animate>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Why Spendly?</p>
          <h2 className="text-2xl font-bold text-foreground font-manrope sm:text-3xl lg:text-4xl">
            Features That Actually Matter
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            More than just a ledger. Spendly uses AI to deliver actionable insights you can act on today.
          </p>
        </div>

        {/* Row 1: OCR (2/3) + Forecasting (1/3) */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-5 mb-4 lg:mb-5" data-animate>
          <div className="sm:col-span-2 relative rounded-2xl bg-primary overflow-hidden min-h-52 sm:min-h-64">
            <div className="relative z-10 p-5 sm:p-8 sm:max-w-[60%]">
              <span className="inline-block text-[10px] font-semibold uppercase tracking-widest bg-on-primary/15 text-on-primary rounded-full px-3 py-1 mb-4">
                OCR Engine
              </span>
              <h3 className="text-lg font-bold font-manrope text-on-primary sm:text-xl">
                Turn Receipts into Data in 0.5 Seconds
              </h3>
              <p className="mt-2 text-xs text-on-primary/70 leading-relaxed sm:text-sm">
                Our OCR technology recognizes thousands of receipt formats with high accuracy. No more manual entry.
              </p>
            </div>
            <div className="hidden sm:block absolute inset-y-0 right-0 w-[45%]">
              <div className="absolute inset-0 bg-primary/75 z-1" />
              <img src="/assets/images/struk-img.png" alt="Scan receipt" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="sm:col-span-1 rounded-2xl border border-border bg-card p-5 sm:p-6 flex flex-col">
            <TrendingUp className="h-7 w-7 text-primary mb-4" />
            <h3 className="text-sm font-bold text-foreground font-manrope sm:text-base">Forecasting</h3>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed flex-1 sm:text-sm">
              Predict your spending for the next 30 days based on your historical patterns.
            </p>
          </div>
        </div>

        {/* Row 2: Smart Categorization (1/3) + Financial Goals (2/3) */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-5" data-animate>
          <div className="sm:col-span-1 rounded-2xl border border-border bg-card p-5 sm:p-6 flex flex-col">
            <PieChart className="h-7 w-7 text-primary mb-4" />
            <h3 className="text-sm font-bold text-foreground font-manrope sm:text-base">Smart Categorization</h3>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed flex-1 sm:text-sm">
              Every transaction is automatically categorized. Food, transport, bills — all organized neatly.
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-medium text-primary">#Food</span>
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-medium text-primary">#Transport</span>
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-medium text-primary">#Bills</span>
            </div>
          </div>

          <div className="sm:col-span-2 relative rounded-2xl bg-secondary overflow-hidden min-h-52 sm:min-h-64">
            <div className="relative z-10 p-5 sm:p-8 sm:max-w-[60%]">
              <h3 className="text-lg font-bold text-on-secondary font-manrope sm:text-xl">
                Achieve Your Financial Goals
              </h3>
              <p className="mt-2 text-xs text-on-secondary/70 leading-relaxed sm:text-sm">
                AI recommends the optimal savings allocation so you hit your targets faster.
              </p>
            </div>
            <div className="hidden sm:block absolute inset-y-0 right-0 w-[45%]">
              <div className="absolute inset-0 bg-secondary/75 z-1" />
              <img src="/assets/images/financial.svg" alt="Financial goals" className="w-full h-full object-contain p-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
