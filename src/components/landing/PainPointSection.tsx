import { Wallet, LineChart, PieChart, Shield, ScanLine } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const pillars = [
  { icon: Wallet, title: 'Dashboard', desc: 'Monitor balances across all your wallets in one unified view.' },
  { icon: LineChart, title: 'Analysis', desc: 'Forecast your spending 30 days ahead using Deep Learning.' },
  { icon: ScanLine, title: 'Scan (OCR)', desc: 'Snap a receipt and let our AI log every detail automatically.' },
  { icon: PieChart, title: 'History', desc: 'Full transaction log with AI-powered category tagging.' },
  { icon: Shield, title: 'Profile', desc: 'Set financial goals and manage your account security.' },
];

const PainPointSection = () => {
  const sectionRef = useScrollReveal();

  return (
    <section className="relative py-10 sm:py-18 md:py-24 bg-muted/30">
      <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background to-transparent" />

      <div ref={sectionRef} className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="text-center mb-10 sm:mb-14" data-animate>
          <h2 className="text-xl font-bold text-foreground font-manrope sm:text-3xl lg:text-4xl">
            5 Pillars of Financial Control
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base max-w-lg mx-auto">
            Designed to simplify every aspect of your financial journey with intuitive navigation.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5 lg:gap-5" data-animate>
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                data-stagger
                className="group flex flex-col items-center text-center rounded-2xl border border-border bg-card p-4 sm:p-5 lg:p-6 transition-all duration-300 hover:bg-primary hover:border-primary hover:shadow-md hover:-translate-y-1 cursor-default"
              >
                <Icon className="h-5 w-5 sm:h-6 sm:w-6 mb-2 sm:mb-3 text-primary transition-colors group-hover:text-on-primary" />
                <h3 className="text-xs sm:text-sm font-semibold font-manrope text-foreground transition-colors group-hover:text-on-primary">
                  {p.title}
                </h3>
                <p className="mt-1 sm:mt-1.5 text-[10px] sm:text-[11px] leading-relaxed text-muted-foreground transition-colors group-hover:text-on-primary/70">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PainPointSection;
