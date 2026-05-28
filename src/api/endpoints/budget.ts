import api from '../client';
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

export const budgetApi = {
  async getAll(): Promise<BudgetItem[]> {
    const { data } = await api.get<BudgetListResponse>('/budgets');
    return data.data;
  },

  async getSummary(): Promise<BudgetSummary> {
    const { data } = await api.get<BudgetSummaryResponse>('/budgets/summary');
    return data.data;
  },

  async create(payload: BudgetPayload): Promise<BudgetItem> {
    const { data } = await api.post<BudgetMutationResponse>('/budgets', payload);
    return data.data;
  },

  async update(id: string, payload: BudgetUpdatePayload): Promise<BudgetItem> {
    const { data } = await api.put<BudgetMutationResponse>(`/budgets/${id}`, payload);
    return data.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete<BudgetDeleteResponse>(`/budgets/${id}`);
  },
};
