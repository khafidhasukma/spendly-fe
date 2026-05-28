import api from '../client';

export interface ApiWallet {
  id: string;
  name: string;
  type: string;
  balance: string;
}

interface WalletsResponse {
  success: boolean;
  message: string;
  data: ApiWallet[];
}

export const walletsApi = {
  async getAll(): Promise<ApiWallet[]> {
    const { data } = await api.get<WalletsResponse>('/wallets');
    return data.data;
  },
};
