import { useState } from 'react';
import PageHeader from '@/components/ui/page-header';
import {
  SummaryCard,
  AIInsightCard,
  FilterDropdown,
  MonthlyTrendChart,
  PredictionCard,
  SpendingCategoryCard,
} from '@/components/ai-analysis';
import { usePageTitle } from '@/hooks';
import type { FilterOption } from '@/components/ai-analysis';

const AnalisisAIPage = () => {
  usePageTitle('AI Analysis');
  const [filter, setFilter] = useState<FilterOption>('This Month');

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

      {/* Summary + AI Insight */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6 lg:items-stretch">
        <div className="flex flex-col gap-3 h-full">
          <SummaryCard label="Total Income" value="Rp9.200.000" change={4.5} positive />
          <SummaryCard label="Total Expense" value="Rp5.300.000" change={-12} positive />
        </div>
        <AIInsightCard />
      </div>

      {/* Charts: Monthly Trend + Prediction */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-6 lg:items-stretch">
        <div className="lg:col-span-3 flex flex-col gap-4 lg:gap-6">
          <MonthlyTrendChart />
          <PredictionCard />
        </div>
        <div className="lg:col-span-2 flex">
          <SpendingCategoryCard />
        </div>
      </div>
    </div>
  );
};

export default AnalisisAIPage;
