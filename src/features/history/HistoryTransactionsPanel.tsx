import { HistoryPagination, HistoryTable } from '@/components/history';
import type { HistoryTransactionsPanelProps } from '@/types';

const HistoryTransactionsPanel = ({
  transactions,
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onEdit,
  onDelete,
}: HistoryTransactionsPanelProps) => {
  return (
    <div className="space-y-4">
      <HistoryTable transactions={transactions} onEdit={onEdit} onDelete={onDelete} />
      <HistoryPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default HistoryTransactionsPanel;