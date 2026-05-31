/* eslint-disable camelcase */
import { MoreHorizontal, Pencil, Star, Trash2, Landmark, Banknote, Smartphone, CreditCard, PiggyBank, Wallet } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatRupiah } from '@/utils';
import type { ApiWallet } from '@/types';

const WALLET_ICON: Record<string, React.ElementType> = {
  bank: Landmark,
  cash: Banknote,
  'e-wallet': Smartphone,
  credit: CreditCard,
  savings: PiggyBank,
};

interface WalletCardProps {
  wallet: ApiWallet;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onSetDefault?: (id: string) => void;
}

const WalletCard = ({ wallet, onEdit, onDelete, onSetDefault }: WalletCardProps) => {
  const { id, name, balance, type, is_default, color } = wallet;
  const Icon = WALLET_ICON[type] ?? Wallet;
  const balanceNum = parseFloat(balance);

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5">
      <div className="flex items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-xl sm:size-11"
          style={{ backgroundColor: `${color ?? '#6366f1'}20` }}
        >
          <Icon className="size-5" style={{ color: color ?? '#6366f1' }} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-foreground">{name}</p>
            {is_default && (
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                Default
              </Badge>
            )}
          </div>
          <p className="text-base font-bold text-foreground sm:text-lg">
            {formatRupiah(balanceNum)}
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
          {!is_default && (
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

export default WalletCard;
