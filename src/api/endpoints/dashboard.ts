import api from '../client';
import { dedupe } from '../cache';
import type { DashboardApiData, DashboardApiResponse } from '@/types/dashboard';

export const dashboardApi = {
  async getDashboard(): Promise<DashboardApiData> {
    return dedupe('dashboard:summary', async () => {
      const { data } = await api.get<DashboardApiResponse>('/dashboard/summary');
      return data.data;
    });
  },
};
