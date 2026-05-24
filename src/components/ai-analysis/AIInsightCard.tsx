import { Bot } from 'lucide-react';

const AIInsightCard = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-[#005C39] to-[#003d26] p-5 sm:p-6 flex flex-col justify-between h-full">
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/5" />
      <div className="relative">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10">
            <Bot className="h-4 w-4 text-[#86D2A6]" />
          </div>
          <p className="text-[10px] font-semibold tracking-wide text-[#86D2A6] uppercase">
            AI Intelligence
          </p>
        </div>
        <h3 className="text-base font-bold text-white font-manrope mt-3 sm:text-lg">
          Savings Optimization
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/70">
          Based on your recent lifestyle shifts, you can optimize your monthly balance. Reduce dining out by 2x/week to save more.
        </p>
      </div>
      <div className="mt-4 rounded-xl bg-white/10 px-4 py-3">
        <p className="text-[10px] text-[#86D2A6] font-medium">Potential Monthly Savings</p>
        <p className="text-xl font-bold text-white font-manrope sm:text-2xl mt-0.5">Rp1.250.000</p>
      </div>
    </div>
  );
};

export default AIInsightCard;
