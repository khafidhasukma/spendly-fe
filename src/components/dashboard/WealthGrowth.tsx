import { TrendingUp } from 'lucide-react';

interface BarData {
  month: string;
  value: number;
}

const mockData: BarData[] = [
  { month: 'Jul', value: 40 },
  { month: 'Aug', value: 55 },
  { month: 'Sep', value: 35 },
  { month: 'Oct', value: 65 },
  { month: 'Nov', value: 72 },
  { month: 'Dec', value: 90 },
];

export interface WealthGrowthProps {
  percentage?: number;
  data?: BarData[];
}

export default function WealthGrowth({
  percentage = 12.4,
  data = mockData,
}: WealthGrowthProps) {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="rounded-2xl border border-border bg-[#E5E2E1] p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase text-muted-foreground">Wealth Growth</p>
          <p className="mt-1 text-2xl font-semibold text-primary">+{percentage}%</p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
          <TrendingUp className="h-5 w-5 text-primary" />
        </div>
      </div>

      {/* Bar chart */}
      <div className="mt-4 flex h-20 items-end gap-1.5">
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

      {/* Month labels */}
      <div className="mt-1 flex gap-1.5">
        {data.map((bar) => (
          <div key={bar.month} className="flex-1 text-center text-[10px] text-muted-foreground">
            {bar.month}
          </div>
        ))}
      </div>
    </div>
  );
}
