import {
  ShoppingCart,
  Utensils,
  Car,
  Gamepad2,
  Zap,
  GraduationCap,
  Heart,
  MoreHorizontal,
  Pencil,
  Trash2,
} from 'lucide-react';
import type { BudgetCategory } from '@/types/budget';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { formatRupiah } from '@/utils';

const mockCategories: BudgetCategory[] = [
  {
    id: '1',
    label: 'Groceries',
    icon: ShoppingCart,
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400',
    limit: 3_000_000,
    spent: 2_150_000,
  },
  {
    id: '2',
    label: 'Food & Dining',
    icon: Utensils,
    iconBg: 'bg-orange-100 dark:bg-orange-900/30',
    iconColor: 'text-orange-600 dark:text-orange-400',
    limit: 2_500_000,
    spent: 1_800_000,
  },
  {
    id: '3',
    label: 'Transportation',
    icon: Car,
    iconBg: 'bg-purple-100 dark:bg-purple-900/30',
    iconColor: 'text-purple-600 dark:text-purple-400',
    limit: 1_500_000,
    spent: 1_450_000,
  },
  {
    id: '4',
    label: 'Entertainment',
    icon: Gamepad2,
    iconBg: 'bg-pink-100 dark:bg-pink-900/30',
    iconColor: 'text-pink-600 dark:text-pink-400',
    limit: 1_000_000,
    spent: 980_000,
  },
  {
    id: '5',
    label: 'Utilities',
    icon: Zap,
    iconBg: 'bg-yellow-100 dark:bg-yellow-900/30',
    iconColor: 'text-yellow-600 dark:text-yellow-400',
    limit: 800_000,
    spent: 650_000,
  },
  {
    id: '6',
    label: 'Education',
    icon: GraduationCap,
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    limit: 2_000_000,
    spent: 1_200_000,
  },
  {
    id: '7',
    label: 'Health',
    icon: Heart,
    iconBg: 'bg-red-100 dark:bg-red-900/30',
    iconColor: 'text-red-600 dark:text-red-400',
    limit: 1_500_000,
    spent: 500_000,
  },
];

interface BudgetCategoryListProps {
  categories?: BudgetCategory[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const BudgetCategoryItem = ({
  category,
  onEdit,
  onDelete,
}: {
  category: BudgetCategory;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}) => {
  const { id, label, icon: Icon, iconBg, iconColor, limit, spent } = category;
  const pct = Math.min((spent / limit) * 100, 100);
  const isDanger = pct >= 100;
  const isWarning = pct >= 85 && !isDanger;

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
          <div className={`flex size-10 items-center justify-center rounded-lg ${iconBg} sm:size-11`}>
            <Icon className={`size-5 ${iconColor}`} />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground sm:text-base">{label}</p>
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
          {formatRupiah(spent)} <span className="text-xs">spent</span>
        </span>
        <span className="font-semibold text-foreground">
          {formatRupiah(limit)}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        {formatRupiah(Math.max(limit - spent, 0))} remaining
      </p>
    </div>
  );
};

const BudgetCategoryList = ({
  categories = mockCategories,
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
          {categories.length} categories
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        {categories.map((cat) => (
          <BudgetCategoryItem
            key={cat.id}
            category={cat}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default BudgetCategoryList;
