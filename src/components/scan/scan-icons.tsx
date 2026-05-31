
import React from 'react';
import {
  Banknote,
  CreditCard,
  Building2,
  Smartphone,
  Wallet,
} from 'lucide-react';
import { getIconByName, hexTint } from '@/lib/category-icons';
import type { ApiCategory, ApiWallet } from '@/types';

// Wallet type → icon
const WALLET_ICON_MAP: Record<string, React.ElementType> = {
  cash: Banknote,
  debit: CreditCard,
  credit: CreditCard,
  bank: Building2,
  ewallet: Smartphone,
  'e-wallet': Smartphone,
  gopay: Smartphone,
  ovo: Smartphone,
  dana: Smartphone,
  shopeepay: Smartphone,
  savings: Wallet,
  investment: Building2,
};

export function getWalletIcon(type: string): React.ElementType {
  const key = type?.toLowerCase().replace(/_/g, '');
  return WALLET_ICON_MAP[key] ?? Wallet;
}

export function renderCategoryIcon(cat: ApiCategory): React.ReactNode {
  const icon = getIconByName(cat.icon);
  return (
    <span
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md"
      style={{ background: hexTint(cat.color, 0.15) }}
    >
      {React.createElement(icon, {
        className: 'h-3.5 w-3.5',
        style: { color: cat.color },
      })}
    </span>
  );
}

export function renderWalletIcon(wallet: ApiWallet): React.ReactNode {
  const icon = getWalletIcon(wallet.type);
  const color = wallet.color ?? '#6366f1';
  return (
    <span
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md"
      style={{ background: hexTint(color, 0.15) }}
    >
      {React.createElement(icon, {
        className: 'h-3.5 w-3.5',
        style: { color },
      })}
    </span>
  );
}
