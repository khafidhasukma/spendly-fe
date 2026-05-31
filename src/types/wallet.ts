import type { LucideIcon } from 'lucide-react';
import type { TransactionItem } from './history';

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

export interface ApiWallet {
  id: string;
  user_id: string;
  name: string;
  type: string;
  account_number: string | null;
  bank_name: string | null;
  balance: string;
  is_default: boolean;
  color: string;
  created_at: string;
  updated_at: string;
  transaction_count: number;
  total_income: string;
  total_expense: string;
  recent_activity?: TransactionItem[];
}

export interface WalletsApiData {
  wallets: ApiWallet[];
  recent_activity: TransactionItem[];
}

export interface CreateWalletPayload {
  name: string;
  type: string;
  account_number?: string;
  bank_name?: string;
  balance: number;
  color?: string;
}

export interface UpdateWalletPayload {
  name?: string;
  type?: string;
  account_number?: string;
  bank_name?: string;
  balance?: number;
  color?: string;
  is_default?: boolean;
}

export interface TransferWalletPayload {
  from_wallet_id: string;
  to_wallet_id: string;
  amount: number;
  date: string;
  notes?: string;
}

export interface WalletsResponse {
  success: boolean;
  message: string;
  data: WalletsApiData;
}

export interface WalletResponse {
  success: boolean;
  message: string;
  data: ApiWallet;
}
