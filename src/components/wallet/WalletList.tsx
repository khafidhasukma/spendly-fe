import type { ApiWallet } from '@/api/endpoints/wallets';
import WalletCard from './WalletCard';

const SkeletonCard = () => (
  <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
    <div className="size-10 animate-pulse rounded-xl bg-muted sm:size-11" />
    <div className="space-y-2">
      <div className="h-4 w-28 animate-pulse rounded bg-muted" />
      <div className="h-5 w-20 animate-pulse rounded bg-muted" />
    </div>
  </div>
);

interface WalletListProps {
  wallets?: ApiWallet[];
  isLoading?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onSetDefault?: (id: string) => void;
}

const WalletList = ({ wallets = [], isLoading = false, onEdit, onDelete, onSetDefault }: WalletListProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground font-manrope sm:text-xl">
          My Wallets
        </h3>
        <p className="text-sm text-muted-foreground">
          {wallets.length} wallets
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {wallets.map((wallet) => (
            <WalletCard
              key={wallet.id}
              wallet={wallet}
              onEdit={onEdit}
              onDelete={onDelete}
              onSetDefault={onSetDefault}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WalletList;
