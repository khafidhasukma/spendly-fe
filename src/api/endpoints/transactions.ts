import api from '../client';
import type { TransactionItem, TransactionFilters, TransactionPagination } from '@/types/history';

interface TransactionsResponse {
  success: boolean;
  message: string;
  data: TransactionItem[];
  pagination: TransactionPagination;
}

interface MutationResponse {
  success: boolean;
  message: string;
  data: TransactionItem;
}

export interface CreateTransactionPayload {
  type: 'expense' | 'income';
  amount: number;
  merchant_name: string;
  category_id: string;
  wallet_id: string;
  date: string;
  notes?: string;
}

export interface UpdateTransactionPayload {
  type?: 'expense' | 'income';
  amount?: number;
  merchant_name?: string;
  category_id?: string;
  wallet_id?: string;
  date?: string;
  notes?: string;
}

export const transactionsApi = {
  async getAll(filters: TransactionFilters = {}): Promise<{ data: TransactionItem[]; pagination: TransactionPagination }> {
    const params: Record<string, string | number> = {};
    if (filters.page) params.page = filters.page;
    if (filters.limit) params.limit = filters.limit;
    if (filters.type) params.type = filters.type;
    if (filters.sort) params.sort = filters.sort;
    if (filters.order) params.order = filters.order;
    if (filters.date_from) params.date_from = filters.date_from;
    if (filters.date_to) params.date_to = filters.date_to;
    if (filters.category_id) params.category_id = filters.category_id;
    if (filters.search) params.search = filters.search;
    if (filters.amount_min != null) params.amount_min = filters.amount_min;
    if (filters.amount_max != null) params.amount_max = filters.amount_max;

    const { data } = await api.get<TransactionsResponse>('/transactions', { params });
    return { data: data.data, pagination: data.pagination };
  },

  async create(payload: CreateTransactionPayload): Promise<TransactionItem> {
    const { data } = await api.post<MutationResponse>('/transactions', payload);
    return data.data;
  },

  async update(id: string, payload: UpdateTransactionPayload): Promise<TransactionItem> {
    const { data } = await api.put<MutationResponse>(`/transactions/${id}`, payload);
    return data.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/transactions/${id}`);
  },
};
