import React from 'react';
import { getIconByName, hexTint } from '@/lib/category-icons';
import { formatRupiah, formatDate } from '@/utils';
import type { TransactionItem } from '@/types';

interface WalletRecentActivityProps {
  activities?: TransactionItem[];
  isLoading?: boolean;
}

const SkeletonRow = () => (
  <div className="flex items-center gap-3 py-3">
    <div className="size-9 animate-pulse rounded-lg bg-muted sm:size-10" />
    <div className="flex-1 space-y-1.5">
      <div className="h-3.5 w-32 animate-pulse rounded bg-muted" />
      <div className="h-3 w-20 animate-pulse rounded bg-muted" />
    </div>
    <div className="h-4 w-20 animate-pulse rounded bg-muted" />
  </div>
);

const WalletRecentActivity = ({ activities = [], isLoading = false }: WalletRecentActivityProps) => {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5 md:p-6">
      <h3 className="text-lg font-semibold text-foreground font-manrope sm:text-xl">
        Recent Activity
      </h3>

      <div className="mt-4 space-y-1 sm:mt-5">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
        ) : activities.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">No recent activity</p>
        ) : (
          activities.map((tx) => {
            const amount = parseFloat(tx.amount);
            const isExpense = tx.type === 'expense';
            const iconComponent = React.createElement(getIconByName(tx.category_icon), {
              className: 'size-4 sm:size-5',
              style: { color: tx.category_color ?? '#6B7280' },
            });
            return (
              <div
                key={tx.id}
                className="flex items-center justify-between gap-3 rounded-xl py-2.5"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex size-9 items-center justify-center rounded-lg sm:size-10"
                    style={{ backgroundColor: hexTint(tx.category_color ?? '#6B7280') }}
                  >
                    {iconComponent}
                  </div>
                  <div className='space-y-1'>
                    <p className="text-sm font-medium text-foreground">{tx.merchant_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {tx.type == 'transfer' ? 'Transfer' : tx.category_name} • {formatDate(tx.date)}
                    </p>
                  </div>
                </div>
                <p className={`text-sm font-semibold sm:text-base ${isExpense ? 'text-destructive' : 'text-green-600 dark:text-green-400'}`}>
                  {isExpense ? '-' : '+'}{formatRupiah(amount)}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default WalletRecentActivity;
