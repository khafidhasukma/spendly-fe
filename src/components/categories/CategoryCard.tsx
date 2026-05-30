import { Pencil, Trash2, type LucideIcon } from 'lucide-react';
import { hexTint } from '@/lib/category-icons';
import { formatRupiah } from '@/utils';

interface CategoryCardProps {
  id: string;
  name: string;
  icon: LucideIcon;   // resolved Lucide component
  color: string;      // hex color from API
  type: string;
  isSystem: boolean;
  transactions: number;
  total: number;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const CategoryCard = ({
  id,
  name,
  icon: Icon,
  color,
  isSystem,
  transactions,
  total,
  onEdit,
  onDelete,
}: CategoryCardProps) => {
  return (
    <div className="group rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div
          className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg"
          style={{ backgroundColor: hexTint(color) }}
        >
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" style={{ color }} />
        </div>

        {!isSystem && (
          <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              type="button"
              onClick={() => onEdit?.(id)}
              className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-primary"
              aria-label={`Edit ${name}`}
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onDelete?.(id)}
              className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              aria-label={`Delete ${name}`}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>

      <p className="mt-3 sm:mt-4 mb-0.5 sm:mb-1 font-semibold text-foreground text-sm sm:text-base">{name}</p>
      <p className="text-xs sm:text-sm text-muted-foreground">{transactions} Transactions</p>
      <p className="mt-3 sm:mt-4 text-base sm:text-lg font-bold text-foreground">
        {total === 0 ? 'Rp 0' : formatRupiah(total)}
      </p>
    </div>
  );
};

export default CategoryCard;
