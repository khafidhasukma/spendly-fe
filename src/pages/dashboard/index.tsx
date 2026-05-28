import {
  AIInsightCard,
  BalanceCard,
  BudgetTracking,
  DashboardGreeting,
  QuickCategories,
  RecentTransactions,
  WalletCTA,
} from '@/components/dashboard';
import { usePageTitle } from '@/hooks';
import {
  useDashboard,
  toDisplayTransactions,
  toBudgetItems,
} from '@/features/dashboard';

const DashboardPage = () => {
  usePageTitle('Dashboard');
  const { data, isLoading } = useDashboard();

  const balance = data?.balance;
  const transactions = data ? toDisplayTransactions(data.recent_transactions) : [];
  const budgets = data ? toBudgetItems(data.budgets) : [];

  return (
    <div className="space-y-6 lg:space-y-8">
      <DashboardGreeting />

      {/* hero row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-6">
        <div className="lg:col-span-3">
          <BalanceCard
            totalBalance={balance ? parseFloat(balance.total) : undefined}
            income={balance ? parseFloat(balance.income) : undefined}
            expense={balance ? parseFloat(balance.expense) : undefined}
            incomeChangePct={balance?.income_change_pct}
            expenseChangePct={balance?.expense_change_pct}
            isLoading={isLoading}
          />
        </div>
        <div className="lg:col-span-2">
          <AIInsightCard />
        </div>
      </div>

      {/* wallet CTA */}
      <WalletCTA />

      <QuickCategories />

      {/* bottom row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-6">
        <div className="lg:col-span-3">
          <RecentTransactions transactions={transactions} isLoading={isLoading} />
        </div>
        <div className="lg:col-span-2">
          <BudgetTracking budgets={budgets} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
