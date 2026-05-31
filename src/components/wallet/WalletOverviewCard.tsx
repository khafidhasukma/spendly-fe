import { ArrowDownLeft, ArrowUpRight, Wallet } from 'lucide-react';
import { formatRupiah } from '@/utils';
import type { ApiWallet } from '@/types';

interface WalletOverviewCardProps {
  wallets?: ApiWallet[];
  isLoading?: boolean;
}

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse rounded bg-white/20 ${className}`} />
);

const WalletOverviewCard = ({ wallets = [], isLoading = false }: WalletOverviewCardProps) => {
  const safe = Array.isArray(wallets) ? wallets : [];
  const totalBalance = safe.reduce((s, w) => s + parseFloat(w.balance), 0);
  const totalIncome = safe.reduce((s, w) => s + parseFloat(w.total_income), 0);
  const totalExpense = safe.reduce((s, w) => s + parseFloat(w.total_expense), 0);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-primary p-5 text-white sm:p-6 md:p-8">
      <div className="pointer-events-none absolute right-6 top-4 opacity-10">
        <Wallet className="size-24 sm:size-28" />
      </div>

      <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
        Total Balance
      </p>

      {isLoading ? (
        <>
          <Skeleton className="mt-2 h-10 w-52" />
          <Skeleton className="mt-2 h-4 w-40" />
        </>
      ) : (
        <>
          <h2 className="mt-2 text-3xl font-bold font-manrope sm:text-4xl lg:text-5xl">
            {formatRupiah(totalBalance)}
          </h2>
        </>
      )}

      <div className="mt-6 grid grid-cols-2 gap-4 sm:mt-8">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-full bg-white/10 sm:size-12">
            <ArrowDownLeft className="size-5 text-emerald-300 sm:size-6" />
          </span>
          <div>
            <p className="text-xs text-white/60">Total Income</p>
            {isLoading
              ? <Skeleton className="h-5 w-24" />
              : <p className="text-base font-semibold sm:text-lg">{formatRupiah(totalIncome)}</p>
            }
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-full bg-white/10 sm:size-12">
            <ArrowUpRight className="size-5 text-red-300 sm:size-6" />
          </span>
          <div>
            <p className="text-xs text-white/60">Total Expense</p>
            {isLoading
              ? <Skeleton className="h-5 w-24" />
              : <p className="text-base font-semibold sm:text-lg">{formatRupiah(totalExpense)}</p>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletOverviewCard;
