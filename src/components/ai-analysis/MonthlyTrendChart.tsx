import { useState } from 'react';

const formatRupiah = (n: number) => new Intl.NumberFormat('id-ID').format(n);

const monthlyData = [
  { month: 'Jul', income: 8_200_000, expense: 5_100_000 },
  { month: 'Aug', income: 8_500_000, expense: 5_800_000 },
  { month: 'Sep', income: 8_300_000, expense: 4_900_000 },
  { month: 'Oct', income: 9_000_000, expense: 6_200_000 },
  { month: 'Nov', income: 8_800_000, expense: 5_500_000 },
  { month: 'Dec', income: 9_200_000, expense: 5_300_000 },
];

const MonthlyTrendChart = () => {
  const maxVal = Math.max(...monthlyData.flatMap((d) => [d.income, d.expense]));
  const [hoveredBar, setHoveredBar] = useState<{ month: string; type: string } | null>(null);

  return (
    <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-semibold text-foreground font-manrope sm:text-lg">
          Monthly Trend
        </h2>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">
          6 Months
        </span>
      </div>

      <div className="flex items-end gap-5 sm:gap-7 px-1" style={{ height: '260px' }}>
        {monthlyData.map((d) => {
          const incomeHeight = (d.income / maxVal) * 100;
          const expenseHeight = (d.expense / maxVal) * 100;
          return (
            <div key={d.month} className="flex-1 flex items-end justify-center gap-2 h-full">
              <div className="relative flex-1 h-full flex items-end">
                <div
                  className="w-full rounded-md bg-primary/30 hover:bg-primary/50 transition-colors cursor-pointer"
                  style={{ height: `${incomeHeight}%` }}
                  onMouseEnter={() => setHoveredBar({ month: d.month, type: 'income' })}
                  onMouseLeave={() => setHoveredBar(null)}
                />
                {hoveredBar?.month === d.month && hoveredBar.type === 'income' && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2.5 py-1 text-[10px] font-medium text-background shadow-lg z-10">
                    Rp{formatRupiah(d.income)}
                  </div>
                )}
              </div>
              <div className="relative flex-1 h-full flex items-end">
                <div
                  className="w-full rounded-md bg-secondary hover:bg-secondary/80 transition-colors cursor-pointer"
                  style={{ height: `${expenseHeight}%` }}
                  onMouseEnter={() => setHoveredBar({ month: d.month, type: 'expense' })}
                  onMouseLeave={() => setHoveredBar(null)}
                />
                {hoveredBar?.month === d.month && hoveredBar.type === 'expense' && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2.5 py-1 text-[10px] font-medium text-background shadow-lg z-10">
                    Rp{formatRupiah(d.expense)}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-5 sm:gap-7 px-1 mt-3">
        {monthlyData.map((d) => (
          <div key={d.month} className="flex-1 text-center text-xs text-muted-foreground">
            {d.month}
          </div>
        ))}
      </div>

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
