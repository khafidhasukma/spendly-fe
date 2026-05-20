import {
  Sparkles,
  TrendingDown,
  Lightbulb,
  ShieldCheck,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  UtensilsCrossed,
  ShoppingBag,
  Car,
  Home,
  HeartPulse,
} from 'lucide-react';
import PageHeader from '@/components/ui/page-header';

const formatRupiah = (n: number) => new Intl.NumberFormat('id-ID').format(n);

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
  { name: 'F&B', amount: 1_850_000, pct: 35, color: '#F48221', icon: UtensilsCrossed },
  { name: 'Shopping', amount: 1_200_000, pct: 23, color: '#8B5CF6', icon: ShoppingBag },
  { name: 'Transport', amount: 750_000, pct: 14, color: '#3B82F6', icon: Car },
  { name: 'Household', amount: 650_000, pct: 12, color: '#10B981', icon: Home },
  { name: 'Health', amount: 500_000, pct: 9, color: '#EF4444', icon: HeartPulse },
  { name: 'Others', amount: 350_000, pct: 7, color: '#6B7280', icon: Zap },
];

const aiInsights = [
  {
    icon: TrendingDown,
    iconBg: 'bg-green-100 dark:bg-green-500/20',
    iconColor: 'text-green-600 dark:text-green-400',
    title: 'Spending Decreased',
    description: 'Your spending dropped 12% compared to last month. F&B category saw the biggest reduction.',
  },
  {
    icon: Lightbulb,
    iconBg: 'bg-amber-100 dark:bg-amber-500/20',
    iconColor: 'text-amber-600 dark:text-amber-400',
    title: 'Savings Opportunity',
    description: 'You could save Rp450.000/month by reducing shopping frequency from 8 to 5 transactions.',
  },
  {
    icon: ShieldCheck,
    iconBg: 'bg-blue-100 dark:bg-blue-500/20',
    iconColor: 'text-blue-600 dark:text-blue-400',
    title: 'Budget Health: Good',
    description: 'You\'re within budget for 4 out of 6 categories. Transport is 15% over limit.',
  },
  {
    icon: Target,
    iconBg: 'bg-purple-100 dark:bg-purple-500/20',
    iconColor: 'text-purple-600 dark:text-purple-400',
    title: 'Goal Progress',
    description: 'At this rate, you\'ll reach your Rp50M savings goal by March 2027 — 2 months ahead of schedule.',
  },
];

