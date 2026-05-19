import { 
  AIInsightCard, 
  BalanceCard, 
  DashboardGreeting, 
  BudgetTracking, 
  QuickCategories, 
  RecentTransactions, 
  WealthGrowth 
} from '@/components/dashboard';

const DashboardPage = () => {
  return (
    <div className="space-y-8">
      <DashboardGreeting />

      <div className="grid grid-cols-1 gap-7 lg:grid-cols-5">
        <div className="lg:col-span-3">
          {/* Balance (wider) */}
          <BalanceCard />
        </div>
        <div className="lg:col-span-2">
          {/* AI Insight */}
          <AIInsightCard />
        </div>
      </div>

      {/* Quick Categories */}
      <QuickCategories />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Transactions */}
        <RecentTransactions />

        {/* Budget & Wealth */}
        <div className="flex flex-col gap-6">
          <BudgetTracking />
          <WealthGrowth />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
