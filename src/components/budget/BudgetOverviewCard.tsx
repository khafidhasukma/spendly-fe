import { AlertTriangle, TrendingDown, TrendingUp, Wallet, XCircle } from 'lucide-react';
import type { BudgetSummary } from '@/types/budget';
import { formatRupiah } from '@/utils';

interface BudgetOverviewCardProps {
  summary?: BudgetSummary;
  isLoading?: boolean;
}

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse rounded bg-white/20 ${className}`} />
);

const BudgetOverviewCard = ({ summary, isLoading = false }: BudgetOverviewCardProps) => {
  const totalLimit = summary ? parseFloat(summary.total_budget_amount) : 0;
  const totalSpent = summary ? parseFloat(summary.total_spent) : 0;
  const totalRemaining = Math.max(totalLimit - totalSpent, 0);
  const percentageUsed = totalLimit > 0 ? (totalSpent / totalLimit) * 100 : 0;

  const isOverBudget = percentageUsed >= 100;
  const isWarning = percentageUsed >= 80 && !isOverBudget;

  const barColor = isOverBudget ? 'bg-red-400' : isWarning ? 'bg-yellow-400' : 'bg-white';

  return (
    <div className="relative overflow-hidden rounded-2xl bg-primary p-5 text-white sm:p-6 md:p-8">
      {/* Background decoration */}
      <div className="pointer-events-none absolute right-6 top-4 opacity-10">
        <Wallet className="size-20 sm:size-28" />
      </div>

      <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
        Budget Overview
      </p>

      {isLoading ? (
        <>
          <Skeleton className="mt-2 h-9 w-48" />
          <Skeleton className="mt-2 h-4 w-32" />
        </>
      ) : (
        <>
          <h2 className="mt-2 text-2xl font-bold font-manrope sm:text-3xl md:text-4xl">
            {formatRupiah(totalLimit)}
          </h2>
          <p className="mt-1 text-xs text-white/70 sm:text-sm">
            Total budget limit across {summary?.total_budgets ?? 0} categories
          </p>
        </>
      )}

      {/* Progress bar */}
      <div className="mt-4 sm:mt-6">
        {isLoading ? (
          <>
            <Skeleton className="mb-2 h-4 w-full rounded" />
            <Skeleton className="h-3 w-full rounded-full" />
          </>
        ) : (
          <>
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-white/80">{Math.round(percentageUsed)}% used</span>
              <span className="text-white/80">{formatRupiah(totalRemaining)} remaining</span>
            </div>
            <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-white/20 sm:h-3">
              <div
                className={`h-full rounded-full transition-all ${barColor}`}
                style={{ width: `${Math.min(percentageUsed, 100)}%` }}
              />
            </div>
          </>
        )}
      </div>

      {/* Stats */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-8 sm:grid-cols-4 sm:gap-4">
        {/* Spent */}
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="flex size-9 items-center justify-center rounded-full bg-white/10 sm:size-11">
            <TrendingDown className="size-4 text-red-300 sm:size-5" />
          </span>
          <div>
            <p className="text-[10px] text-white/60 sm:text-xs">Spent</p>
            {isLoading
              ? <Skeleton className="h-5 w-20" />
              : <p className="text-sm font-semibold sm:text-base">{formatRupiah(totalSpent)}</p>
            }
          </div>
        </div>

        {/* Remaining */}
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="flex size-9 items-center justify-center rounded-full bg-white/10 sm:size-11">
            <TrendingUp className="size-4 text-emerald-300 sm:size-5" />
          </span>
          <div>
            <p className="text-[10px] text-white/60 sm:text-xs">Remaining</p>
            {isLoading
              ? <Skeleton className="h-5 w-20" />
              : <p className="text-sm font-semibold sm:text-base">{formatRupiah(totalRemaining)}</p>
            }
          </div>
        </div>

        {/* Exceeded */}
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="flex size-9 items-center justify-center rounded-full bg-white/10 sm:size-11">
            <XCircle className="size-4 text-red-300 sm:size-5" />
          </span>
          <div>
            <p className="text-[10px] text-white/60 sm:text-xs">Exceeded</p>
            {isLoading
              ? <Skeleton className="h-5 w-10" />
              : <p className="text-sm font-semibold sm:text-base">{summary?.exceeded ?? 0} budget</p>
            }
          </div>
        </div>

        {/* Warning */}
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="flex size-9 items-center justify-center rounded-full bg-white/10 sm:size-11">
            <AlertTriangle className="size-4 text-yellow-300 sm:size-5" />
          </span>
          <div>
            <p className="text-[10px] text-white/60 sm:text-xs">Warning</p>
            {isLoading
              ? <Skeleton className="h-5 w-10" />
              : <p className="text-sm font-semibold sm:text-base">{summary?.warning ?? 0} budget</p>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetOverviewCard;
