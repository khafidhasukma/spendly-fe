import {
  AIInsightCard,
  BalanceCard,
  DashboardGreeting,
  QuickCategories,
  RecentTransactions,
  WalletCTA,
} from '@/components/dashboard';
import { usePageTitle } from '@/hooks';

const DashboardPage = () => {
  usePageTitle('Dashboard');
  return (
    <div className="space-y-6 lg:space-y-8">
      <DashboardGreeting />

      {/* Hero row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-6">
        <div className="lg:col-span-3">
          <BalanceCard />
        </div>
        <div className="lg:col-span-2">
          <AIInsightCard />
        </div>
      </div>

      {/* Wallet CTA */}
      <WalletCTA />

      <QuickCategories />

      {/* Bottom row */}
      <RecentTransactions />
    </div>
  );
};

export default DashboardPage;
