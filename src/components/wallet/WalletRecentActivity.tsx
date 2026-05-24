import { ArrowDownLeft, ArrowUpRight, ArrowLeftRight } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'income' | 'expense' | 'transfer';
  description: string;
  amount: number;
  date: string;
  wallet: string;
}

const mockActivity: ActivityItem[] = [
  { id: '1', type: 'income', description: 'Salary', amount: 8_000_000, date: '24 May 2026', wallet: 'BCA' },
  { id: '2', type: 'expense', description: 'Grocery Shopping', amount: 450_000, date: '23 May 2026', wallet: 'Cash' },
  { id: '3', type: 'transfer', description: 'BCA → GoPay', amount: 500_000, date: '22 May 2026', wallet: 'BCA' },
  { id: '4', type: 'expense', description: 'Electricity Bill', amount: 350_000, date: '21 May 2026', wallet: 'Mandiri' },
  { id: '5', type: 'income', description: 'Freelance Payment', amount: 2_500_000, date: '20 May 2026', wallet: 'BCA' },
];

const formatRupiah = (amount: number) => new Intl.NumberFormat('id-ID').format(amount);

const typeConfig = {
  income: {
    icon: ArrowDownLeft,
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    amountColor: 'text-emerald-600 dark:text-emerald-400',
    prefix: '+',
  },
  expense: {
    icon: ArrowUpRight,
    iconBg: 'bg-red-100 dark:bg-red-900/30',
    iconColor: 'text-red-600 dark:text-red-400',
    amountColor: 'text-red-600 dark:text-red-400',
    prefix: '-',
  },
  transfer: {
    icon: ArrowLeftRight,
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400',
    amountColor: 'text-blue-600 dark:text-blue-400',
    prefix: '',
  },
};

interface WalletRecentActivityProps {
  activities?: ActivityItem[];
}

const WalletRecentActivity = ({ activities = mockActivity }: WalletRecentActivityProps) => {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5 md:p-6">
      <h3 className="text-lg font-semibold text-foreground font-manrope sm:text-xl">
        Recent Activity
      </h3>

      <div className="mt-4 space-y-3 sm:mt-5">
        {activities.map((activity) => {
          const config = typeConfig[activity.type];
          const Icon = config.icon;

          return (
            <div
              key={activity.id}
              className="flex items-center justify-between gap-3 rounded-xl bg-muted/50 dark:bg-muted/20 p-3 sm:p-4"
            >
              <div className="flex items-center gap-3">
                <div className={`flex size-9 items-center justify-center rounded-lg ${config.iconBg} sm:size-10`}>
                  <Icon className={`size-4 sm:size-5 ${config.iconColor}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.wallet} • {activity.date}
                  </p>
                </div>
              </div>
              <p className={`text-sm font-semibold ${config.amountColor} sm:text-base`}>
                {config.prefix}Rp{formatRupiah(activity.amount)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WalletRecentActivity;
