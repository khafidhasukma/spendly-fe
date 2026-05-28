import { ArrowDown, ArrowUp, TrendingUp, Wallet } from 'lucide-react';
import type { BalanceCardProps } from '@/types';
import { formatRupiah } from '@/utils';

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse rounded bg-white/20 ${className}`} />
);

const BalanceCard = ({
  totalBalance = 0,
  income = 0,
  expense = 0,
  incomeChangePct = 0,
  expenseChangePct = 0,
  isLoading = false,
}: BalanceCardProps) => {
  const netChangePct = incomeChangePct - expenseChangePct;
  return (
    <div className="relative overflow-hidden rounded-2xl bg-primary p-5 text-white h-full min-h-48 sm:min-h-52 sm:p-6">
      <div className="pointer-events-none absolute right-6 top-3 opacity-10 sm:right-8 sm:top-4">
        <Wallet className="size-24 sm:size-30" />
      </div>

      <p className="text-xs font-semibold uppercase text-white/70">Total Balance</p>

      {isLoading ? (
        <>
          <Skeleton className="mt-2 h-9 w-48" />
          <Skeleton className="mt-4 h-7 w-52" />
        </>
      ) : (
        <>
          <h2 className="mt-1.5 text-3xl font-bold font-manrope sm:mt-2 sm:text-4xl">
            {formatRupiah(totalBalance)}
          </h2>
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs sm:mt-4 sm:text-sm">
            <TrendingUp className="size-3.5 sm:size-4" />
            {netChangePct >= 0 ? '+' : ''}{netChangePct.toFixed(1)}% from last month
          </div>
        </>
      )}

      <div className="mt-6 flex items-center justify-between gap-3 sm:mt-8 xl:gap-4">
        <div className="flex gap-2.5 items-center sm:gap-3">
          <span className="flex size-8 md:size-10 items-center justify-center rounded-full bg-white/10 xl:size-14">
            <ArrowDown className="size-5 text-emerald-300 sm:size-6" />
          </span>
          <div className="sm:space-y-1">
            <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wide text-white/60">Income</p>
            {isLoading
              ? <Skeleton className="h-5 w-24" />
              : <span className="text-sm font-semibold sm:text-base md:text-lg">{formatRupiah(income)}</span>
            }
          </div>
        </div>

        <div className="flex gap-2.5 items-center sm:gap-3">
          <span className="flex size-8 md:size-10 items-center justify-center rounded-full bg-white/10 xl:size-14">
            <ArrowUp className="size-5 text-orange-300 sm:size-6" />
          </span>
          <div className="sm:space-y-1">
            <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wide text-white/60">Expense</p>
            {isLoading
              ? <Skeleton className="h-5 w-24" />
              : <span className="text-sm font-semibold sm:text-base md:text-lg">{formatRupiah(expense)}</span>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
