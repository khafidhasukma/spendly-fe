import { HistoryPagination, HistoryTable, type HistoryTransaction } from '@/components/history';

type HistoryTransactionsPanelProps = {
  transactions: HistoryTransaction[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

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