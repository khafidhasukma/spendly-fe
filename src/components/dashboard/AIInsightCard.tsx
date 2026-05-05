import { Sparkles, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface AIInsightCardProps {
  title?: string;
  viewDetailsTo?: string;
}

export default function AIInsightCard({
  title = 'Smart Savings',
  viewDetailsTo = '/ai-analysis',
}: AIInsightCardProps) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-primary-container p-6">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary">
          <Sparkles className="h-5 w-5 text-[#86D2A6] dark:text-on-primary-container" />
        </div>
        <span className="rounded bg-on-primary-container/15 dark:bg-primary/20 px-3 py-1 text-xs font-semibold text-on-primary-container">
          AI INSIGHT
        </span>
      </div>

      <h3 className="mt-4 text-2xl font-semibold text-primary font-manrope">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-on-primary-container/80">
        Based on your recent utility trends, you're on track to save <span className="font-semibold">Rp200.000</span>
        more than last month. Keep it up!
      </p>

      <Link
        to={viewDetailsTo}
        className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline">
        View details <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
