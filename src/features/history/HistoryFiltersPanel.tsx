import { HistoryFilters } from '@/components/history';
import type { HistoryFiltersPanelProps } from '@/types';

const HistoryFiltersPanel = ({ value, onChange, categoryOptions }: HistoryFiltersPanelProps) => {
  return <HistoryFilters value={value} onChange={onChange} categoryOptions={categoryOptions} />;
};

export default HistoryFiltersPanel;