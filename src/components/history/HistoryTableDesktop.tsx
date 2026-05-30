import { Eye, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { formatRupiah, formatDate } from '@/utils';
import { getIconByName, hexTint } from '@/lib/category-icons';
import type { TransactionItem } from '@/types';

type Props = {
  transactions: TransactionItem[];
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

const HistoryTableDesktop = ({ transactions, onView, onEdit, onDelete }: Props) => {
  return (
    <div className="hidden overflow-x-auto md:block">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/40">
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:px-6 sm:py-3.5">
              Transaction
            </th>
            <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:px-6 sm:py-3.5">
              Category
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:px-6 sm:py-3.5">
              Date
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:px-6 sm:py-3.5">
              Amount
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:px-6 sm:py-3.5">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {transactions.map((tx) => {
            const amount = parseFloat(tx.amount);
            const isExpense = tx.type === 'expense';
            const isTransfer = tx.type === 'transfer';
            const Icon = getIconByName(isTransfer ? 'ArrowLeftRight' : tx.category_icon);
            const displayColor = isTransfer ? '#3B82F6' : (tx.category_color ?? '#6B7280');
            const displayCategory = isTransfer ? 'Transfer' : tx.category_name;
            return (
              <tr key={tx.id} className="transition-colors hover:bg-muted/30">
                <td className="px-4 py-4 sm:px-6">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: hexTint(displayColor) }}
                    >
                      <Icon className="h-4 w-4" style={{ color: displayColor }} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm text-foreground">{tx.merchant_name}</p>
                      <p className="text-xs text-muted-foreground">{tx.wallet_name}</p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-4 sm:px-6 text-center">
                  <Badge
                    className="font-medium"
                    style={{
                      backgroundColor: `${displayColor}20`,
                      color: displayColor,
                      borderColor: `${displayColor}40`,
                    }}
                  >
                    {displayCategory}
                  </Badge>
                </td>

                <td className="px-4 py-4 text-sm text-muted-foreground sm:px-6">
                  {formatDate(tx.date)}
                </td>

                <td
                  className={cn(
                    'px-4 py-4 text-right text-sm font-semibold tabular-nums sm:px-6',
                    isTransfer ? 'text-blue-600 dark:text-blue-400'
                      : isExpense ? 'text-destructive' : 'text-green-600 dark:text-green-400',
                  )}
                >
                  {isExpense ? '-' : isTransfer ? '' : '+'}{formatRupiah(amount)}
                </td>

                <td className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-end gap-0.5 sm:gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 text-muted-foreground hover:text-blue-600 sm:h-8 sm:w-8"
                      onClick={() => onView?.(tx.id)}
                      aria-label="View transaction"
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 text-muted-foreground hover:text-primary sm:h-8 sm:w-8"
                      onClick={() => onEdit?.(tx.id)}
                      aria-label="Edit transaction"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 text-muted-foreground hover:text-destructive sm:h-8 sm:w-8"
                      onClick={() => onDelete?.(tx.id)}
                      aria-label="Delete transaction"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTableDesktop;
