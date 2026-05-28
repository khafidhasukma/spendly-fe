import { type LucideIcon } from 'lucide-react';
import { formatRupiah } from '@/utils';

interface CategoryCardProps {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  transactions: number;
  total: number;
}

const CategoryCard = ({
  name,
  icon: Icon,
  color,
  bgColor,
  transactions,
  total,
}: CategoryCardProps) => {
  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-5 md:p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg ${bgColor}`}>
          <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${color}`} />
        </div>
      </div>

      <p className="mt-3 sm:mt-4 mb-0.5 sm:mb-1 font-semibold text-foreground text-sm sm:text-base">{name}</p>
      <p className="text-xs sm:text-sm text-muted-foreground">{transactions} Transactions</p>
      <p className="mt-3 sm:mt-4 text-base sm:text-lg font-bold text-foreground">{total === 0 ? 'Rp 0' : `Rp ${formatRupiah(total)}`}</p>
    </div>
  );
};

export default CategoryCard;