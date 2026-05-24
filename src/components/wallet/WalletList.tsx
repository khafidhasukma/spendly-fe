import {
  Wallet,
  CreditCard,
  Landmark,
  PiggyBank,
  Banknote,
  MoreHorizontal,
  Pencil,
  Trash2,
  Star,
} from 'lucide-react';
import type { Wallet as WalletType } from '@/types/wallet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const formatRupiah = (amount: number) => new Intl.NumberFormat('id-ID').format(amount);

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

const WalletCard = ({
  wallet,
  onEdit,
  onDelete,
  onSetDefault,
}: {
  wallet: WalletType;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onSetDefault?: (id: string) => void;
}) => {
  const { id, name, balance, icon: Icon, iconBg, iconColor, isDefault } = wallet;

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5">
      <div className="flex items-center gap-3">
        <div className={`flex size-10 items-center justify-center rounded-xl ${iconBg} sm:size-11`}>
          <Icon className={`size-5 ${iconColor}`} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-foreground">{name}</p>
            {isDefault && (
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                Default
              </Badge>
            )}
          </div>
          <p className="text-base font-bold text-foreground sm:text-lg">
            Rp{formatRupiah(balance)}
          </p>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-xs">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {!isDefault && (
            <DropdownMenuItem onClick={() => onSetDefault?.(id)}>
              <Star className="size-4" />
              Set as Default
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => onEdit?.(id)}>
            <Pencil className="size-4" />
            Edit Wallet
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-600 focus:text-red-600"
            onClick={() => onDelete?.(id)}
          >
            <Trash2 className="size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

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
