import api from '../client';
import type { DashboardApiData, DashboardApiResponse } from '@/types/dashboard';

export const dashboardApi = {
  async getDashboard(): Promise<DashboardApiData> {
    const { data } = await api.get<DashboardApiResponse>('/analysis/dashboard');
    return data.data;
  },
};
