import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { formatRupiahAmount, formatDate, paymentSourceLabel } from '@/utils';
import { getHistoryCategoryIcon, getHistoryCategoryStyle } from '@/lib/history-category-palette';
import type { HistoryTransaction } from './historyTypes';

type HistoryTableDesktopProps = {
  transactions: HistoryTransaction[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

const HistoryTableDesktop = ({ transactions, onEdit, onDelete }: HistoryTableDesktopProps) => {
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
            const Icon = tx.icon ?? getHistoryCategoryIcon(tx.category.id);
            const style = getHistoryCategoryStyle(tx.category.id);
            const source = paymentSourceLabel(tx.paymentMethod);
            return (
              <tr key={tx.id} className="transition-colors hover:bg-muted/30">
                <td className="px-4 py-4 sm:px-6">
                  {/* transaction icon and merchant name */}
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
                        style.iconBg,
                      )}
                    >
                      <Icon className={cn('h-4 w-4', style.iconColor)} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm text-foreground">{tx.merchant}</p>
                      <p className="text-xs text-muted-foreground">{source}</p>
                    </div>
                  </div>
                </td>

                {/* category */}
                <td className="px-4 py-4 sm:px-6 text-center">
                  <Badge className={cn('font-medium', style.badgeClass)}>{tx.category.name}</Badge>
                </td>

                {/* date */}
                <td className="px-4 py-4 text-sm text-muted-foreground sm:px-6">{formatDate(tx.date)}</td>

                {/* amount */}
                <td
                  className={cn(
                    'px-4 py-4 text-right text-sm font-semibold tabular-nums sm:px-6',
                    tx.amount < 0 ? 'text-destructive' : 'text-green-600 dark:text-green-400',
                  )}
                >
                  {formatRupiahAmount(tx.amount)}
                </td>

                <td className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-end gap-0.5 sm:gap-1">
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
}

export default HistoryTableDesktop;