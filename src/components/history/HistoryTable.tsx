import { groupHistoryByRelativeDay } from '.';
import { HistoryTableDesktop, HistoryTableMobile, HistoryTableEmpty } from '.';
import type { HistoryTableProps } from '@/types';

export type { HistoryCategory, HistoryTransaction } from '@/types';

const HistoryTable = ({ transactions, onEdit, onDelete }: HistoryTableProps) => {
  if (transactions.length === 0) {
    return <HistoryTableEmpty />;
  }

  const mobileGroups = groupHistoryByRelativeDay(transactions);

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      {/* desktop version */}
      <HistoryTableDesktop transactions={transactions} onEdit={onEdit} onDelete={onDelete} />
      {/* mobile version */}
      <HistoryTableMobile groups={mobileGroups} onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
};

export default HistoryTable;