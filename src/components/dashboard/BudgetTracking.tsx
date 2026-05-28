import { BarChart3 } from 'lucide-react';
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from '@/components/ui/empty';
import type { BudgetItem, BudgetTrackingProps } from '@/types';
import { formatRupiah } from '@/utils';

const BudgetBar = ({ item }: { item: BudgetItem }) => {
  const pct = Math.min((item.spent / item.limit) * 100, 100);
  const isDanger  = pct >= 100;
  const isWarning = pct >= 85 && !isDanger;

  const barColor  = isDanger ? 'bg-red-600 dark:bg-red-400' : isWarning ? 'bg-yellow-600 dark:bg-yellow-400' : 'bg-green-600 dark:bg-green-400';
  const textColor = isDanger ? 'text-red-600 dark:text-red-400' : isWarning ? 'text-yellow-600 dark:text-yellow-400' : 'text-green-600 dark:text-green-400';

  return (
    <>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">{item.label}</p>
          <p className="text-xs text-muted-foreground">Limit: {formatRupiah(item.limit)}</p>
        </div>
        <p className={`shrink-0 text-right text-sm font-bold ${textColor}`}>
          {formatRupiah(item.spent)}
          <span className="block text-xs font-normal text-muted-foreground">
            {Math.round(pct)}% used
          </span>
        </p>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
        <div className={`h-full rounded-full transition-all ${barColor}`} style={{ width: `${pct}%` }} />
      </div>
    </>
  );
};

const SkeletonBar = () => (
  <div className="space-y-2">
    <div className="flex justify-between">
      <div className="space-y-1.5">
        <div className="h-3.5 w-32 animate-pulse rounded bg-muted" />
        <div className="h-3 w-24 animate-pulse rounded bg-muted" />
      </div>
      <div className="h-3.5 w-16 animate-pulse rounded bg-muted" />
    </div>
    <div className="h-2.5 w-full animate-pulse rounded-full bg-muted" />
  </div>
);

const BudgetTracking = ({ budgets = [], isLoading = false }: BudgetTrackingProps) => {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-semibold text-foreground font-manrope sm:text-2xl">
        Budget Tracking
      </h2>

      {isLoading ? (
        <div className="mt-4 space-y-5 sm:mt-6 sm:space-y-6">
          <SkeletonBar />
          <SkeletonBar />
        </div>
      ) : budgets.length === 0 ? (
        <Empty className="mt-6 border border-dashed">
          <EmptyHeader>
            <EmptyMedia variant="icon"><BarChart3 /></EmptyMedia>
            <EmptyTitle>Budget</EmptyTitle>
            <EmptyDescription>
              Set spending limits for each category to keep your finances healthy.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="mt-4 space-y-5 sm:mt-6 sm:space-y-6">
          {budgets.map((budget, i) => <BudgetBar key={i} item={budget} />)}
        </div>
      )}
    </div>
  );
};

export default BudgetTracking;
