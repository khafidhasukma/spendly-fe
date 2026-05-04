import { ArrowDown, ArrowUp, TrendingUp, Wallet } from 'lucide-react';

export interface BalanceCardProps {
  totalBalance?: number;
  income?: number;
  expense?: number;
  percentageChange?: number;
}

function formatRupiah(amount: number) {
  return new Intl.NumberFormat('id-ID').format(amount);
}

export default function BalanceCard({
  totalBalance = 12_850_000,
  income = 8_345_678,
  expense = 3_345_678,
  percentageChange = 12.5,
}: BalanceCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-primary p-6 text-white h-full">
      {/* Decorative icon */}
      <div className="pointer-events-none absolute right-8 top-4 opacity-10">
        <Wallet className="size-30" />
      </div>

      <p className="text-xs font-semibold uppercase tracking-widest text-white/70">Total Balance</p>
      <h2 className="mt-2 text-4xl font-bold font-manrope">Rp{formatRupiah(totalBalance)}</h2>

      <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-sm">
        <TrendingUp className="size-4" />
        {percentageChange}% increase from last month
      </div>

      <div className="mt-10 flex items-center justify-between gap-4">
        {/* Income */}
        <div className="flex gap-3 items-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-white/10">
            <ArrowDown className="size-6 text-[#34D399]" />
          </span>
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wide text-white/60">Income</p>
            <span className="text-xl font-semibold">Rp{formatRupiah(income)}</span>
          </div>
        </div>

        {/* Expense */}
        <div className="flex gap-3 items-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-white/10">
            <ArrowUp className="size-6 text-secondary" />
          </span>
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wide text-white/60">Expense</p>
            <span className="text-xl font-semibold">Rp{formatRupiah(expense)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
