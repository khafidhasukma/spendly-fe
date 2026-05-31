import { UserPlus, Camera, LineChart } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const steps = [
  { icon: UserPlus, num: '01', title: 'Create an Account', desc: 'Sign up for free in seconds. No credit card required.' },
  { icon: Camera, num: '02', title: 'Scan & Record', desc: 'Snap a receipt or enter manually. AI handles the rest.' },
  { icon: LineChart, num: '03', title: 'View Insights', desc: 'Your dashboard gives you a clear picture and savings tips.' },
];

const HowItWorksSection = () => {
  const sectionRef = useScrollReveal();

  return (
    <section id="how-it-works" className="relative py-10 sm:py-20 lg:py-28 bg-muted/20">
      <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background to-transparent" />

      <div ref={sectionRef} className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="text-center mb-14" data-animate>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">How It Works</p>
          <h2 className="text-2xl font-bold text-foreground font-manrope sm:text-3xl lg:text-4xl">
            As Simple as 1, 2, 3
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-px bg-primary/20 sm:left-6" />
            <div className="space-y-10 sm:space-y-12" data-animate>
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.num} className="relative flex gap-5 sm:gap-7 pl-1" data-stagger>
                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary shadow-sm sm:h-12 sm:w-12">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <div className="pt-1 sm:pt-2">
                      <span className="text-xs font-semibold text-primary">{step.num}</span>
                      <h3 className="text-lg font-bold text-foreground font-manrope sm:text-xl">{step.title}</h3>
                      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
