import { Bot, Sparkles } from 'lucide-react';
import type { GroupedInsight } from './insight-utils';

interface TipCardProps {
  tip: GroupedInsight | null;
  loading?: boolean;
}

const TipCard = ({ tip, loading = false }: TipCardProps) => {
  if (loading) {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-[#005C39] to-[#003d26] p-5 sm:p-6 animate-pulse">
        <div className="h-4 w-24 rounded bg-white/10" />
        <div className="mt-4 h-6 w-3/4 rounded bg-white/10" />
        <div className="mt-2 h-4 w-full rounded bg-white/10" />
        <div className="mt-2 h-4 w-5/6 rounded bg-white/10" />
      </div>
    );
  }

  if (!tip) {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-[#005C39] to-[#003d26] p-5 sm:p-6 flex flex-col items-center justify-center gap-3 text-center min-h-[180px]">
        <Sparkles className="h-8 w-8 text-white/20" />
        <p className="text-sm font-medium text-white/40">No tips available yet</p>
        <p className="text-xs text-white/25">Keep tracking your spending to get AI tips</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-[#005C39] to-[#003d26] p-5 sm:p-6">
      <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/5" />
      <div className="pointer-events-none absolute -left-4 bottom-0 h-20 w-20 rounded-full bg-white/3" />
      <div className="relative">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/10">
            <Bot className="h-4 w-4 text-[#86D2A6]" />
          </div>
          <p className="text-[10px] font-bold tracking-widest text-[#86D2A6] uppercase">AI Intelligence</p>
        </div>
        <h3 className="mt-4 text-lg font-bold text-white font-manrope leading-snug sm:text-xl">{tip.title}</h3>
        <div className="mt-2 space-y-1">
          {tip.messages.map((msg, i) => (
            <p key={i} className="text-sm leading-relaxed text-white/70">{msg}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TipCard;
