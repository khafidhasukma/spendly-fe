import { ArrowDownLeft, ArrowUpRight, Wallet } from 'lucide-react';

const formatRupiah = (amount: number) => new Intl.NumberFormat('id-ID').format(amount);

interface WalletOverviewCardProps {
  totalBalance?: number;
  totalIncome?: number;
  totalExpense?: number;
}

const WalletOverviewCard = ({
  totalBalance = 12_850_000,
  totalIncome = 8_345_678,
  totalExpense = 3_345_678,
}: WalletOverviewCardProps) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-primary p-5 text-white sm:p-6 md:p-8">
      {/* Background decoration */}
      <div className="pointer-events-none absolute right-6 top-4 opacity-10">
        <Wallet className="size-24 sm:size-28" />
      </div>

      <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
        Total Balance (All Wallets)
      </p>
      <h2 className="mt-2 text-3xl font-bold font-manrope sm:text-4xl lg:text-5xl">
        Rp{formatRupiah(totalBalance)}
      </h2>
      <p className="mt-1 text-sm text-white/70">Combined balance from all your wallets</p>

      {/* Income / Expense summary */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:mt-8">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-full bg-white/10 sm:size-12">
            <ArrowDownLeft className="size-5 text-emerald-300 sm:size-6" />
          </span>
          <div>
            <p className="text-xs text-white/60">Total Income</p>
            <p className="text-base font-semibold sm:text-lg">Rp{formatRupiah(totalIncome)}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-full bg-white/10 sm:size-12">
            <ArrowUpRight className="size-5 text-red-300 sm:size-6" />
          </span>
          <div>
            <p className="text-xs text-white/60">Total Expense</p>
            <p className="text-base font-semibold sm:text-lg">Rp{formatRupiah(totalExpense)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletOverviewCard;
