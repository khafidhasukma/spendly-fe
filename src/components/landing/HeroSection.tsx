import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const avatars = [
  'bg-primary/40',
  'bg-primary/60',
  'bg-primary/80',
];

const HeroSection = () => {
  const sectionRef = useScrollReveal();

  return (
    <section className="relative overflow-hidden bg-background py-10 sm:py-20 lg:py-24">
      <div ref={sectionRef} className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Left content */}
          <div className="flex flex-col justify-center" data-animate="left">
            <h1 className="text-3xl font-bold leading-[1.15] text-foreground font-manrope sm:text-4xl lg:text-[2.75rem]">
              Smarter Finances,<br />
              <span className="text-primary">Calmer Life.</span>
            </h1>

            <p className="mt-5 text-base leading-relaxed text-muted-foreground max-w-md">
              Automatically track expenses, set budgets, and get AI-powered savings insights. All for free.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-on-primary shadow-md transition-all hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5"
              >
                Get Started Free <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                <Play className="h-3.5 w-3.5" /> View Demo
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <div className="flex -space-x-2.5">
                {avatars.map((bg, i) => (
                  <div
                    key={i}
                    className={`h-9 w-9 rounded-full border-2 border-background ${bg} flex items-center justify-center`}
                  />
                ))}
                <div className="h-9 w-9 rounded-full border-2 border-background bg-primary flex items-center justify-center">
                  <span className="text-[9px] font-bold text-on-primary">10k</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Join <span className="font-semibold text-foreground">10,000+</span> smart users already saving more.
              </p>
            </div>
          </div>

          {/* Desktop image */}
          <div className="relative hidden lg:flex" data-animate="right">
            <div className="absolute -top-6 -left-6 size-32 rounded-full bg-primary/20 blur-xl pointer-events-none" />
            <div className="absolute -bottom-6 -right-6 size-28 rounded-full bg-secondary/20 blur-xl pointer-events-none" />
            <div className="relative z-10 w-full rounded-xl overflow-hidden shadow-ambient">
              <img
                src="/assets/images/hero.png"
                alt="Spendly App"
                className="absolute inset-0 w-full h-full object-cover aspect-video object-right"
              />
            </div>
          </div>

          {/* Mobile image */}
          <div className="relative lg:hidden" data-animate>
            <div className="absolute -top-4 -left-4 h-20 w-20 rounded-full bg-primary/20 blur-md pointer-events-none" />
            <div className="absolute -bottom-4 -right-4 h-16 w-16 rounded-full bg-secondary/20 blur-md pointer-events-none" />
            <div className="relative z-10 rounded-xl overflow-hidden shadow-ambient">
              <img
                src="/assets/images/hero.png"
                alt="Spendly App"
                className="w-full h-auto object-cover aspect-video object-right"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
