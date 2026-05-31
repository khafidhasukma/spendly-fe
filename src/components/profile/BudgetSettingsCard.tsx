import { useNavigate } from 'react-router-dom';
import { Wallet, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { formatRupiah } from '@/utils';

const BudgetSettingsCard = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  const monthlyLimit = user ? parseFloat(user.monthly_limit) : 0;

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5 md:p-6">
      <div className="mb-5 sm:mb-6 md:mb-8 flex gap-3 items-center justify-between">
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
          View
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div>
        <p className="mb-2 sm:mb-3 text-xs sm:text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Monthly Limit (Rp)
        </p>
        <div className="flex items-baseline gap-2 rounded-lg bg-muted px-3 py-4 sm:px-4 sm:py-6">
          {isLoading ? (
            <div className="h-8 w-48 animate-pulse rounded bg-muted-foreground/20 sm:h-10" />
          ) : (
            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">
              {formatRupiah(monthlyLimit)}
            </span>
          )}
        </div>
        <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-muted-foreground">
          This limit applies across all your linked accounts and categories.
        </p>
      </div>
    </div>
  );
};

export default BudgetSettingsCard;
