import { groupHistoryByRelativeDay } from '.';
import { HistoryTableDesktop, HistoryTableMobile, HistoryTableEmpty } from '.';
import type { TransactionItem } from '@/types';

type Props = {
  transactions: TransactionItem[];
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

const HistoryTable = ({ transactions, onView, onEdit, onDelete }: Props) => {
  if (transactions.length === 0) {
    return <HistoryTableEmpty />;
  }

  const mobileGroups = groupHistoryByRelativeDay(transactions);

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <HistoryTableDesktop transactions={transactions} onView={onView} onEdit={onEdit} onDelete={onDelete} />
      <HistoryTableMobile groups={mobileGroups} onView={onView} onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
};

export default HistoryTable;
