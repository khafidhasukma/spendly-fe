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

const SkeletonRow = () => (
  <div className="flex items-center gap-3 border-b border-border p-4">
    <div className="h-9 w-9 animate-pulse rounded-full bg-muted" />
    <div className="flex-1 space-y-2">
      <div className="h-4 w-40 animate-pulse rounded bg-muted" />
      <div className="h-3 w-24 animate-pulse rounded bg-muted" />
    </div>
    <div className="h-4 w-20 animate-pulse rounded bg-muted" />
    <div className="h-4 w-24 animate-pulse rounded bg-muted" />
  </div>
);

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
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          {Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)}
        </div>
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
