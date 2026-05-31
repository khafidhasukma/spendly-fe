import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { transactionsApi, categoriesApi } from '@/api';
import { moment } from '@/utils';
import type { TransactionItem, TransactionPagination, HistoryFiltersValue, ApiCategory } from '@/types';

const PAGE_SIZE = 10;
const DEBOUNCE_MS = 500;

const dateRangeToParams = (range: string): { ['date_from']?: string; ['date_to']?: string } => {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  const fmt = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const today = fmt(now);

  switch (range) {
  case 'last-7': { const f = new Date(now); f.setDate(f.getDate() - 7); return { ['date_from']: fmt(f), ['date_to']: today }; }
  case 'last-30': { const f = new Date(now); f.setDate(f.getDate() - 30); return { ['date_from']: fmt(f), ['date_to']: today }; }
  case 'last-90': { const f = new Date(now); f.setDate(f.getDate() - 90); return { ['date_from']: fmt(f), ['date_to']: today }; }
  case 'this-month': return { ['date_from']: fmt(new Date(now.getFullYear(), now.getMonth(), 1)), ['date_to']: today };
  case 'last-month': {
    const first = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const last = new Date(now.getFullYear(), now.getMonth(), 0);
    return { ['date_from']: fmt(first), ['date_to']: fmt(last) };
  }
  case 'this-year': return { ['date_from']: fmt(new Date(now.getFullYear(), 0, 1)), ['date_to']: today };
  default: return {};
  }
};

