import { HistoryPagination, HistoryTable } from '@/components/history';
import type { TransactionItem } from '@/types';

type Props = {
  transactions: TransactionItem[];
  isLoading?: boolean;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onView?: (id: string) => void;
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
  onView,
  onEdit,
  onDelete,
}: Props) => {
  return (
    <div className="space-y-4">
      <HistoryTable transactions={transactions} onView={onView} onEdit={onEdit} onDelete={onDelete} />
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
