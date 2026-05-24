import type { LucideIcon } from 'lucide-react';

export interface Wallet {
  id: string;
  name: string;
  balance: number;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  isDefault?: boolean;
}

export interface WalletTransaction {
  id: string;
  type: 'income' | 'expense' | 'transfer';
  amount: number;
  description: string;
  date: string;
  walletId: string;
}

export interface AddWalletFormData {
  name: string;
  balance: number;
  type: string;
}

export interface TransferFormData {
  fromWalletId: string;
  toWalletId: string;
  amount: number;
}
