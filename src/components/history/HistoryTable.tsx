import { groupHistoryByRelativeDay } from '.';
import { HistoryTableDesktop, HistoryTableMobile, HistoryTableEmpty } from '.';
import type { HistoryTransaction } from './historyTypes';

export type { HistoryCategory, HistoryTransaction } from './historyTypes';

interface HistoryTableProps {
  transactions: HistoryTransaction[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

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
}

export default HistoryTable;