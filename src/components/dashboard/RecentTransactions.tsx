import {
  ShoppingBag,
  UtensilsCrossed,
  Banknote,
  Scissors,
  ScanLine,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from '@/components/ui/empty';
import { Button } from '@/components/ui/button';
import type { DisplayTransaction, RecentTransactionsProps } from '@/types';

const mockTransactions: DisplayTransaction[] = [
  {
    id: '1',
    merchant: 'Apple Store Soho',
    datetime: 'Today • 2:45 PM',
    amount: -1_299_000,
    category: 'SHOPPING',
    icon: ShoppingBag,
    iconBg: 'bg-purple-100 dark:bg-purple-500/20',
    iconColor: 'text-purple-500',
  },
  {
    id: '2',
    merchant: 'Wild Ginger Sushi',
    datetime: 'Yesterday • 8:12 PM',
    amount: -84_500,
    category: 'F&B',
    icon: UtensilsCrossed,
    iconBg: 'bg-amber-100 dark:bg-amber-500/20',
    iconColor: 'text-amber-600',
  },
  {
    id: '3',
    merchant: 'Salary Deposit',
    datetime: 'Nov 25 • 9:00 AM',
    amount: 6_200_000,
    category: 'PAYROLL',
    icon: Banknote,
    iconBg: 'bg-green-100 dark:bg-green-500/20',
    iconColor: 'text-green-600',
  },
  {
    id: '4',
    merchant: 'Sociolla',
    datetime: 'Nov 25 • 9:00 AM',
    amount: -88_500,
    category: 'BEAUTY',
    icon: Scissors,
    iconBg: 'bg-pink-100 dark:bg-pink-500/20',
    iconColor: 'text-pink-500',
  },
];

function formatRupiah(amount: number) {
  return new Intl.NumberFormat('id-ID').format(Math.abs(amount));
}

export { type RecentTransactionsProps } from '@/types';

const RecentTransactions = ({ transactions = mockTransactions }: RecentTransactionsProps) => {
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

      {transactions.length === 0 ? (
        <Empty className="mt-6 border border-dashed">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ScanLine />
            </EmptyMedia>
            <EmptyTitle>Belum Ada Transaksi</EmptyTitle>
            <EmptyDescription>
              Mulai scan struk belanja Anda untuk mencatat pengeluaran pertama.
            </EmptyDescription>
          </EmptyHeader>
          <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
            <Link to="/scan">Scan Struk Sekarang</Link>
          </Button>
        </Empty>
      ) : (
        <ul className="mt-4 divide-y divide-border sm:mt-5">
          {transactions.map((tx) => {
            const Icon = tx.icon;
            return (
              <li key={tx.id} className="flex items-center gap-3 py-3 sm:py-3.5">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${tx.iconBg}`}
                >
                  <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${tx.iconColor}`} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {tx.merchant}
                  </p>
                  <p className="text-xs text-muted-foreground">{tx.datetime}</p>
                </div>

                <div className="shrink-0 text-right">
                  <p
                    className={`text-sm font-bold tabular-nums ${
                      tx.amount > 0
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-foreground'
                    }`}
                  >
                    {tx.amount > 0 ? '+' : '-'}Rp{formatRupiah(tx.amount)}
                  </p>
                  <p className="text-[0.625rem] font-semibold uppercase tracking-wide text-muted-foreground">
                    {tx.category}
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
