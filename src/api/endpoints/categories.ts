import api from '../client';
import { dedupe, invalidate } from '../cache';
import type {
  ApiCategory,
  CreateCategoryPayload,
  UpdateCategoryPayload,
  CategoriesResponse,
  CategoryResponse,
  CategoryType,
} from '@/types/categories';

const KEY = 'categories';

export const categoriesApi = {
  async getAll(type?: CategoryType): Promise<ApiCategory[]> {
    const cacheKey = `${KEY}:list:${type ?? 'all'}`;
    return dedupe(cacheKey, async () => {
      const params = type ? { type } : undefined;
      const { data } = await api.get<CategoriesResponse>('/categories', { params });
      return Array.isArray(data.data) ? data.data : [];
    });
  },

  async getById(id: string): Promise<ApiCategory> {
    return dedupe(`${KEY}:item:${id}`, async () => {
      const { data } = await api.get<CategoryResponse>(`/categories/${id}`);
      return data.data;
    });
  },

  async create(payload: CreateCategoryPayload): Promise<ApiCategory> {
    const { data } = await api.post<CategoryResponse>('/categories', payload);
    invalidate(KEY);
    return data.data;
  },

  async update(id: string, payload: UpdateCategoryPayload): Promise<ApiCategory> {
    const { data } = await api.put<CategoryResponse>(`/categories/${id}`, payload);
    invalidate(KEY);
    return data.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/categories/${id}`);
    invalidate(KEY);
  },
};
