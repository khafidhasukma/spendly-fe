import { BarChart3 } from 'lucide-react';
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from '@/components/ui/empty';

export interface BudgetItem {
  label: string;
  limit: number;
  spent: number;
}

const mockBudgets: BudgetItem[] = [
  { label: 'Monthly Spending', limit: 4_500_000, spent: 3_150_000 },
  { label: 'Entertainment',    limit:   500_000, spent:   480_000 },
];

function formatRupiah(amount: number) {
  return new Intl.NumberFormat('id-ID').format(amount);
}

function BudgetBar({ item }: { item: BudgetItem }) {
  const pct = Math.min((item.spent / item.limit) * 100, 100);
  const isDanger  = pct >= 100;
  const isWarning = pct >= 85 && !isDanger;

  const barColor  = isDanger ? 'bg-red-500' : isWarning ? 'bg-secondary' : 'bg-primary';
  const textColor = isDanger ? 'text-red-500' : isWarning ? 'text-secondary' : 'text-foreground';

  return (
    <>
      <div className="flex items-end justify-between gap-2">
        <div>
          <p className="text-base font-semibold text-foreground">{item.label}</p>
          <p className="text-sm text-muted-foreground">Limit: Rp{formatRupiah(item.limit)}</p>
        </div>
        <p className={`shrink-0 text-base font-bold ${textColor}`}>
          Rp{formatRupiah(item.spent)}<span className="text-muted-foreground text-sm font-normal"> / {Math.round(pct)}%</span>
        </p>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
        <div className={`h-full rounded-full transition-all ${barColor}`} style={{ width: `${pct}%` }} />
      </div>
    </>
  );
}

export interface BudgetTrackingProps {
  budgets?: BudgetItem[];
}

export default function BudgetTracking({ budgets = mockBudgets }: BudgetTrackingProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-foreground font-manrope">Budget Tracking</h2>

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
        <div className="mt-6 space-y-6">
          {budgets.map((budget, i) => (
            <BudgetBar key={i} item={budget} />
          ))}
        </div>
      )}
    </div>
  );
}
