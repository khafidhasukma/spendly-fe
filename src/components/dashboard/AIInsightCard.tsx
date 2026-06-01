import { Sparkles, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { AIInsightCardProps } from '@/types';

const AIInsightCard = ({
  title = 'Smart Savings',
  viewDetailsTo = '/ai-analysis',
  AIInsight
}: AIInsightCardProps) => {
  return (
    <div className="relative flex h-full min-h-40 flex-col overflow-hidden rounded-2xl bg-primary-container p-5 sm:min-h-44 sm:p-6">
      <div className="flex items-start justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary sm:h-10 sm:w-10">
          <Sparkles className="h-4 w-4 text-white sm:h-5 sm:w-5" />
        </div>
        <span className="rounded bg-black/10 dark:bg-white/10 px-2.5 py-1 text-xs font-semibold text-on-primary-container sm:px-3">
          AI INSIGHT
        </span>
      </div>

      <h3 className="mt-3 text-xl font-semibold text-on-primary-container font-manrope sm:mt-4 sm:text-2xl">
        {title}
      </h3>
      {AIInsight && (
        <p className="mt-2 flex-1 text-sm leading-relaxed text-on-primary-container/80">
          {AIInsight}
        </p>
      )}

      <Link
        to={viewDetailsTo}
        className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-on-primary-container hover:underline">
        View details <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  );
};

export default AIInsightCard;
