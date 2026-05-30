import api from '../client';

export interface ApiCategory {
  id: string;
  name: string;
  icon: string;        // PascalCase Lucide icon name e.g. "UtensilsCrossed"
  color: string;       // hex e.g. "#EF4444"
  type: 'expense' | 'income' | 'both';
  is_system: boolean;
  ai_label: string | null;
  created_at: string;
  transaction_count: number;
  total_amount: string;
}

export interface CreateCategoryPayload {
  name: string;
  icon: string;
  color: string;
  type: 'expense' | 'income' | 'both';
}

export interface UpdateCategoryPayload {
  name?: string;
  icon?: string;
  color?: string;
}

interface CategoriesResponse {
  success: boolean;
  message: string;
  data: ApiCategory[];
}

interface CategoryResponse {
  success: boolean;
  message: string;
  data: ApiCategory;
}

export const categoriesApi = {
  async getAll(type?: 'expense' | 'income' | 'both'): Promise<ApiCategory[]> {
    const params = type ? { type } : undefined;
    const { data } = await api.get<CategoriesResponse>('/categories', { params });
    return Array.isArray(data.data) ? data.data : [];
  },

  async getById(id: string): Promise<ApiCategory> {
    const { data } = await api.get<CategoryResponse>(`/categories/${id}`);
    return data.data;
  },

  async create(payload: CreateCategoryPayload): Promise<ApiCategory> {
    const { data } = await api.post<CategoryResponse>('/categories', payload);
    return data.data;
  },

  async update(id: string, payload: UpdateCategoryPayload): Promise<ApiCategory> {
    const { data } = await api.put<CategoryResponse>(`/categories/${id}`, payload);
    return data.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/categories/${id}`);
  },
};