const useHistoryList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialFilters: HistoryFiltersValue = {
    dateRange: searchParams.get('dateRange') || 'last-30',
    category: searchParams.get('category') || 'all',
    amountMin: searchParams.get('amountMin') || '',
    amountMax: searchParams.get('amountMax') || '',
  };
  const initialPage = Number(searchParams.get('page')) || 1;

  const [transactions, setTransactions] = useState<TransactionItem[]>([]);
  const [pagination, setPagination] = useState<TransactionPagination>({
    total: 0, page: 1, limit: PAGE_SIZE, totalPages: 1, hasNext: false, hasPrev: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<HistoryFiltersValue>(initialFilters);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [categoryOptions, setCategoryOptions] = useState<ApiCategory[]>([]);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<TransactionItem | undefined>();
  const [viewOpen, setViewOpen] = useState(false);
  const [viewTarget, setViewTarget] = useState<TransactionItem | undefined>();
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [editTarget, setEditTarget] = useState<TransactionItem | undefined>();
  const [isExporting, setIsExporting] = useState(false);

  // Sync state -> URL
  useEffect(() => {
    const params: Record<string, string> = {};
    if (currentPage > 1) params.page = String(currentPage);
    if (filters.dateRange !== 'last-30') params.dateRange = filters.dateRange;
    if (filters.category !== 'all') params.category = filters.category;
    if (filters.amountMin) params.amountMin = filters.amountMin;
    if (filters.amountMax) params.amountMax = filters.amountMax;
    setSearchParams(params, { replace: true });
  }, [filters, currentPage, setSearchParams]);

  // Load categories once
  useEffect(() => {
    let cancelled = false;
    categoriesApi.getAll()
      .then((cats) => { if (!cancelled) setCategoryOptions(cats); })
      .catch(() => { /* noop */ });
    return () => { cancelled = true; };
  }, []);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const fetchTransactions = useCallback(async (page: number, f: HistoryFiltersValue) => {
    setIsLoading(true);
    try {
      const dateParams = dateRangeToParams(f.dateRange);
      const result = await transactionsApi.getAll({
        page,
        limit: PAGE_SIZE,
        sort: 'date',
        order: 'DESC',
        ['category_id']: f.category !== 'all' ? f.category : undefined,
        ['amount_min']: f.amountMin ? Number(f.amountMin) : undefined,
        ['amount_max']: f.amountMax ? Number(f.amountMax) : undefined,
        ...dateParams,
      });
      setTransactions(result.data);
      setPagination(result.pagination);
    } catch {
      toast.error('Failed to load transactions');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchTransactions(currentPage, filters);
    }, DEBOUNCE_MS);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [currentPage, filters, fetchTransactions]);

  const onFilterChange = useCallback((value: HistoryFiltersValue) => {
    setFilters(value);
    setCurrentPage(1);
  }, []);

  const refetch = useCallback(() => {
    fetchTransactions(currentPage, filters);
  }, [fetchTransactions, currentPage, filters]);

  const requestView = useCallback((id: string) => {
    setViewTarget(transactions.find((t) => t.id === id));
    setViewOpen(true);
  }, [transactions]);

  const onViewDialogOpenChange = useCallback((open: boolean) => {
    setViewOpen(open);
    if (!open) setViewTarget(undefined);
  }, []);

  const requestAdd = useCallback(() => {
    setFormMode('add');
    setEditTarget(undefined);
    setFormOpen(true);
  }, []);

  const requestEdit = useCallback((id: string) => {
    setFormMode('edit');
    setEditTarget(transactions.find((t) => t.id === id));
    setFormOpen(true);
  }, [transactions]);

  const onFormDialogOpenChange = useCallback((open: boolean) => {
    setFormOpen(open);
    if (!open) setEditTarget(undefined);
  }, []);

  const requestDelete = useCallback((id: string) => {
    setDeleteTarget(transactions.find((t) => t.id === id));
    setDeleteOpen(true);
  }, [transactions]);

  const confirmDelete = useCallback(async () => {
    if (!deleteTarget) return;
    try {
      await transactionsApi.delete(deleteTarget.id);
      toast.success('Transaction deleted');
      setDeleteOpen(false);
      setDeleteTarget(undefined);
      refetch();
    } catch {
      toast.error('Failed to delete transaction');
    }
  }, [deleteTarget, refetch]);

  const onDeleteDialogOpenChange = useCallback((open: boolean) => {
    setDeleteOpen(open);
    if (!open) setDeleteTarget(undefined);
  }, []);

  const exportCsv = useCallback(async () => {
    setIsExporting(true);
    try {
      const dateParams = dateRangeToParams(filters.dateRange);
      const blob = await transactionsApi.exportCsv({
        ['category_id']: filters.category !== 'all' ? filters.category : undefined,
        ['amount_min']: filters.amountMin ? Number(filters.amountMin) : undefined,
        ['amount_max']: filters.amountMax ? Number(filters.amountMax) : undefined,
        ...dateParams,
      });

      // Prepend "sep=," directive so Excel detects delimiter regardless of locale.
      const rawText = await blob.text();
      const withDirective = `sep=,\r\n${rawText}`;
      const fixedBlob = new Blob([`\uFEFF${withDirective}`], { type: 'text/csv;charset=utf-8;' });

      const url = URL.createObjectURL(fixedBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `transactions-${moment().format('YYYY-MM-DD')}.csv`;
      a.click();
      URL.revokeObjectURL(url);

      toast.success('Transactions exported');
    } catch {
      toast.error('Failed to export transactions');
    } finally {
      setIsExporting(false);
    }
  }, [filters]);

  return {
    transactions,
    isLoading,
    pageSize: PAGE_SIZE,
    filters,
    onFilterChange,
    currentPage,
    setCurrentPage,
    totalPages: pagination.totalPages,
    totalItems: pagination.total,
    categoryOptions: categoryOptions.map((c) => ({ id: c.id, name: c.name })),
    viewOpen,
    viewTarget,
    onViewDialogOpenChange,
    requestView,
    formOpen,
    formMode,
    editTarget,
    onFormDialogOpenChange,
    requestAdd,
    requestEdit,
    refetch,
    deleteOpen,
    deleteTarget,
    onDeleteDialogOpenChange,
    requestDelete,
    confirmDelete,
    exportCsv,
    isExporting,
  };
};

export default useHistoryList;
