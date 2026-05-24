import {
  AIInsightCard,
  BalanceCard,
  DashboardGreeting,
  BudgetTracking,
  QuickCategories,
  RecentTransactions,
  WalletCTA,
  WealthGrowth,
} from '@/components/dashboard';

const DashboardPage = () => {
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
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-6">
        <div className="lg:col-span-3">
          <RecentTransactions />
        </div>
        <div className="flex flex-col gap-4 lg:col-span-2 lg:gap-6">
          <BudgetTracking />
          <WealthGrowth />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
