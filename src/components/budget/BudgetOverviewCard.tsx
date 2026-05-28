import { TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import type { BudgetOverview } from '@/types/budget';
import { formatRupiah } from '@/utils';

interface BudgetOverviewCardProps {
  overview?: BudgetOverview;
}

const BudgetOverviewCard = ({
  overview = {
    totalLimit: 25_000_000,
    totalSpent: 15_750_000,
    totalRemaining: 9_250_000,
    percentageUsed: 63,
  },
}: BudgetOverviewCardProps) => {
  const { totalLimit, totalSpent, totalRemaining, percentageUsed } = overview;
  const isOverBudget = percentageUsed >= 100;
  const isWarning = percentageUsed >= 80 && !isOverBudget;

  const barColor = isOverBudget
    ? 'bg-red-400'
    : isWarning
      ? 'bg-yellow-400'
      : 'bg-white';

  return (
    <div className="relative overflow-hidden rounded-2xl bg-primary p-5 text-white sm:p-6 md:p-8">
      {/* Background decoration */}
      <div className="pointer-events-none absolute right-6 top-4 opacity-10">
        <Wallet className="size-20 sm:size-28" />
      </div>

      <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
        Budget Overview
      </p>
      <h2 className="mt-2 text-2xl font-bold font-manrope sm:text-3xl md:text-4xl">
        {formatRupiah(totalLimit)}
      </h2>
      <p className="mt-1 text-xs text-white/70 sm:text-sm">Total budget limit</p>

      {/* Progress bar */}
      <div className="mt-4 sm:mt-6">
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <span className="text-white/80">{percentageUsed}% used</span>
          <span className="text-white/80">{formatRupiah(totalRemaining)} remaining</span>
        </div>
        <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-white/20 sm:h-3">
          <div
            className={`h-full rounded-full transition-all ${barColor}`}
            style={{ width: `${Math.min(percentageUsed, 100)}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="flex size-9 items-center justify-center rounded-full bg-white/10 sm:size-11">
            <TrendingDown className="size-4 text-red-300 sm:size-5" />
          </span>
          <div>
            <p className="text-[10px] text-white/60 sm:text-xs">Spent</p>
            <p className="text-sm font-semibold sm:text-lg">{formatRupiah(totalSpent)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="flex size-9 items-center justify-center rounded-full bg-white/10 sm:size-11">
            <TrendingUp className="size-4 text-emerald-300 sm:size-5" />
          </span>
          <div>
            <p className="text-[10px] text-white/60 sm:text-xs">Remaining</p>
            <p className="text-sm font-semibold sm:text-lg">{formatRupiah(totalRemaining)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetOverviewCard;
