import { useState } from 'react';
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

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      {/* Card header */}
      <div className="mb-8 flex items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary/10">
            <Wallet className="h-5 w-5 text-secondary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground font-manrope">Budget Settings</h3>
        </div>
        <button className="flex items-center gap-1 font-semibold text-primary transition-colors hover:text-primary/80">
          View Detailed Budgeting
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Monthly limit */}
      <div className="mb-10">
        <p className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">Monthly Limit (Rp)</p>
        <div className="flex items-baseline gap-2 rounded-lg bg-muted/50 dark:bg-muted/20 px-4 py-6">
          <span className="text-2xl font-medium text-muted-foreground">Rp</span>
          <span className="text-3xl font-bold tracking-tight text-primary">{formatRupiah(monthlyLimit)}</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          This limit applies across all your linked accounts and categories.
        </p>
      </div>

      {/* Spending alerts toggle */}
      <div className="flex items-center justify-between gap-4 bg-muted/50 dark:bg-muted/20 p-4.5 rounded-lg">
        <div>
          <p className="text-lg font-semibold text-foreground">Spending Alerts</p>
          <p className="text-sm text-muted-foreground">Notify me when I reach 80% of my budget</p>
        </div>
        <Switch checked={alerts} onCheckedChange={setAlerts} />
      </div>
    </div>
  );
};

export default BudgetSettingsCard;