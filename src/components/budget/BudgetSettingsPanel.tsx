import { useState } from 'react';
import { Bell, Shield, Calendar, AlertTriangle } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface BudgetSettingsPanelProps {
  monthlyLimit?: number;
  spendingAlerts?: boolean;
  weeklyReport?: boolean;
  autoReset?: boolean;
}

const formatRupiah = (amount: number) => new Intl.NumberFormat('id-ID').format(amount);

const BudgetSettingsPanel = ({
  monthlyLimit = 25_000_000,
  spendingAlerts: initialAlerts = true,
  weeklyReport: initialWeekly = true,
  autoReset: initialAutoReset = true,
}: BudgetSettingsPanelProps) => {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [weeklyReport, setWeeklyReport] = useState(initialWeekly);
  const [autoReset, setAutoReset] = useState(initialAutoReset);

  const settings = [
    {
      icon: Bell,
      iconBg: 'bg-orange-100 dark:bg-orange-900/30',
      iconColor: 'text-orange-600 dark:text-orange-400',
      title: 'Spending Alerts',
      description: 'Notify when reaching 80% of budget',
      checked: alerts,
      onChange: setAlerts,
    },
    {
      icon: Calendar,
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400',
      title: 'Weekly Report',
      description: 'Receive weekly spending summary',
      checked: weeklyReport,
      onChange: setWeeklyReport,
    },
    {
      icon: Shield,
      iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      title: 'Auto Reset',
      description: 'Reset budgets at the start of each month',
      checked: autoReset,
      onChange: setAutoReset,
    },
  ];

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5 md:p-6">
      <h3 className="text-lg font-semibold text-foreground font-manrope sm:text-xl">
        Budget Settings
      </h3>

      {/* Monthly limit display */}
      <div className="mt-4 rounded-xl bg-muted/50 dark:bg-muted/20 p-4 sm:p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Monthly Limit
        </p>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-medium text-muted-foreground">Rp</span>
          <span className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
            {formatRupiah(monthlyLimit)}
          </span>
        </div>
        <p className="mt-1.5 text-xs text-muted-foreground">
          Applies across all categories
        </p>
      </div>

      {/* Alert threshold */}
      <div className="mt-4 flex items-center gap-3 rounded-xl border border-secondary/30 bg-secondary/5 p-3 sm:p-4">
        <AlertTriangle className="size-5 shrink-0 text-secondary" />
        <p className="text-sm text-foreground">
          Alert threshold set at <span className="font-semibold">80%</span> of each category budget
        </p>
      </div>

      {/* Toggle settings */}
      <div className="mt-5 space-y-3 sm:mt-6 sm:space-y-4">
        {settings.map((setting) => (
          <div
            key={setting.title}
            className="flex items-center justify-between gap-3 rounded-xl bg-muted/50 dark:bg-muted/20 p-3 sm:p-4"
          >
            <div className="flex items-center gap-3">
              <div className={`flex size-9 items-center justify-center rounded-lg ${setting.iconBg}`}>
                <setting.icon className={`size-4.5 ${setting.iconColor}`} />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{setting.title}</p>
                <p className="text-xs text-muted-foreground">{setting.description}</p>
              </div>
            </div>
            <Switch checked={setting.checked} onCheckedChange={setting.onChange} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetSettingsPanel;
