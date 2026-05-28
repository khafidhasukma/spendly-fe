import {
  Wallet,
  CreditCard,
  Landmark,
  PiggyBank,
  Banknote,
} from 'lucide-react';
import type { Wallet as WalletType } from '@/types/wallet';
import WalletCard from './WalletCard';

const mockWallets: WalletType[] = [
  {
    id: '1',
    name: 'Cash',
    balance: 2_500_000,
    icon: Banknote,
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    isDefault: true,
  },
  {
    id: '2',
    name: 'BCA',
    balance: 5_750_000,
    icon: Landmark,
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    id: '3',
    name: 'Mandiri',
    balance: 3_200_000,
    icon: Landmark,
    iconBg: 'bg-yellow-100 dark:bg-yellow-900/30',
    iconColor: 'text-yellow-600 dark:text-yellow-400',
  },
  {
    id: '4',
    name: 'GoPay',
    balance: 850_000,
    icon: Wallet,
    iconBg: 'bg-cyan-100 dark:bg-cyan-900/30',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
  },
  {
    id: '5',
    name: 'Credit Card',
    balance: 0,
    icon: CreditCard,
    iconBg: 'bg-red-100 dark:bg-red-900/30',
    iconColor: 'text-red-600 dark:text-red-400',
  },
  {
    id: '6',
    name: 'Savings',
    balance: 2_000_000,
    icon: PiggyBank,
    iconBg: 'bg-purple-100 dark:bg-purple-900/30',
    iconColor: 'text-purple-600 dark:text-purple-400',
  },
];

interface WalletListProps {
  wallets?: WalletType[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onSetDefault?: (id: string) => void;
}

const WalletList = ({
  wallets = mockWallets,
  onEdit,
  onDelete,
  onSetDefault,
}: WalletListProps) => {
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
    </div>
  );
};

export default WalletList;
