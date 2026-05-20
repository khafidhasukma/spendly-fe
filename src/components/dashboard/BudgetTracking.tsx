import { BarChart3 } from 'lucide-react';
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from '@/components/ui/empty';
import type { BudgetItem, BudgetTrackingProps } from '@/types';

const mockBudgets: BudgetItem[] = [
  { label: 'Monthly Spending', limit: 4_500_000, spent: 3_150_000 },
  { label: 'Entertainment',    limit:   500_000, spent:   480_000 },
];

const formatRupiah = (amount: number) => new Intl.NumberFormat('id-ID').format(amount);

const BudgetBar = ({ item }: { item: BudgetItem }) => {
  const pct = Math.min((item.spent / item.limit) * 100, 100);
  const isDanger  = pct >= 100;
  const isWarning = pct >= 85 && !isDanger;

  const barColor  = isDanger ? 'bg-red-500' : isWarning ? 'bg-secondary' : 'bg-primary';
  const textColor = isDanger ? 'text-red-500' : isWarning ? 'text-secondary' : 'text-foreground';

  return (
    <>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">{item.label}</p>
          <p className="text-xs text-muted-foreground">
            Limit: Rp{formatRupiah(item.limit)}
          </p>
        </div>
        <p className={`shrink-0 text-right text-sm font-bold ${textColor}`}>
          Rp{formatRupiah(item.spent)}
          <span className="block text-xs font-normal text-muted-foreground">
            {Math.round(pct)}% used
          </span>
        </p>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </>
  );
};

export { type BudgetItem, type BudgetTrackingProps } from '@/types';

const BudgetTracking = ({ budgets = mockBudgets }: BudgetTrackingProps) => {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-semibold text-foreground font-manrope sm:text-2xl">
        Budget Tracking
      </h2>

      {budgets.length === 0 ? (
        <Empty className="mt-6 border border-dashed">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <BarChart3 />
            </EmptyMedia>
            <EmptyTitle>Belum Ada Budget</EmptyTitle>
            <EmptyDescription>
              Atur batas pengeluaran untuk setiap kategori agar kondisi keuangan Anda tetap sehat.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="mt-4 space-y-5 sm:mt-6 sm:space-y-6">
          {budgets.map((budget, i) => (
            <BudgetBar key={i} item={budget} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BudgetTracking;
