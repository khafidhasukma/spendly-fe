import api from '../client';
import { dedupe, invalidate } from '../cache';
import type {
  BudgetItem,
  BudgetListResponse,
  BudgetPayload,
  BudgetUpdatePayload,
  BudgetMutationResponse,
  BudgetDeleteResponse,
  BudgetSummary,
  BudgetSummaryResponse,
} from '@/types/budget';

const KEY = 'budgets';

export const budgetApi = {
  async getAll(): Promise<BudgetItem[]> {
    return dedupe(`${KEY}:list`, async () => {
      const { data } = await api.get<BudgetListResponse>('/budgets');
      return data.data;
    });
  },

  async getSummary(): Promise<BudgetSummary> {
    return dedupe(`${KEY}:summary`, async () => {
      const { data } = await api.get<BudgetSummaryResponse>('/budgets/summary');
      return data.data;
    });
  },

  async create(payload: BudgetPayload): Promise<BudgetItem> {
    const { data } = await api.post<BudgetMutationResponse>('/budgets', payload);
    invalidate(KEY);
    invalidate('dashboard');
    return data.data;
  },

  async update(id: string, payload: BudgetUpdatePayload): Promise<BudgetItem> {
    const { data } = await api.put<BudgetMutationResponse>(`/budgets/${id}`, payload);
    invalidate(KEY);
    invalidate('dashboard');
    return data.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete<BudgetDeleteResponse>(`/budgets/${id}`);
    invalidate(KEY);
    invalidate('dashboard');
  },
};
