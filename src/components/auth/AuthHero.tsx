import { ReceiptText, BrainCircuit } from 'lucide-react';

const features = [
  {
    icon: ReceiptText,
    iconBg: 'bg-orange-500',
    title: 'Smart Receipt Scanner',
    description:
      'Stop typing your expenses manually. Just snap a photo of any receipt, and Spendly will automatically extract and categorize all your financial data instantly.',
  },
  {
    icon: BrainCircuit,
    iconBg: 'bg-emerald-500',
    title: 'AI-Powered Financial Insights',
    description:
      'Get a personal financial consultant in your pocket. Our smart AI analyzes your spending patterns to provide automated tracking and personalized money saving recommendations.',
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
      <div className="relative flex flex-1 flex-col justify-center px-12 xl:px-18 space-y-8">
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
              <h3 className="font-semibold font-manrope leading-snug text-white lg:text-base xl:text-lg">{title}</h3>
            </div>
            <p className="text-sm xl:text-base leading-relaxed text-white/60">{description}</p>
          </div>
        ))}
      </div>

      {/* Testimonial */}
      <blockquote className="relative border-t border-white/10 mx-12 xl:mx-18 mb-8 pt-5">
        <p className="text-sm xl:text-base italic leading-relaxed text-white/50">
          &ldquo;Spendly has helped more than 500,000 users achieve financial freedom faster, every
          single day.&rdquo;
        </p>
      </blockquote>
    </div>
  );
};

export default AuthHero;