import { useState, useRef } from 'react';
import {
  Sparkles,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  UtensilsCrossed,
  ShoppingBag,
  Car,
  Home,
  HeartPulse,
  Filter,
  Bot,
} from 'lucide-react';
import PageHeader from '@/components/ui/page-header';

const formatRupiah = (n: number) => new Intl.NumberFormat('id-ID').format(n);

// --- Filter Options ---
const filterOptions = ['This Month', 'Last 3 Months', '6 Months', 'This Year'] as const;
type FilterOption = (typeof filterOptions)[number];

// --- Mock Data ---
const monthlyData = [
  { month: 'Jul', income: 8_200_000, expense: 5_100_000 },
  { month: 'Aug', income: 8_500_000, expense: 5_800_000 },
  { month: 'Sep', income: 8_300_000, expense: 4_900_000 },
  { month: 'Oct', income: 9_000_000, expense: 6_200_000 },
  { month: 'Nov', income: 8_800_000, expense: 5_500_000 },
  { month: 'Dec', income: 9_200_000, expense: 5_300_000 },
];

const categoryBreakdown = [
  { name: 'Lifestyle & Dining', amount: 1_850_000, pct: 35, color: '#10B981', tag: 'Frequent', icon: UtensilsCrossed },
  { name: 'Commute & Travel', amount: 750_000, pct: 18, color: '#76BC43', tag: 'Routine', icon: Car },
  { name: 'Retail Therapy', amount: 1_200_000, pct: 12, color: '#F48221', tag: 'Outliers', icon: ShoppingBag },
  { name: 'Household', amount: 650_000, pct: 15, color: '#3B82F6', tag: 'Essential', icon: Home },
  { name: 'Health & Wellness', amount: 500_000, pct: 11, color: '#EF4444', tag: 'Priority', icon: HeartPulse },
  { name: 'Others', amount: 350_000, pct: 9, color: '#6B7280', tag: 'Misc', icon: Zap },
];

// --- Donut Chart with Tooltip ---
const DonutChart = () => {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const total = categoryBreakdown.reduce((s, c) => s + c.pct, 0);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  const segments = categoryBreakdown.reduce<
    Array<typeof categoryBreakdown[number] & { startPercent: number; segLength: number; offset: number }>
  >((acc, cat) => {
    const prevPercent = acc.length > 0 ? acc[acc.length - 1].startPercent + acc[acc.length - 1].pct / total : 0;
    const segLength = (cat.pct / total) * circumference;
    const offset = circumference - (prevPercent * circumference);
    acc.push({ ...cat, startPercent: prevPercent, segLength, offset });
    return acc;
  }, []);

  const handleMouseMove = (e: React.MouseEvent<SVGCircleElement>, name: string) => {
    if (svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      setTooltipPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top - 40,
      });
    }
    setHoveredSegment(name);
  };

  const hoveredCat = categoryBreakdown.find((c) => c.name === hoveredSegment);

  return (
    <div className="relative w-full flex justify-center">
      <div className="relative w-48 h-48 sm:w-56 sm:h-56">
        <svg
          ref={svgRef}
          viewBox="0 0 100 100"
          className="w-full h-full"
          style={{ overflow: 'visible' }}
        >
          {segments.map((seg) => (
            <circle
              key={seg.name}
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth="14"
              strokeDasharray={`${seg.segLength} ${circumference - seg.segLength}`}
              strokeDashoffset={seg.offset}
              transform="rotate(-90 50 50)"
              className="cursor-pointer transition-opacity duration-200"
              style={{
                opacity: hoveredSegment && hoveredSegment !== seg.name ? 0.3 : 1,
              }}
              onMouseMove={(e) => handleMouseMove(e, seg.name)}
              onMouseLeave={() => {
                setHoveredSegment(null);
                setTooltipPos(null);
              }}
            />
          ))}
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {hoveredSegment && hoveredCat ? (
            <>
              <p className="text-[11px] text-muted-foreground leading-tight text-center px-4">{hoveredCat.name}</p>
              <p className="text-lg font-bold text-foreground font-manrope">{hoveredCat.pct}%</p>
            </>
          ) : (
            <>
              <p className="text-[11px] text-muted-foreground">Total Expense</p>
              <p className="text-lg font-bold text-foreground font-manrope sm:text-xl">Rp5.3M</p>
            </>
          )}
        </div>

        {/* Floating tooltip */}
        {hoveredSegment && tooltipPos && hoveredCat && (
          <div
            className="absolute z-30 pointer-events-none whitespace-nowrap rounded-lg bg-foreground px-3 py-1.5 text-xs font-medium text-background shadow-lg"
            style={{ left: tooltipPos.x, top: tooltipPos.y, transform: 'translateX(-50%)' }}
          >
            {hoveredCat.name}: Rp{formatRupiah(hoveredCat.amount)}
          </div>
        )}
      </div>
    </div>
  );
};

