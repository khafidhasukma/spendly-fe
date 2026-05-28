import { formatRelativeDayHeading } from '@/utils';
import type { TransactionItem } from '@/types';

const groupHistoryByRelativeDay = (transactions: TransactionItem[]): [string, TransactionItem[]][] => {
  const sorted = [...transactions].sort((a, b) => b.date.localeCompare(a.date));
  const map = new Map<string, TransactionItem[]>();
  for (const tx of sorted) {
    const label = formatRelativeDayHeading(tx.date);
    const list = map.get(label) ?? [];
    list.push(tx);
    map.set(label, list);
  }
  return Array.from(map.entries());
};

export default groupHistoryByRelativeDay;
