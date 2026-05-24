import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { SummaryCardProps } from '@/types/ai-analysis';

const SummaryCard = ({ label, value, change, positive }: SummaryCardProps) => {
  const isUp = change > 0;
  return (
    <div className="flex-1 rounded-xl border border-border bg-card p-4 sm:p-5">
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
};

export default SummaryCard;
