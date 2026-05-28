import { Eye, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { formatRupiahAmount, formatDate } from '@/utils';
import { getHistoryCategoryIcon, getHistoryCategoryStyle } from '@/lib/history-category-palette';
import type { HistoryTableMobileProps } from '@/types';

const HistoryTableMobile = ({ groups, onView, onEdit, onDelete }: HistoryTableMobileProps) => {
  return (
    <div className="space-y-5 p-3 sm:p-4 md:hidden">
      {groups.map(([label, txs]) => (
        <section key={label} className="space-y-2">
          {/* date */}
          <p className="px-0.5 text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
          <div className="space-y-2">
            {txs.map((tx) => {
              const Icon = tx.icon ?? getHistoryCategoryIcon(tx.category.id);
              const style = getHistoryCategoryStyle(tx.category.id);
              return (
                <Card key={tx.id} className="gap-0 py-0 rounded-lg">
                  <CardContent className="flex items-start gap-2.5 p-3.5 sm:gap-3 sm:p-4">
                    {/* transaction icon */}
                    <div
                      className={cn(
                        'flex h-8 w-8 shrink-0 items-center justify-center rounded-md',
                        style.iconBg,
                      )}
                    >
                      <Icon className={cn('h-4 w-4', style.iconColor)} />
                    </div>
                    {/* transaction merchant name */}
                    <div className="min-w-0 flex-1 space-y-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <p className="min-w-0 flex-1 text-sm leading-snug text-foreground">{tx.merchant}</p>
                        <span
                          className={cn(
                            'shrink-0 text-sm tabular-nums',
                            tx.amount < 0 ? 'text-destructive' : 'text-green-600 dark:text-green-400',
                          )}
                        >
                          {formatRupiahAmount(tx.amount)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        <span>{tx.category.name}</span>
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
                          {onView ? (
                            <DropdownMenuItem className="cursor-pointer" onSelect={() => onView(tx.id)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View details
                            </DropdownMenuItem>
                          ) : null}
                          {onEdit ? (
                            <DropdownMenuItem className="cursor-pointer" onSelect={() => onEdit(tx.id)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit transaction
                            </DropdownMenuItem>
                          ) : null}
                          {onDelete ? (
                            <DropdownMenuItem
                              className="cursor-pointer text-red-500 focus:text-red-500"
                              onSelect={() => onDelete(tx.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4 text-red-500" />
                              Delete transaction
                            </DropdownMenuItem>
                          ) : null}
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