import { Pencil, Trash2, MoreVertical, type LucideIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface CategoryCardProps {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  transactions: number;
  total: number;
  onEdit: () => void;
  onDelete: () => void;
}

function formatRupiah(amount: number) {
  return amount === 0 ? 'Rp 0' : `Rp ${new Intl.NumberFormat('id-ID').format(amount)}`;
}

export default function CategoryCard({
  name,
  icon: Icon,
  color,
  bgColor,
  transactions,
  total,
  onEdit,
  onDelete,
}: CategoryCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${bgColor}`}>
          <Icon className={`h-5 w-5 ${color}`} />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="More options">
              <MoreVertical className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={onEdit} className="cursor-pointer">
              <Pencil className="mr-2 h-4 w-4" />
              Edit Kategori
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500 focus:text-red-500 cursor-pointer" onSelect={onDelete}>
              <Trash2 className="mr-2 h-4 w-4 text-red-500" />
              Hapus Kategori
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <p className="mt-4 mb-1 font-semibold text-foreground text-base">{name}</p>
      <p className="text-sm text-muted-foreground">{transactions} Transaksi</p>
      <p className="mt-4 text-lg font-bold text-foreground">{formatRupiah(total)}</p>
    </div>
  );
}
