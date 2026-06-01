// import { useState } from 'react';
import PageHeader from '@/components/ui/page-header';
import {
  SummaryCard,
  // FilterDropdown,
  MonthlyTrendChart,
  PredictionCard,
  SpendingCategoryCard,
  TipCard,
  InsightCards,
  // type FilterOption,
} from '@/components/ai-analysis';
import { groupInsights } from '@/components/ai-analysis/insight-utils';
import { usePageTitle } from '@/hooks';
import { useAnalysis } from '@/features/analytics';
import { formatRupiah } from '@/utils';

const AnalisisAIPage = () => {
  usePageTitle('AI Analysis');
  // const [filter, setFilter] = useState<FilterOption>('This Month');
  const { data, isLoading } = useAnalysis();

  const cashFlow = data?.insights.cash_flow ?? [];
  const latest = cashFlow[cashFlow.length - 1];
  const prev = cashFlow[cashFlow.length - 2];

  const totalIncome = latest ? parseFloat(latest.income) : 0;
  const totalExpense = latest ? parseFloat(latest.expense) : 0;

  const incomeChange = latest && prev
    ? Math.round(((parseFloat(latest.income) - parseFloat(prev.income)) / parseFloat(prev.income)) * 100) : 0;
  const expenseChange = latest && prev
    ? Math.round(((parseFloat(latest.expense) - parseFloat(prev.expense)) / parseFloat(prev.expense)) * 100) : 0;

  const grouped = groupInsights(data?.insights.insights_list ?? []);
  const tipItem = grouped.find((g) => g.type === 'tip') ?? null;
  const alertItems = grouped.filter((g) => g.type !== 'tip');

  return (
    <div className="space-y-5 sm:space-y-6 lg:space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <PageHeader
          title="AI Financial Analysis"
          description="Smart insights powered by AI to help you understand spending patterns."
        />
        {/* <div className="shrink-0 self-end sm:self-start">
          <FilterDropdown value={filter} onChange={setFilter} />
        </div> */}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-4">
          <SummaryCard
            label="Total Income"
            value={formatRupiah(totalIncome)}
            change={incomeChange}
            positive={incomeChange >= 0}
            loading={isLoading}
          />
          <SummaryCard
            label="Total Expense"
            value={formatRupiah(totalExpense)}
            change={expenseChange}
            positive={expenseChange <= 0}
            loading={isLoading}
          />
        </div>
        <TipCard tip={tipItem} loading={isLoading} />
      </div>

      <div className="space-y-3">
        <p className="text-base md:text-lg lg:text-xl font-semibold text-foreground font-manrope">Alerts & Notifications</p>
        <InsightCards items={alertItems} loading={isLoading} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-5 lg:gap-6 lg:items-stretch">
        <div className="lg:col-span-3 flex flex-col gap-4 lg:gap-6">
          <MonthlyTrendChart data={data?.insights.cash_flow} loading={isLoading} />
          <PredictionCard forecast={data?.forecast} loading={isLoading} />
        </div>
        <div className="lg:col-span-2 flex">
          <SpendingCategoryCard clusters={data?.insights.spending_clusters} loading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default AnalisisAIPage;
