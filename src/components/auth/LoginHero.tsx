import { Wallet } from 'lucide-react';

 const LoginHero = () => {
  return (
    <div className="relative hidden overflow-hidden lg:flex lg:w-[45%] flex-col justify-between bg-[#0a2a1a] p-10 text-white">
      {/* Decorative glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-72 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute left-1/3 top-2/3 h-40 w-40 rounded-full bg-emerald-400/10 blur-2xl" />
      </div>

      {/* Logo */}
      <div className="relative flex items-center gap-2">
        <Wallet className="h-6 w-6" />
        <span className="text-lg font-bold tracking-wide">Spendly</span>
      </div>

      {/* Hero text */}
      <div className="relative">
        <h1 className="whitespace-pre-line text-4xl font-bold leading-tight">
          {'The Digital\nCurator.'}
        </h1>
        <p className="mt-4 max-w-xs text-sm text-white/60">
          Experience a new era of financial clarity. Intelligent insights, curated exclusively for
          your portfolio.
        </p>
      </div>

      {/* Footer */}
      <p className="relative text-xs text-white/40">© Institutional-grade security.</p>
    </div>
  );
}

export default LoginHero;
