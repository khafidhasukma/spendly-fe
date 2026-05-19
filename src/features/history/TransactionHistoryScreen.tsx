import { HistoryHeader } from '@/components/history';
import {
  HistoryDeleteDialog,
  HistoryFiltersPanel,
  HistoryTransactionsPanel,
  useHistoryList
} from ".";

const TransactionHistoryScreen = () => {
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
    deleteOpen,
    deleteTarget,
    onDeleteDialogOpenChange,
    requestEdit,
    requestDelete,
    confirmDelete,
  } = useHistoryList();

  return (
    <div className="space-y-6">
      <HistoryHeader />
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
        onEdit={requestEdit}
        onDelete={requestDelete}
      />
      <HistoryDeleteDialog
        open={deleteOpen}
        onOpenChange={onDeleteDialogOpenChange}
        target={deleteTarget}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default TransactionHistoryScreen;