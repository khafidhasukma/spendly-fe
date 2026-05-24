import { useNavigate } from 'react-router-dom';
import { Wallet, ArrowRight, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WalletCTA = () => {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 sm:size-12">
            <Wallet className="size-5 text-primary sm:size-6" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground font-manrope sm:text-lg">
              Manage Your Wallets
            </h3>
            <p className="text-xs text-muted-foreground sm:text-sm">
              Add wallets, track balances, and transfer funds
            </p>
          </div>
        </div>

        <Button
          size="sm"
          onClick={() => navigate('/wallet')}
          className="gap-1.5 py-2.5 h-auto cursor-pointer px-3"
        >
          <CreditCard className="size-3.5" />
          <span className="hidden sm:inline">View Wallets</span>
          <span className="sm:hidden">Wallets</span>
          <ArrowRight className="size-3.5" />
        </Button>
      </div>
    </div>
  );
};

export default WalletCTA;
