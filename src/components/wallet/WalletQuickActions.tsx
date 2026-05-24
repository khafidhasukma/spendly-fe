import { ArrowDownLeft, ArrowUpRight, ArrowLeftRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WalletQuickActionsProps {
  onAddIncome?: () => void;
  onAddExpense?: () => void;
  onTransfer?: () => void;
  onAddWallet?: () => void;
}

const WalletQuickActions = ({
  onAddIncome,
  onAddExpense,
  onTransfer,
  onAddWallet,
}: WalletQuickActionsProps) => {
  const actions = [
    {
      label: 'Add Income',
      icon: ArrowDownLeft,
      onClick: onAddIncome,
      className: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/50',
    },
    {
      label: 'Add Expense',
      icon: ArrowUpRight,
      onClick: onAddExpense,
      className: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50',
    },
    {
      label: 'Transfer',
      icon: ArrowLeftRight,
      onClick: onTransfer,
      className: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50',
    },
    {
      label: 'New Wallet',
      icon: Plus,
      onClick: onAddWallet,
      className: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/50',
    },
  ];

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5 md:p-6">
      <h3 className="text-lg font-semibold text-foreground font-manrope sm:text-xl">
        Quick Actions
      </h3>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant="ghost"
            onClick={action.onClick}
            className={`flex h-auto flex-col items-center gap-2 rounded-xl p-4 ${action.className}`}
          >
            <action.icon className="size-6" />
            <span className="text-xs font-medium">{action.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default WalletQuickActions;
