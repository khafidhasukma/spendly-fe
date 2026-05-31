/* eslint-disable camelcase */
import api from '../client';
import { dedupe, invalidate } from '../cache';
import type {
  TransactionItem,
  TransactionFilters,
  TransactionPagination,
  CreateTransactionPayload,
  UpdateTransactionPayload,
  TransactionsResponse,
  TransactionMutationResponse,
} from '@/types/history';

const KEY = 'transactions';

const filterCacheKey = (filters: TransactionFilters): string => {
  return `${KEY}:list:${JSON.stringify(filters)}`;
};

export const transactionsApi = {
  async getAll(filters: TransactionFilters = {}): Promise<{ data: TransactionItem[]; pagination: TransactionPagination }> {
    return dedupe(filterCacheKey(filters), async () => {
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
      return {
        data: Array.isArray(data.data) ? data.data : [],
        pagination: data.pagination ?? { total: 0, page: 1, limit: 10, totalPages: 1, hasNext: false, hasPrev: false },
      };
    }, 30_000);
  },

  async create(payload: CreateTransactionPayload): Promise<TransactionItem> {
    const { data } = await api.post<TransactionMutationResponse>('/transactions', payload);
    invalidate(KEY);
    invalidate('dashboard');
    invalidate('budgets');
    invalidate('wallets');
    return data.data;
  },

  async update(id: string, payload: UpdateTransactionPayload): Promise<TransactionItem> {
    const { data } = await api.put<TransactionMutationResponse>(`/transactions/${id}`, payload);
    invalidate(KEY);
    invalidate('dashboard');
    invalidate('budgets');
    invalidate('wallets');
    return data.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/transactions/${id}`);
    invalidate(KEY);
    invalidate('dashboard');
    invalidate('budgets');
    invalidate('wallets');
  },

  async exportCsv(filters: TransactionFilters = {}): Promise<Blob> {
    const params: Record<string, string | number> = {};
    if (filters.type) params.type = filters.type;
    if (filters.date_from) params.date_from = filters.date_from;
    if (filters.date_to) params.date_to = filters.date_to;
    if (filters.category_id) params.category_id = filters.category_id;
    if (filters.search) params.search = filters.search;
    if (filters.amount_min != null) params.amount_min = filters.amount_min;
    if (filters.amount_max != null) params.amount_max = filters.amount_max;

    const { data } = await api.get<Blob>('/transactions/export-csv', {
      params,
      responseType: 'blob',
    });
    return data;
  },
};
