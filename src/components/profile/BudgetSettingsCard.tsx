import { useState } from 'react';
import { Wallet, ChevronRight } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

interface BudgetSettingsCardProps {
  monthlyLimit?: number;
  spendingAlerts?: boolean;
}

function formatRupiah(amount: number) {
  return new Intl.NumberFormat('id-ID').format(amount);
}

export default function BudgetSettingsCard({
  monthlyLimit = 25_000_000,
  spendingAlerts: initialAlerts = true,
}: BudgetSettingsCardProps) {
  const [alerts, setAlerts] = useState(initialAlerts);

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      {/* Card header */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/10">
            <Wallet className="h-5 w-5 text-secondary" />
          </div>
          <h3 className="text-base font-semibold text-foreground">Budget Settings</h3>
        </div>
        <button className="flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary/80">
          View Detailed Budgeting
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Monthly limit */}
      <div className="mb-4">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Monthly Limit (Rp)
        </p>
        <div className="flex items-baseline gap-2 rounded-xl bg-muted/50 dark:bg-muted/20 px-4 py-3">
          <span className="text-sm font-medium text-muted-foreground">Rp</span>
          <span className="text-2xl font-bold tracking-tight text-foreground">
            {formatRupiah(monthlyLimit)}
          </span>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          This limit applies across all your linked accounts and categories.
        </p>
      </div>

      <Separator className="my-4" />

      {/* Spending alerts toggle */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-foreground">Spending Alerts</p>
          <p className="text-xs text-muted-foreground">
            Notify me when I reach 80% of my budget
          </p>
        </div>
        <Switch checked={alerts} onCheckedChange={setAlerts} />
      </div>
    </div>
  );
}