// --- Bar Chart Component (fixed) ---
const BarChart = () => {
  const maxVal = Math.max(...monthlyData.flatMap((d) => [d.income, d.expense]));
  const [hoveredBar, setHoveredBar] = useState<{ month: string; type: string } | null>(null);

  return (
    <div>
      {/* Chart area - uses flex-grow bars */}
      <div className="flex items-end gap-5 sm:gap-7 px-1" style={{ height: '260px' }}>
        {monthlyData.map((d) => {
          const incomeHeight = (d.income / maxVal) * 100;
          const expenseHeight = (d.expense / maxVal) * 100;
          return (
            <div key={d.month} className="flex-1 flex items-end justify-center gap-2 h-full">
              {/* Income bar */}
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
              {/* Expense bar */}
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

      {/* Month labels */}
      <div className="flex gap-5 sm:gap-7 px-1 mt-3">
        {monthlyData.map((d) => (
          <div key={d.month} className="flex-1 text-center text-xs text-muted-foreground">
            {d.month}
          </div>
        ))}
      </div>

      {/* Legend */}
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

// --- Filter Dropdown ---
function FilterDropdown({
  value,
  onChange,
}: {
  value: FilterOption;
  onChange: (v: FilterOption) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-muted sm:px-4 sm:text-sm"
      >
        <Filter className="h-3.5 w-3.5 text-muted-foreground" />
        {value}
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full z-20 mt-1 w-40 overflow-hidden rounded-lg border border-border bg-card shadow-md">
            {filterOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`w-full px-4 py-2.5 text-left text-xs sm:text-sm transition-colors hover:bg-muted ${
                  opt === value ? 'bg-primary/5 font-semibold text-primary' : 'text-foreground'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// --- Main Page ---
const AnalisisAIPage = () => {
  const [filter, setFilter] = useState<FilterOption>('This Month');

  return (
    <div className="space-y-5 sm:space-y-6 lg:space-y-8">
      {/* Header with Filter */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <PageHeader
          breadcrumb={[{ label: 'Dashboard', to: '/' }, { label: 'AI Analysis' }]}
          title="AI Financial Analysis"
          description="Smart insights powered by AI to help you understand spending patterns."
        />
        <div className="shrink-0 self-end sm:self-start">
          <FilterDropdown value={filter} onChange={setFilter} />
        </div>
      </div>

      {/* Top Row: Summary Cards (1 col, 2 rows) + AI Intelligence (2 columns, same height) */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
        {/* Left: Summary Cards stacked */}
        <div className="flex flex-col gap-3">
          <SummaryCard label="Total Income" value="Rp9.200.000" change={4.5} positive />
          <SummaryCard label="Total Expense" value="Rp5.300.000" change={-12} positive />
        </div>

        {/* Right: AI Intelligence Card - stretches to match left height */}
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-[#005C39] to-[#003d26] p-5 sm:p-6 flex flex-col justify-between">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/5" />
          <div className="relative">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10">
                <Bot className="h-4 w-4 text-[#86D2A6]" />
              </div>
              <p className="text-[10px] font-semibold tracking-wide text-[#86D2A6] uppercase">
                AI Intelligence
              </p>
            </div>
            <h3 className="text-base font-bold text-white font-manrope mt-3 sm:text-lg">
              Savings Optimization
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              Based on your recent lifestyle shifts, you can optimize your monthly balance. Reduce dining out by 2x/week to save more.
            </p>
          </div>
          <div className="mt-4 rounded-xl bg-white/10 px-4 py-3">
            <p className="text-[10px] text-[#86D2A6] font-medium">Potential Monthly Savings</p>
            <p className="text-xl font-bold text-white font-manrope sm:text-2xl mt-0.5">Rp1.250.000</p>
          </div>
        </div>
      </div>

      {/* Next Month Prediction - placed after summary, before charts */}
      <div className="rounded-2xl border border-primary/20 bg-primary-container p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-sm font-semibold text-primary font-manrope sm:text-base">
                  Next Month Prediction
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-on-primary-container/80 sm:text-sm">
                  AI predicts your January expenses will be around{' '}
                  <span className="font-bold text-primary">Rp5.100.000</span> — 4% lower than this month.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary shrink-0 self-start">
                <TrendingDown className="h-3 w-3" /> -4% predicted
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-6">
        {/* Monthly Trend - Bar Chart */}
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 lg:col-span-3">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-foreground font-manrope sm:text-lg">
              Monthly Trend
            </h2>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">
              6 Months
            </span>
          </div>
          <BarChart />
        </div>

        {/* Category Breakdown + Pie Chart - Combined Card */}
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 lg:col-span-2">
          <h2 className="text-base font-semibold text-foreground font-manrope sm:text-lg">
            Spending by Category
          </h2>

          {/* Donut Chart */}
          <div className="mt-5">
            <DonutChart />
          </div>

          {/* Category List */}
          <div className="mt-6 space-y-4">
            {categoryBreakdown.map((cat) => {
              const Icon = cat.icon;
              return (
                <div key={cat.name} className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${cat.color}20` }}
                  >
                    <Icon className="h-4 w-4" style={{ color: cat.color }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-foreground">{cat.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {cat.pct}% of total • {cat.tag}
                    </p>
                  </div>
                  <span className="text-sm font-bold tabular-nums text-primary">
                    Rp{formatRupiah(cat.amount)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Summary Card ---
function SummaryCard({
  label,
  value,
  change,
  positive,
}: {
  label: string;
  value: string;
  change: number;
  positive: boolean;
}) {
  const isUp = change > 0;
  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1.5 text-lg font-bold text-foreground tabular-nums sm:text-xl">{value}</p>
      <div className="mt-2 flex items-center gap-1">
        {isUp ? (
          <ArrowUpRight className={`h-3.5 w-3.5 ${positive ? 'text-green-500' : 'text-red-500'}`} />
        ) : (
          <ArrowDownRight className={`h-3.5 w-3.5 ${positive ? 'text-green-500' : 'text-red-500'}`} />
        )}
        <span className={`text-xs font-medium ${positive ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`}>
          {Math.abs(change)}%
        </span>
      </div>
    </div>
  );
}

export default AnalisisAIPage;
