/* eslint-disable camelcase */
import api from '../client';
import type { TransactionItem } from '@/types/history';

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

interface WalletsResponse {
  success: boolean;
  message: string;
  data: WalletsApiData;
}

interface WalletResponse {
  success: boolean;
  message: string;
  data: ApiWallet;
}

export const walletsApi = {
  async getAll(): Promise<WalletsApiData> {
    const { data } = await api.get<WalletsResponse>('/wallets');
    const raw = data.data;
    return {
      wallets: Array.isArray(raw?.wallets) ? raw.wallets : [],
      recent_activity: Array.isArray(raw?.recent_activity) ? raw.recent_activity : [],
    };
  },

  async getById(id: string): Promise<ApiWallet> {
    const { data } = await api.get<WalletResponse>(`/wallets/${id}`);
    return data.data;
  },

  async create(payload: CreateWalletPayload): Promise<ApiWallet> {
    const { data } = await api.post<WalletResponse>('/wallets', payload);
    return data.data;
  },

  async update(id: string, payload: UpdateWalletPayload): Promise<ApiWallet> {
    const { data } = await api.put<WalletResponse>(`/wallets/${id}`, payload);
    return data.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/wallets/${id}`);
  },

  async transfer(payload: TransferWalletPayload): Promise<void> {
    await api.post('/wallets/transfer', payload);
  },
};
