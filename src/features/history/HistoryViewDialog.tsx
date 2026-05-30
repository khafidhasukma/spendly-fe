import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { formatRupiah, formatDate } from '@/utils';
import { getIconByName, hexTint } from '@/lib/category-icons';
import { CalendarDays, Store, Banknote, CreditCard, Tag, FileText, Wallet } from 'lucide-react';
import type { TransactionItem } from '@/types';

// renders a Lucide icon by name with hex color & tinted bg
const CategoryIconBubble = ({ iconName, color, size = 'md' }: { iconName: string; color: string; size?: 'sm' | 'md' }) => {
  const Icon = getIconByName(iconName);
  const dim = size === 'sm' ? 'h-9 w-9' : 'h-14 w-14';
  const iconDim = size === 'sm' ? 'h-4 w-4' : 'h-6 w-6';
  return (
    <div
      className={`flex ${dim} items-center justify-center rounded-full`}
      style={{ backgroundColor: hexTint(color) }}
    >
      <Icon className={iconDim} style={{ color }} />
    </div>
  );
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: TransactionItem | undefined;
};

const HistoryViewDialog = ({ open, onOpenChange, transaction }: Props) => {
  if (!transaction) return null;

  const amount = parseFloat(transaction.amount);
  const isExpense = transaction.type === 'expense';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-start">Transaction Details</DialogTitle>
          <DialogDescription className="text-start">
            Complete transaction information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div className="flex flex-col items-center gap-3 pt-2">
            <CategoryIconBubble iconName={transaction.category_icon} color={transaction.category_color} />
            <div className="text-center">
              <p className="text-lg font-semibold text-foreground">{transaction.merchant_name}</p>
              <p
                className={cn(
                  'text-2xl font-bold tabular-nums mt-1',
                  isExpense ? 'text-destructive' : 'text-green-600 dark:text-green-400',
                )}
              >
                {isExpense ? '-' : '+'}{formatRupiah(amount)}
              </p>
            </div>
          </div>

          <Separator />

          <div className="space-y-3.5">
            <DetailRow
              icon={<Tag className="h-4 w-4" />}
              label="Category"
              value={
                <span
                  className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                  style={{
                    backgroundColor: `${transaction.category_color}20`,
                    color: transaction.category_color,
                  }}
                >
                  {transaction.category_name}
                </span>
              }
            />
            <DetailRow
              icon={<CalendarDays className="h-4 w-4" />}
              label="Date"
              value={<span className="text-sm text-foreground">{formatDate(transaction.date)}</span>}
            />
            <DetailRow
              icon={<Wallet className="h-4 w-4" />}
              label="Wallet"
              value={<span className="text-sm text-foreground">{transaction.wallet_name}</span>}
            />
            <DetailRow
              icon={<Store className="h-4 w-4" />}
              label="Merchant"
              value={<span className="text-sm text-foreground">{transaction.merchant_name}</span>}
            />
            <DetailRow
              icon={<Banknote className="h-4 w-4" />}
              label="Amount"
              value={
                <span
                  className={cn(
                    'text-sm font-semibold tabular-nums',
                    isExpense ? 'text-destructive' : 'text-green-600 dark:text-green-400',
                  )}
                >
                  {isExpense ? '-' : '+'}{formatRupiah(amount)}
                </span>
              }
            />
            <DetailRow
              icon={<CreditCard className="h-4 w-4" />}
              label="Type"
              value={
                <span className="text-sm capitalize text-foreground">{transaction.type}</span>
              }
            />

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

function DetailRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
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
