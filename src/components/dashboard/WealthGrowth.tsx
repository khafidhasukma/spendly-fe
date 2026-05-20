import { TrendingUp } from 'lucide-react';
import type { BarData, WealthGrowthProps } from '@/types';

const mockData: BarData[] = [
  { month: 'Jul', value: 40 },
  { month: 'Aug', value: 55 },
  { month: 'Sep', value: 35 },
  { month: 'Oct', value: 65 },
  { month: 'Nov', value: 72 },
  { month: 'Dec', value: 90 },
];

export { type WealthGrowthProps } from '@/types';

const WealthGrowth = ({ percentage = 12.4, data = mockData }: WealthGrowthProps) => {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="rounded-2xl border border-border bg-surface-warm p-5 shadow-sm sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase text-muted-foreground">Wealth Growth</p>
          <p className="mt-1 text-xl font-semibold text-primary sm:text-2xl">+{percentage}%</p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-card sm:h-10 sm:w-10">
          <TrendingUp className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
        </div>
      </div>

      <div className="mt-4 flex h-16 items-end gap-1 sm:h-20 sm:gap-1.5">
        {data.map((bar, i) => {
          const heightPct = maxValue > 0 ? (bar.value / maxValue) * 100 : 0;
          const isLast = i === data.length - 1;
          return (
            <div key={bar.month} className="flex flex-1 flex-col items-center gap-1">
              <div
                title={`${bar.month}: ${bar.value}`}
                className={`w-full rounded-t-sm transition-all ${isLast ? 'bg-primary' : 'bg-primary/25'}`}
                style={{ height: `${heightPct}%` }}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-1 flex gap-1 sm:gap-1.5">
        {data.map((bar) => (
          <div
            key={bar.month}
            className="flex-1 text-center text-[9px] text-muted-foreground sm:text-[10px]"
          >
            {bar.month}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WealthGrowth;
