import type { BudgetHistoryItem } from '@/types/budget';

const mockHistory: BudgetHistoryItem[] = [
  { month: 'Jan', limit: 25_000_000, spent: 18_500_000 },
  { month: 'Feb', limit: 25_000_000, spent: 22_000_000 },
  { month: 'Mar', limit: 25_000_000, spent: 19_800_000 },
  { month: 'Apr', limit: 25_000_000, spent: 24_500_000 },
  { month: 'May', limit: 25_000_000, spent: 15_750_000 },
  { month: 'Jun', limit: 25_000_000, spent: 20_100_000 },
];

interface BudgetHistoryChartProps {
  history?: BudgetHistoryItem[];
}

const formatRupiahShort = (amount: number) => {
  if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `${(amount / 1_000).toFixed(0)}K`;
  return amount.toString();
};

const BudgetHistoryChart = ({ history = mockHistory }: BudgetHistoryChartProps) => {
  const maxValue = Math.max(...history.map((h) => Math.max(h.limit, h.spent)));

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5 md:p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground font-manrope sm:text-xl">
          Monthly Spending History
        </h3>
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center gap-4 sm:mt-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-primary" />
          <span className="text-xs text-muted-foreground">Budget Limit</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-secondary" />
          <span className="text-xs text-muted-foreground">Actual Spending</span>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-5 sm:mt-6">
        <div className="flex items-end justify-between gap-2 sm:gap-3" style={{ height: '180px' }}>
          {history.map((item) => {
            const limitHeight = (item.limit / maxValue) * 100;
            const spentHeight = (item.spent / maxValue) * 100;
            const isOver = item.spent > item.limit;

            return (
              <div key={item.month} className="flex flex-1 flex-col items-center gap-1">
                <div className="relative flex w-full items-end justify-center gap-1" style={{ height: '150px' }}>
                  {/* Limit bar */}
                  <div
                    className="w-2/5 max-w-5 rounded-t-sm bg-primary/30"
                    style={{ height: `${limitHeight}%` }}
                  />
                  {/* Spent bar */}
                  <div
                    className={`w-2/5 max-w-5 rounded-t-sm ${isOver ? 'bg-red-500' : 'bg-secondary'}`}
                    style={{ height: `${spentHeight}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{item.month}</span>
              </div>
            );
          })}
        </div>

        {/* Y-axis labels */}
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
          <span className="text-xs text-muted-foreground">Rp0</span>
          <span className="text-xs text-muted-foreground">{formatRupiahShort(maxValue)}</span>
        </div>
      </div>
    </div>
  );
};

export default BudgetHistoryChart;
