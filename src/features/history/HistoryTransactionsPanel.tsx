import { HistoryPagination, HistoryTable, HistoryTableSkeleton } from '@/components/history';
import type { HistoryTransactionsPanelProps } from '@/types';
import type { TransactionItem } from '@/types';

interface Props extends Omit<HistoryTransactionsPanelProps, 'transactions'> {
  transactions: TransactionItem[];
}

const HistoryTransactionsPanel = ({
  transactions,
  isLoading,
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onView,
  onEdit,
  onDelete,
}: Props) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <HistoryTableSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <HistoryTable transactions={transactions} onView={onView} onEdit={onEdit} onDelete={onDelete} />
      {transactions.length > 0 && (
        <HistoryPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default HistoryTransactionsPanel;
