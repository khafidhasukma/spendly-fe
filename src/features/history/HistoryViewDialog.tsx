/* eslint-disable react-hooks/static-components */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { formatRupiahAmount, formatDate, paymentSourceLabel } from '@/utils';
import { getHistoryCategoryIcon, getHistoryCategoryStyle } from '@/lib/history-category-palette';
import { CalendarDays, Store, Banknote, CreditCard, Tag, FileText } from 'lucide-react';
import type { HistoryViewDialogProps } from '@/types';

const HistoryViewDialog = ({ open, onOpenChange, transaction }: HistoryViewDialogProps) => {
  if (!transaction) return null;

  const Icon = transaction.icon ?? getHistoryCategoryIcon(transaction.category.id);
  const style = getHistoryCategoryStyle(transaction.category.id);
  const source = paymentSourceLabel(transaction.paymentMethod);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className='text-start'>Transaction Details</DialogTitle>
          <DialogDescription className='text-start'>
            Complete transaction information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          {/* Header with icon and amount */}
          <div className="flex flex-col items-center gap-3 pt-2">
            <div
              className={cn(
                'flex h-14 w-14 items-center justify-center rounded-full',
                style.iconBg,
              )}
            >
              <Icon className={cn('h-7 w-7', style.iconColor)} />
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-foreground">{transaction.merchant}</p>
              <p
                className={cn(
                  'text-2xl font-bold tabular-nums mt-1',
                  transaction.amount < 0
                    ? 'text-destructive'
                    : 'text-green-600 dark:text-green-400',
                )}
              >
                {formatRupiahAmount(transaction.amount)}
              </p>
            </div>
          </div>

          <Separator />

          {/* Detail rows */}
          <div className="space-y-3.5">
            <DetailRow
              icon={<Tag className="h-4 w-4" />}
              label="Category"
              value={
                <Badge className={cn('font-medium', style.badgeClass)}>
                  {transaction.category.name}
                </Badge>
              }
            />
            <DetailRow
              icon={<CalendarDays className="h-4 w-4" />}
              label="Date"
              value={<span className="text-sm text-foreground">{formatDate(transaction.date)}</span>}
            />
            <DetailRow
              icon={<CreditCard className="h-4 w-4" />}
              label="Payment Method"
              value={<span className="text-sm text-foreground">{source}</span>}
            />
            <DetailRow
              icon={<Store className="h-4 w-4" />}
              label="Merchant"
              value={<span className="text-sm text-foreground">{transaction.merchant}</span>}
            />
            <DetailRow
              icon={<Banknote className="h-4 w-4" />}
              label="Amount"
              value={
                <span
                  className={cn(
                    'text-sm font-semibold tabular-nums',
                    transaction.amount < 0
                      ? 'text-destructive'
                      : 'text-green-600 dark:text-green-400',
                  )}
                >
                  {formatRupiahAmount(transaction.amount)}
                </span>
              }
            />

            {/* Notes section */}
            {transaction.notes && (
              <>
                <Separator />
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span className="text-xs font-medium uppercase tracking-wide">Notes</span>
                  </div>
                  <p className="rounded-md bg-muted/50 p-3 text-sm text-foreground leading-relaxed">
                    {transaction.notes}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-xs font-medium">{label}</span>
      </div>
      <div className="text-right">{value}</div>
    </div>
  );
}

export default HistoryViewDialog;