// --- Donut Chart Component ---
const DonutChart = () => {
  const total = categoryBreakdown.reduce((s, c) => s + c.pct, 0);
  const segments = categoryBreakdown.reduce<{ name: string; color: string; dashArray: number; dashOffset: number }[]>(
    (acc, cat) => {
      const offset = acc.length > 0 ? acc[acc.length - 1].dashOffset - acc[acc.length - 1].dashArray : 0;
      acc.push({
        name: cat.name,
        color: cat.color,
        dashArray: (cat.pct / total) * 283,
        dashOffset: offset,
      });
      return acc;
    },
    [],
  );

  return (
    <div className="relative mx-auto h-44 w-44 sm:h-52 sm:w-52">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        {segments.map((seg) => (
          <circle
            key={seg.name}
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={seg.color}
            strokeWidth="10"
            strokeDasharray={`${seg.dashArray} ${283 - seg.dashArray}`}
            strokeDashoffset={seg.dashOffset}
            strokeLinecap="round"
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-xs text-muted-foreground">Total</p>
        <p className="text-lg font-bold text-foreground font-manrope sm:text-xl">
          Rp5.3M
        </p>
      </div>
    </div>
  );
};

// --- Bar Chart Component ---
const BarChart = () => {
  const maxVal = Math.max(...monthlyData.flatMap((d) => [d.income, d.expense]));

  return (
    <div className="space-y-3">
      <div className="flex h-40 items-end gap-1.5 sm:h-48 sm:gap-2">
        {monthlyData.map((d) => (
          <div key={d.month} className="flex flex-1 items-end justify-center gap-0.5 sm:gap-1">
            <div
              className="w-full max-w-3 rounded-t-sm bg-primary/30 sm:max-w-4"
              style={{ height: `${(d.income / maxVal) * 100}%` }}
              title={`Income: Rp${formatRupiah(d.income)}`}
            />
            <div
              className="w-full max-w-3 rounded-t-sm bg-secondary sm:max-w-4"
              style={{ height: `${(d.expense / maxVal) * 100}%` }}
              title={`Expense: Rp${formatRupiah(d.expense)}`}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-1.5 sm:gap-2">
        {monthlyData.map((d) => (
          <div key={d.month} className="flex-1 text-center text-[10px] text-muted-foreground sm:text-xs">
            {d.month}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-4 pt-1">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-primary/30" />
          <span className="text-xs text-muted-foreground">Income</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-secondary" />
          <span className="text-xs text-muted-foreground">Expense</span>
        </div>
      </div>
    </div>
  );
};

// --- Main Page ---
const AnalisisAIPage = () => {
  return (
    <div className="space-y-6 lg:space-y-8">
      <PageHeader
        breadcrumb={[
          { label: 'Dashboard', to: '/' },
          { label: 'AI Analysis' },
        ]}
        title="AI Financial Analysis"
        description="Smart insights powered by AI to help you understand spending patterns and optimize your finances."
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        <SummaryCard
          label="Total Income"
          value="Rp9.200.000"
          change={4.5}
          positive
        />
        <SummaryCard
          label="Total Expense"
          value="Rp5.300.000"
          change={-12}
          positive
        />
        <SummaryCard
          label="Net Savings"
          value="Rp3.900.000"
          change={18.2}
          positive
        />
        <SummaryCard
          label="Avg Daily"
          value="Rp176.667"
          change={-8}
          positive
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-6">
        {/* Monthly Trend */}
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 lg:col-span-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground font-manrope sm:text-xl">
              Monthly Trend
            </h2>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              6 Months
            </span>
          </div>
          <div className="mt-5">
            <BarChart />
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-foreground font-manrope sm:text-xl">
            Spending by Category
          </h2>
          <div className="mt-4">
            <DonutChart />
          </div>
          <ul className="mt-4 space-y-2">
            {categoryBreakdown.slice(0, 4).map((cat) => (
              <li key={cat.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-xs text-muted-foreground sm:text-sm">{cat.name}</span>
                </div>
                <span className="text-xs font-semibold text-foreground sm:text-sm">{cat.pct}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* AI Insights */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <h2 className="text-lg font-semibold text-foreground font-manrope sm:text-xl">
            AI Insights
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-4">
          {aiInsights.map((insight) => {
            const Icon = insight.icon;
            return (
              <div
                key={insight.title}
                className="flex gap-3 rounded-xl border border-border bg-card p-4 sm:gap-4 sm:p-5"
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${insight.iconBg}`}>
                  <Icon className={`h-5 w-5 ${insight.iconColor}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">{insight.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {insight.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category Detail Table */}
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-foreground font-manrope sm:text-xl">
          Category Breakdown
        </h2>
        <div className="mt-4 space-y-3">
          {categoryBreakdown.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.name} className="flex items-center gap-3">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${cat.color}15` }}
                >
                  <Icon className="h-4 w-4" style={{ color: cat.color }} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{cat.name}</span>
                    <span className="text-sm font-semibold tabular-nums text-foreground">
                      Rp{formatRupiah(cat.amount)}
                    </span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${cat.pct}%`, backgroundColor: cat.color }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Prediction Card */}
      <div className="rounded-2xl border border-primary/20 bg-primary-container p-5 sm:p-6">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary sm:h-11 sm:w-11">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary font-manrope sm:text-xl">
              Next Month Prediction
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-on-primary-container/80">
              Based on your spending patterns, AI predicts your January expenses will be around{' '}
              <span className="font-bold text-primary">Rp5.100.000</span>. This is 4% lower than
              this month. Your top spending category will likely remain F&B at approximately Rp1.7M.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <TrendingDown className="h-3 w-3" /> -4% predicted
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-on-primary-container/10 px-3 py-1 text-xs font-semibold text-on-primary-container">
                <Target className="h-3 w-3" /> On track for goal
              </span>
            </div>
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
    <div className="rounded-xl border border-border bg-card p-3.5 sm:p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-base font-bold text-foreground tabular-nums sm:text-lg">{value}</p>
      <div className="mt-1.5 flex items-center gap-1">
        {isUp ? (
          <ArrowUpRight className={`h-3 w-3 ${positive ? 'text-green-500' : 'text-red-500'}`} />
        ) : (
          <ArrowDownRight className={`h-3 w-3 ${positive ? 'text-green-500' : 'text-red-500'}`} />
        )}
        <span className={`text-xs font-medium ${positive ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`}>
          {Math.abs(change)}%
        </span>
      </div>
    </div>
  );
}

export default AnalisisAIPage;
