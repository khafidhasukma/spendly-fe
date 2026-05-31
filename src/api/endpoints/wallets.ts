/* eslint-disable camelcase */
import api from '../client';
import { dedupe, invalidate } from '../cache';
import type {
  ApiWallet,
  WalletsApiData,
  CreateWalletPayload,
  UpdateWalletPayload,
  TransferWalletPayload,
  WalletsResponse,
  WalletResponse,
} from '@/types/wallet';

const KEY = 'wallets';

export const walletsApi = {
  async getAll(): Promise<WalletsApiData> {
    return dedupe(`${KEY}:list`, async () => {
      const { data } = await api.get<WalletsResponse>('/wallets');
      const raw = data.data;
      return {
        wallets: Array.isArray(raw?.wallets) ? raw.wallets : [],
        recent_activity: Array.isArray(raw?.recent_activity) ? raw.recent_activity : [],
      };
    });
  },

  async getById(id: string): Promise<ApiWallet> {
    return dedupe(`${KEY}:item:${id}`, async () => {
      const { data } = await api.get<WalletResponse>(`/wallets/${id}`);
      return data.data;
    });
  },

  async create(payload: CreateWalletPayload): Promise<ApiWallet> {
    const { data } = await api.post<WalletResponse>('/wallets', payload);
    invalidate(KEY);
    invalidate('dashboard');
    return data.data;
  },

  async update(id: string, payload: UpdateWalletPayload): Promise<ApiWallet> {
    const { data } = await api.put<WalletResponse>(`/wallets/${id}`, payload);
    invalidate(KEY);
    invalidate('dashboard');
    return data.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/wallets/${id}`);
    invalidate(KEY);
    invalidate('dashboard');
  },

  async transfer(payload: TransferWalletPayload): Promise<void> {
    await api.post('/wallets/transfer', payload);
    invalidate(KEY);
    invalidate('transactions');
    invalidate('dashboard');
  },
};
