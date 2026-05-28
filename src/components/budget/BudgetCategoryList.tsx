/* eslint-disable camelcase */
import {
  MoreHorizontal,
  Pencil,
  Trash2,
} from 'lucide-react';
import type { BudgetItem } from '@/types/budget';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { formatRupiah } from '@/utils';

interface BudgetCategoryListProps {
  budgets?: BudgetItem[];
  isLoading?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const BudgetCategoryItemCard = ({
  budget,
  onEdit,
  onDelete,
}: {
  budget: BudgetItem;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}) => {
  const { id, name, category_icon, category_color, amount, spent, percentage_used, is_exceeded, status } = budget;
  const limit = parseFloat(amount);
  const spentNum = parseFloat(spent);
  const pct = parseFloat(percentage_used);
  const remaining = Math.max(limit - spentNum, 0);

  const isDanger = is_exceeded;
  const isWarning = status === 'warning';

  const barColor = isDanger ? 'bg-red-500' : isWarning ? 'bg-secondary' : 'bg-emerald-500';
  const statusText = isDanger
    ? 'Over budget!'
    : isWarning
      ? 'Almost reached'
      : `${Math.round(pct)}% used`;
  const statusColor = isDanger
    ? 'text-red-500'
    : isWarning
      ? 'text-secondary'
      : 'text-muted-foreground';

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="flex size-10 items-center justify-center rounded-lg text-lg sm:size-11"
            style={{ backgroundColor: `${category_color}20` }}
          >
            {category_icon}
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground sm:text-base">{name}</p>
            <p className={`text-xs font-medium ${statusColor}`}>{statusText}</p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-xs">
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit?.(id)}>
              <Pencil className="size-4" />
              Edit Budget
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600 focus:text-red-600"
              onClick={() => onDelete?.(id)}
            >
              <Trash2 className="size-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Amount info */}
      <div className="mt-4 flex items-end justify-between text-sm">
        <span className="text-muted-foreground">
          {formatRupiah(spentNum)} <span className="text-xs">spent</span>
        </span>
        <span className="font-semibold text-foreground">
          {formatRupiah(limit)}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all ${barColor}`}
          style={{ width: `${Math.min(pct, 100)}%` }}
        />
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        {formatRupiah(remaining)} remaining
      </p>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
    <div className="flex items-start gap-3">
      <div className="size-10 animate-pulse rounded-lg bg-muted sm:size-11" />
      <div className="space-y-2">
        <div className="h-4 w-28 animate-pulse rounded bg-muted" />
        <div className="h-3 w-20 animate-pulse rounded bg-muted" />
      </div>
    </div>
    <div className="mt-4 flex justify-between">
      <div className="h-3.5 w-24 animate-pulse rounded bg-muted" />
      <div className="h-3.5 w-20 animate-pulse rounded bg-muted" />
    </div>
    <div className="mt-2 h-2.5 w-full animate-pulse rounded-full bg-muted" />
    <div className="mt-2 h-3 w-28 animate-pulse rounded bg-muted" />
  </div>
);

const BudgetCategoryList = ({
  budgets = [],
  isLoading = false,
  onEdit,
  onDelete,
}: BudgetCategoryListProps) => {
  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground font-manrope sm:text-xl">
          Budget per Category
        </h3>
        <p className="text-sm text-muted-foreground">
          {budgets.length} categories
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {budgets.map((budget) => (
            <BudgetCategoryItemCard
              key={budget.id}
              budget={budget}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BudgetCategoryList;
