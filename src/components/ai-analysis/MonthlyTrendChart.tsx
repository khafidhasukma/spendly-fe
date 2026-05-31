import { useState } from 'react';
import { formatRupiah } from '@/utils';
import type { CashFlowItem } from '@/types';

interface MonthlyTrendChartProps {
  data?: CashFlowItem[];
  loading?: boolean;
}

const MonthlyTrendChart = ({ data = [], loading = false }: MonthlyTrendChartProps) => {
  const [hoveredBar, setHoveredBar] = useState<{ label: string; type: string } | null>(null);

  const chartData = data.map((d) => ({
    label: d.label,
    income: parseFloat(d.income),
    expense: parseFloat(d.expense),
  }));

  const maxVal = chartData.length > 0
    ? Math.max(...chartData.flatMap((d) => [d.income, d.expense]), 1)
    : 1;

  return (
    <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-semibold text-foreground font-manrope sm:text-lg">
          Monthly Trend
        </h2>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">
          {data.length} {data.length === 1 ? 'Month' : 'Months'}
        </span>
      </div>

      {loading ? (
        <div className="flex items-center justify-center" style={{ height: '260px' }}>
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
        </div>
      ) : chartData.length === 0 ? (
        <div className="flex items-center justify-center text-sm text-muted-foreground" style={{ height: '260px' }}>
          No data available
        </div>
      ) : (
        <>
          <div className="flex items-end gap-5 sm:gap-7 px-1" style={{ height: '260px' }}>
            {chartData.map((d) => {
              const incomeHeight = (d.income / maxVal) * 100;
              const expenseHeight = (d.expense / maxVal) * 100;
              return (
                <div key={d.label} className="flex-1 flex items-end justify-center gap-2 h-full">
                  <div className="relative flex-1 h-full flex items-end">
                    <div
                      className="w-full rounded-md bg-primary/30 hover:bg-primary/50 transition-colors cursor-pointer"
                      style={{ height: `${incomeHeight}%` }}
                      onMouseEnter={() => setHoveredBar({ label: d.label, type: 'income' })}
                      onMouseLeave={() => setHoveredBar(null)}
                    />
                    {hoveredBar?.label === d.label && hoveredBar.type === 'income' && (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2.5 py-1 text-[10px] font-medium text-background shadow-lg z-10">
                        {formatRupiah(d.income)}
                      </div>
                    )}
                  </div>
                  <div className="relative flex-1 h-full flex items-end">
                    <div
                      className="w-full rounded-md bg-secondary hover:bg-secondary/80 transition-colors cursor-pointer"
                      style={{ height: `${expenseHeight}%` }}
                      onMouseEnter={() => setHoveredBar({ label: d.label, type: 'expense' })}
                      onMouseLeave={() => setHoveredBar(null)}
                    />
                    {hoveredBar?.label === d.label && hoveredBar.type === 'expense' && (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2.5 py-1 text-[10px] font-medium text-background shadow-lg z-10">
                        {formatRupiah(d.expense)}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-5 sm:gap-7 px-1 mt-3">
            {chartData.map((d) => (
              <div key={d.label} className="flex-1 text-center text-xs text-muted-foreground truncate">
                {d.label}
              </div>
            ))}
          </div>
        </>
      )}

      <div className="flex items-center justify-center gap-5 mt-4">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-primary/30" />
          <span className="text-xs text-muted-foreground">Income</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-secondary" />
          <span className="text-xs text-muted-foreground">Expense</span>
        </div>
      </div>
    </div>
  );
};

export default MonthlyTrendChart;
