import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import type { HistoryFiltersValue, HistoryTransaction, HistoryTransactionFormData, UseHistoryListOptions } from '@/types';
import { MOCK_HISTORY_TRANSACTIONS } from '.';

const CATEGORIES_MAP: Record<string, string> = {
  groceries: 'Groceries',
  dining: 'F&B',
  shopping: 'Shopping',
  transport: 'Transport',
  utilities: 'Household',
  health: 'Health',
  entertainment: 'Entertainment',
  beauty: 'Beauty',
  electricity: 'Electricity',
  payroll: 'Payroll',
  others: 'Others',
};

const PAYMENT_METHODS_MAP: Record<string, string> = {
  cash: 'Cash',
  'debit-card': 'Debit Card',
  'credit-card': 'Credit Card',
  gopay: 'GoPay',
  ovo: 'OVO',
  dana: 'DANA',
  shopeepay: 'ShopeePay',
  'bank-transfer': 'Bank Transfer',
  'apple-pay': 'Apple Pay',
  'auto-debit': 'Auto-Debit',
};

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

  // Delete dialog state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // View dialog state
  const [viewOpen, setViewOpen] = useState(false);
  const [viewTargetId, setViewTargetId] = useState<string | null>(null);

  // Form dialog state (add/edit)
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [editTargetId, setEditTargetId] = useState<string | null>(null);

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

  const viewTarget = useMemo(
    () => (viewTargetId ? transactions.find((t) => t.id === viewTargetId) : undefined),
    [transactions, viewTargetId],
  );

  const editTarget = useMemo(
    () => (editTargetId ? transactions.find((t) => t.id === editTargetId) : undefined),
    [transactions, editTargetId],
  );

  const handleFilterChange = useCallback((value: HistoryFiltersValue) => {
    setFilters(value);
    setCurrentPage(1);
  }, []);

  // View
  const requestView = useCallback((id: string) => {
    setViewTargetId(id);
    setViewOpen(true);
  }, []);

  const onViewDialogOpenChange = useCallback((open: boolean) => {
    setViewOpen(open);
    if (!open) setViewTargetId(null);
  }, []);

  // Add
  const requestAdd = useCallback(() => {
    setFormMode('add');
    setEditTargetId(null);
    setFormOpen(true);
  }, []);

  // Edit
  const requestEdit = useCallback((id: string) => {
    setFormMode('edit');
    setEditTargetId(id);
    setFormOpen(true);
  }, []);

  const onFormDialogOpenChange = useCallback((open: boolean) => {
    setFormOpen(open);
    if (!open) setEditTargetId(null);
  }, []);

  const handleFormSave = useCallback((data: HistoryTransactionFormData) => {
    const categoryName = CATEGORIES_MAP[data.category] ?? data.category;
    const paymentMethodName = PAYMENT_METHODS_MAP[data.paymentMethod] ?? data.paymentMethod;

    if (formMode === 'add') {
      const newTx: HistoryTransaction = {
        id: crypto.randomUUID(),
        merchant: data.merchant,
        amount: -data.amount, // expenses are negative
        date: data.date,
        category: { id: data.category, name: categoryName },
        paymentMethod: paymentMethodName,
        notes: data.notes || undefined,
      };
      setTransactions((prev) => [newTx, ...prev]);
      toast.success('Transaction added successfully');
    } else if (formMode === 'edit' && editTargetId) {
      setTransactions((prev) =>
        prev.map((tx) =>
          tx.id === editTargetId
            ? {
                ...tx,
                merchant: data.merchant,
                amount: tx.amount >= 0 ? data.amount : -data.amount,
                date: data.date,
                category: { id: data.category, name: categoryName },
                paymentMethod: paymentMethodName,
                notes: data.notes || undefined,
              }
            : tx,
        ),
      );
      toast.success('Transaction updated successfully');
    }
  }, [formMode, editTargetId]);

  // Delete
  const requestDelete = useCallback((id: string) => {
    setDeleteTargetId(id);
    setDeleteOpen(true);
  }, []);

  const confirmDelete = useCallback(() => {
    if (!deleteTargetId) return;
    setTransactions((prev) => prev.filter((t) => t.id !== deleteTargetId));
    setDeleteTargetId(null);
    toast.success('Transaction deleted successfully');
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
    // View
    viewOpen,
    viewTarget,
    onViewDialogOpenChange,
    requestView,
    // Form (add/edit)
    formOpen,
    formMode,
    editTarget,
    onFormDialogOpenChange,
    requestAdd,
    requestEdit,
    handleFormSave,
    // Delete
    deleteOpen,
    deleteTarget,
    onDeleteDialogOpenChange,
    requestDelete,
    confirmDelete,
  };
};

export default useHistoryList;