import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const CTASection = () => {
  const sectionRef = useScrollReveal();

  return (
    <section className="relative pb-10 sm:pb-20 lg:pb-28 bg-muted/20">
      <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-background to-transparent" />

      <div ref={sectionRef} className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-primary p-8 sm:p-14 lg:p-16" data-animate>
          <div className="absolute top-0 right-0 h-56 w-56 rounded-full bg-on-primary/5 -translate-y-1/3 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 h-44 w-44 rounded-full bg-on-primary/5 translate-y-1/3 -translate-x-1/4" />

          <div className="relative text-center max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-on-primary font-manrope sm:text-3xl lg:text-4xl leading-tight">
              Stop letting your money disappear without a trace
            </h2>
            <p className="mt-4 text-sm text-on-primary/70 sm:text-base leading-relaxed">
              Start tracking your finances today. Free, effortless, and you'll feel the difference right away.
            </p>
            <Link
              to="/register"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-on-primary px-7 py-3.5 text-sm font-semibold text-primary shadow-lg transition-all hover:opacity-90"
            >
              Sign Up Free <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
