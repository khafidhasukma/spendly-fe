import { Eye, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { formatRupiah, formatDate } from '@/utils';
import type { TransactionItem } from '@/types';

type Props = {
  groups: [string, TransactionItem[]][];
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

const HistoryTableMobile = ({ groups, onView, onEdit, onDelete }: Props) => {
  return (
    <div className="space-y-5 p-3 sm:p-4 md:hidden">
      {groups.map(([label, txs]) => (
        <section key={label} className="space-y-2">
          <p className="px-0.5 text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
          <div className="space-y-2">
            {txs.map((tx) => {
              const amount = parseFloat(tx.amount);
              const isExpense = tx.type === 'expense';
              return (
                <Card key={tx.id} className="gap-0 py-0 rounded-lg">
                  <CardContent className="flex items-start gap-2.5 p-3.5 sm:gap-3 sm:p-4">
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-base"
                      style={{ backgroundColor: `${tx.category_color}20` }}
                    >
                      {tx.category_icon}
                    </div>
                    <div className="min-w-0 flex-1 space-y-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <p className="min-w-0 flex-1 text-sm leading-snug text-foreground">
                          {tx.merchant_name}
                        </p>
                        <span
                          className={cn(
                            'shrink-0 text-sm tabular-nums',
                            isExpense ? 'text-destructive' : 'text-green-600 dark:text-green-400',
                          )}
                        >
                          {isExpense ? '-' : '+'}Rp{formatRupiah(amount)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        <span>{tx.category_name}</span>
                        <span className="mx-1.5 opacity-60">•</span>
                        <span>{formatDate(tx.date)}</span>
                      </p>
                    </div>
                    {(onView || onEdit || onDelete) && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            className="inline-flex shrink-0 items-center text-muted-foreground transition-colors"
                            aria-label="More options"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          {onView && (
                            <DropdownMenuItem className="cursor-pointer" onSelect={() => onView(tx.id)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View details
                            </DropdownMenuItem>
                          )}
                          {onEdit && (
                            <DropdownMenuItem className="cursor-pointer" onSelect={() => onEdit(tx.id)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit transaction
                            </DropdownMenuItem>
                          )}
                          {onDelete && (
                            <DropdownMenuItem
                              className="cursor-pointer text-red-500 focus:text-red-500"
                              onSelect={() => onDelete(tx.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4 text-red-500" />
                              Delete transaction
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
};

export default HistoryTableMobile;
