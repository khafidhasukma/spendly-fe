import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, ArrowRight } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import type { BudgetSettingsCardProps } from '@/types';

const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat('id-ID').format(amount);
};

const BudgetSettingsCard = ({
  monthlyLimit = 25_000_000,
  spendingAlerts: initialAlerts = true,
}: BudgetSettingsCardProps) => {
  const [alerts, setAlerts] = useState(initialAlerts);
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5 md:p-6">
      {/* Card header */}
      <div className="mb-5 sm:mb-6 md:mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-md bg-secondary/10">
            <Wallet className="h-4 w-4 sm:h-5 sm:w-5 text-secondary" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-foreground font-manrope">Budget Settings</h3>
        </div>
        <button
          onClick={() => navigate('/budget')}
          className="flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
        >
          View Detailed Budgeting
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Monthly limit */}
      <div className="mb-6 sm:mb-8 md:mb-10">
        <p className="mb-2 sm:mb-3 text-xs sm:text-sm font-medium uppercase tracking-wide text-muted-foreground">Monthly Limit (Rp)</p>
        <div className="flex items-baseline gap-2 rounded-lg bg-muted/50 dark:bg-muted/20 px-3 py-4 sm:px-4 sm:py-6">
          <span className="text-xl sm:text-2xl font-medium text-muted-foreground">Rp</span>
          <span className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">{formatRupiah(monthlyLimit)}</span>
        </div>
        <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-muted-foreground">
          This limit applies across all your linked accounts and categories.
        </p>
      </div>

      {/* Spending alerts toggle */}
      <div className="flex items-center justify-between gap-3 sm:gap-4 bg-muted/50 dark:bg-muted/20 p-3 sm:p-4 md:p-4.5 rounded-lg">
        <div>
          <p className="text-base sm:text-lg font-semibold text-foreground">Spending Alerts</p>
          <p className="text-xs sm:text-sm text-muted-foreground">Notify me when I reach 80% of my budget</p>
        </div>
        <Switch checked={alerts} onCheckedChange={setAlerts} />
      </div>
    </div>
  );
};

export default BudgetSettingsCard;