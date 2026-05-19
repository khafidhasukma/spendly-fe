import { Shield, BrainCircuit } from 'lucide-react';

const features = [
  {
    icon: Shield,
    iconBg: 'bg-orange-500',
    title: 'Bank-Level Security',
    description:
      'All your data is protected with AES-256 end-to-end encryption. We ensure your financial privacy is always our top priority.',
  },
  {
    icon: BrainCircuit,
    iconBg: 'bg-emerald-500',
    title: 'AI Growth Engine',
    description:
      'Get personalized investment recommendations and automatic savings tailored to your unique spending patterns through our AI assistant.',
  },
];

const AuthHero = () => {
  return (
    <div className="relative flex w-full h-full overflow-hidden flex-col text-white">
      {/* Background image */}
      <img
        src="/assets/images/auth-bg.png"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />

      {/* Feature cards */}
      <div className="relative flex flex-1 flex-col justify-center px-18 space-y-8">
        {features.map(({ icon: Icon, iconBg, title, description }) => (
          <div
            key={title}
            className="rounded-2xl border border-white/10 bg-primary/5 p-6 backdrop-blur-sm"
          >
            <div className="mb-4 flex items-center gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md ${iconBg}`}
              >
                <Icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-semibold font-manrope leading-snug text-white text-lg">{title}</h3>
            </div>
            <p className="text-base leading-relaxed text-white/60">{description}</p>
          </div>
        ))}
      </div>

      {/* Testimonial */}
      <blockquote className="relative border-t border-white/10 mx-18 mb-8 pt-5">
        <p className="text-base italic leading-relaxed text-white/50">
          &ldquo;Spendly has helped more than 500,000 users achieve financial freedom faster, every
          single day.&rdquo;
        </p>
      </blockquote>
    </div>
  );
}

export default AuthHero;