import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import type { HistoryFiltersValue, HistoryTransaction, UseHistoryListOptions } from '@/types';
import { MOCK_HISTORY_TRANSACTIONS } from '.';

const useHistoryList = (options: UseHistoryListOptions = {}) => {
  const pageSize = options.pageSize ?? 10;
  const [transactions, setTransactions] = useState<HistoryTransaction[]>(
    () => options.initialTransactions ?? MOCK_HISTORY_TRANSACTIONS,
  );
  const [filters, setFilters] = useState<HistoryFiltersValue>({
    dateRange: 'last-30',
    category: 'all',
    amountMin: '',
    amountMax: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const categoryFilterOptions = useMemo(() => {
    const byId = new Map<string, string>();
    for (const tx of transactions) {
      byId.set(tx.category.id, tx.category.name);
    }
    return Array.from(byId.entries())
      .map(([id, name]) => ({ id, name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [transactions]);

  const filtered = useMemo(() => {
    const list = transactions.filter((tx) => {
      if (filters.category !== 'all' && tx.category.id !== filters.category) return false;
      if (filters.amountMin && Math.abs(tx.amount) < Number(filters.amountMin)) return false;
      if (filters.amountMax && Math.abs(tx.amount) > Number(filters.amountMax)) return false;
      return true;
    });
    list.sort((a, b) => b.date.localeCompare(a.date));
    return list;
  }, [transactions, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const deleteTarget = useMemo(
    () => (deleteTargetId ? transactions.find((t) => t.id === deleteTargetId) : undefined),
    [transactions, deleteTargetId],
  );

  const handleFilterChange = useCallback((value: HistoryFiltersValue) => {
    setFilters(value);
    setCurrentPage(1);
  }, []);

  const requestDelete = useCallback((id: string) => {
    setDeleteTargetId(id);
    setDeleteOpen(true);
  }, []);

  const requestEdit = useCallback((_id: string) => {
    toast.info('Fitur edit menyusul.');
  }, []);

  const confirmDelete = useCallback(() => {
    if (!deleteTargetId) return;
    setTransactions((prev) => prev.filter((t) => t.id !== deleteTargetId));
    setDeleteTargetId(null);
  }, [deleteTargetId]);

  const onDeleteDialogOpenChange = useCallback((open: boolean) => {
    setDeleteOpen(open);
    if (!open) setDeleteTargetId(null);
  }, []);

  return {
    pageSize,
    filters,
    onFilterChange: handleFilterChange,
    categoryFilterOptions,
    paginated,
    filteredCount: filtered.length,
    totalPages,
    currentPage,
    setCurrentPage,
    deleteOpen,
    deleteTarget,
    onDeleteDialogOpenChange,
    requestEdit,
    requestDelete,
    confirmDelete,
  };
};

export default useHistoryList;