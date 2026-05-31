import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Bot } from 'lucide-react';
import PageHeader from '@/components/ui/page-header';
import {
  SummaryCard,
  FilterDropdown,
  MonthlyTrendChart,
  PredictionCard,
  SpendingCategoryCard,
} from '@/components/ai-analysis';
import { TipCard, InsightCards } from '@/components/ai-analysis/AIInsightCard';
import { groupInsights } from '@/components/ai-analysis/insight-utils';
import { usePageTitle } from '@/hooks';
import type { FilterOption } from '@/components/ai-analysis';
import { analysisApi, type AnalysisSummaryData } from '@/api/endpoints/analysis';
import { formatRupiah } from '@/utils';

const AnalisisAIPage = () => {
  usePageTitle('AI Analysis');
  const [filter, setFilter] = useState<FilterOption>('This Month');
  const [data, setData] = useState<AnalysisSummaryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      if (!cancelled) setLoading(true);
      try {
        const res = await analysisApi.getSummary();
        if (!cancelled) setData(res);
      } catch {
        if (!cancelled) toast.error('Failed to load analysis data');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [filter]);

  // Latest cash_flow entry for summary numbers
  const cashFlow = data?.insights.cash_flow ?? [];
  const latest = cashFlow[cashFlow.length - 1];
  const prev   = cashFlow[cashFlow.length - 2];

  const totalIncome  = latest ? parseFloat(latest.income)  : 0;
  const totalExpense = latest ? parseFloat(latest.expense) : 0;

  const incomeChange  = latest && prev
    ? Math.round(((parseFloat(latest.income)  - parseFloat(prev.income))  / parseFloat(prev.income))  * 100) : 0;
  const expenseChange = latest && prev
    ? Math.round(((parseFloat(latest.expense) - parseFloat(prev.expense)) / parseFloat(prev.expense)) * 100) : 0;

  // tip → green card, rest → alert grid
  const grouped    = groupInsights(data?.insights.insights_list ?? []);
  const tipItem    = grouped.find((g) => g.type === 'tip') ?? null;
  const alertItems = grouped.filter((g) => g.type !== 'tip');

  return (
    <div className="space-y-5 sm:space-y-6 lg:space-y-8">
      {/* Header + Filter */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <PageHeader
          title="AI Financial Analysis"
          description="Smart insights powered by AI to help you understand spending patterns."
        />
        <div className="shrink-0 self-end sm:self-start">
          <FilterDropdown value={filter} onChange={setFilter} />
        </div>
      </div>

      {/* Income + Expense | Tip card */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
        <div className="flex flex-col gap-4">
          <SummaryCard
            label="Total Income"
            value={formatRupiah(totalIncome)}
            change={incomeChange}
            positive={incomeChange >= 0}
            loading={loading}
          />
          <SummaryCard
            label="Total Expense"
            value={formatRupiah(totalExpense)}
            change={expenseChange}
            positive={expenseChange <= 0}
            loading={loading}
          />
        </div>
        <TipCard tip={tipItem} loading={loading} />
      </div>

      {/* Alerts & Notifications */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
            <Bot className="h-3.5 w-3.5 text-primary" />
          </div>
          <p className="text-sm font-semibold text-foreground font-manrope">Alerts & Notifications</p>
        </div>
        <InsightCards items={alertItems} loading={loading} />
      </div>

      {/* Monthly Trend + Prediction | Spending by Category */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-6 lg:items-stretch">
        <div className="lg:col-span-3 flex flex-col gap-4 lg:gap-6">
          <MonthlyTrendChart data={data?.insights.cash_flow} loading={loading} />
          <PredictionCard forecast={data?.forecast} loading={loading} />
        </div>
        <div className="lg:col-span-2 flex">
          <SpendingCategoryCard clusters={data?.insights.spending_clusters} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default AnalisisAIPage;
