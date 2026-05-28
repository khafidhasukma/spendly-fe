/* eslint-disable camelcase */
import api from '../client';

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
}

export interface WalletBalance {
  total_balance: string;
  wallet_count: number;
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

interface WalletsResponse {
  success: boolean;
  message: string;
  data: ApiWallet[];
}

interface WalletResponse {
  success: boolean;
  message: string;
  data: ApiWallet;
}

interface BalanceResponse {
  success: boolean;
  message: string;
  data: WalletBalance;
}

export const walletsApi = {
  async getAll(): Promise<ApiWallet[]> {
    const { data } = await api.get<WalletsResponse>('/wallets');
    return data.data;
  },

  async getBalance(): Promise<WalletBalance> {
    const { data } = await api.get<BalanceResponse>('/wallets/balance');
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
};
