import { HistoryHeader } from '@/components/history';
import {
  HistoryDeleteDialog,
  HistoryViewDialog,
  HistoryFormDialog,
  HistoryFiltersPanel,
  HistoryTransactionsPanel,
  useHistoryList
} from '@/features/history';

import { usePageTitle } from '@/hooks';

const HistoryPage = () => {
  usePageTitle('Transaction History');
  const {
    pageSize,
    filters,
    onFilterChange,
    categoryFilterOptions,
    paginated,
    filteredCount,
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
  } = useHistoryList();

  return (
    <div className="space-y-6">
      <HistoryHeader onAddExpense={requestAdd} />
      <HistoryFiltersPanel
        value={filters}
        onChange={onFilterChange}
        categoryOptions={categoryFilterOptions}
      />
      <HistoryTransactionsPanel
        transactions={paginated}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredCount}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onView={requestView}
        onEdit={requestEdit}
        onDelete={requestDelete}
      />

      {/* View Detail Dialog */}
      <HistoryViewDialog
        open={viewOpen}
        onOpenChange={onViewDialogOpenChange}
        transaction={viewTarget}
      />

      {/* Add/Edit Form Dialog */}
      <HistoryFormDialog
        open={formOpen}
        onOpenChange={onFormDialogOpenChange}
        mode={formMode}
        transaction={editTarget}
        onSave={handleFormSave}
      />

      {/* Delete Confirmation Dialog */}
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
