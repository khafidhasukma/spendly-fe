import React from 'react';
import { ScanLine } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from '@/components/ui/empty';
import { Button } from '@/components/ui/button';
import { getIconByName, hexTint } from '@/lib/category-icons';
import { formatRupiah } from '@/utils';
import type { RecentTransactionsProps } from '@/types';

const SkeletonRow = () => (
  <li className="flex items-center gap-3 py-3 sm:py-3.5">
    <div className="h-10 w-10 shrink-0 animate-pulse rounded-lg bg-muted" />
    <div className="flex-1 space-y-1.5">
      <div className="h-3.5 w-32 animate-pulse rounded bg-muted" />
      <div className="h-3 w-20 animate-pulse rounded bg-muted" />
    </div>
    <div className="space-y-1.5 text-right">
      <div className="h-3.5 w-20 animate-pulse rounded bg-muted" />
      <div className="h-3 w-12 animate-pulse rounded bg-muted" />
    </div>
  </li>
);

const RecentTransactions = ({ transactions = [], isLoading = false }: RecentTransactionsProps) => {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground font-manrope sm:text-2xl">
          Recent Transactions
        </h2>
        <Link to="/history" className="text-sm font-semibold text-primary hover:underline">
          View All
        </Link>
      </div>

      {isLoading ? (
        <ul className="mt-4 divide-y divide-border sm:mt-5">
          {Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} />)}
        </ul>
      ) : transactions.length === 0 ? (
        <Empty className="mt-6 border border-dashed">
          <EmptyHeader>
            <EmptyMedia variant="icon"><ScanLine /></EmptyMedia>
            <EmptyTitle>No Transactions Yet</EmptyTitle>
            <EmptyDescription>
              Start scanning your receipts to record your first expense.
            </EmptyDescription>
          </EmptyHeader>
          <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
            <Link to="/scan">Scan Receipt Now</Link>
          </Button>
        </Empty>
      ) : (
        <ul className="mt-4 divide-y divide-border sm:mt-5">
          {transactions.map((tx) => {
            const iconEl = React.createElement(getIconByName(tx.categoryIcon), {
              className: 'h-4 w-4 sm:h-5 sm:w-5',
              style: { color: tx.categoryColor },
            });
            return (
              <li key={tx.id} className="flex items-center gap-3 py-3 sm:py-3.5">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: hexTint(tx.categoryColor) }}
                >
                  {iconEl}
                </div>

                <div className="min-w-0 flex-1 space-y-1">
                  <p className="truncate text-sm font-semibold text-foreground">{tx.merchant}</p>
                  <p className="text-xs text-muted-foreground">{tx.datetime}</p>
                </div>

                <div className="shrink-0 text-right">
                  <p className={`text-sm font-bold tabular-nums ${tx.type !== 'expense' ? 'text-green-600 dark:text-green-400' : 'text-foreground'}`}>
                    {tx.amount > 0 ? '+' : ''}{formatRupiah(tx.amount)}
                  </p>
                  <p className="text-[0.625rem] font-semibold uppercase tracking-wide text-muted-foreground">
                    {tx.categoryName}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default RecentTransactions;
