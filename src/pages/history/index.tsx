import { useEffect, useState } from 'react';
import { HistoryHeader } from '@/components/history';
import {
  HistoryDeleteDialog,
  HistoryViewDialog,
  HistoryFormDialog,
  HistoryFiltersPanel,
  HistoryTransactionsPanel,
  useHistoryList,
} from '@/features/history';
import { usePageTitle } from '@/hooks';
import { categoriesApi } from '@/api';
import type { ApiCategory } from '@/api/endpoints/categories';

const HistoryPage = () => {
  usePageTitle('Transaction History');

  const [categoryOptions, setCategoryOptions] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    let cancelled = false;
    categoriesApi.getAll()
      .then((cats: ApiCategory[]) => {
        if (!cancelled) setCategoryOptions(cats.map((c) => ({ id: c.id, name: c.name })));
      })
      .catch(() => { /* noop */ });
    return () => { cancelled = true; };
  }, []);

  const {
    transactions,
    isLoading,
    pageSize,
    filters,
    onFilterChange,
    currentPage,
    setCurrentPage,
    totalPages,
    totalItems,
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
  } = useHistoryList();

  return (
    <div className="space-y-6">
      <HistoryHeader onAdd={requestAdd} onExport={exportCsv} isExporting={isExporting} />

      <HistoryFiltersPanel
        value={filters}
        onChange={onFilterChange}
        categoryOptions={categoryOptions}
      />

      <HistoryTransactionsPanel
        transactions={transactions}
        isLoading={isLoading}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onView={requestView}
        onEdit={requestEdit}
        onDelete={requestDelete}
      />

      <HistoryViewDialog
        open={viewOpen}
        onOpenChange={onViewDialogOpenChange}
        transaction={viewTarget}
      />

      <HistoryFormDialog
        open={formOpen}
        onOpenChange={onFormDialogOpenChange}
        mode={formMode}
        editTarget={editTarget}
        onSuccess={refetch}
      />

      <HistoryDeleteDialog
        open={deleteOpen}
        onOpenChange={onDeleteDialogOpenChange}
        target={deleteTarget}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default HistoryPage;
