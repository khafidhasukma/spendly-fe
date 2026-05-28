import api from '../client';

export interface ApiCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: string;
}

interface CategoriesResponse {
  success: boolean;
  message: string;
  data: ApiCategory[];
}

export const categoriesApi = {
  /** Get all categories, optionally filtered by type */
  async getAll(type?: 'expense' | 'income' | 'both'): Promise<ApiCategory[]> {
    const params = type ? { type } : undefined;
    const { data } = await api.get<CategoriesResponse>('/categories', { params });
    return data.data;
  },
};
