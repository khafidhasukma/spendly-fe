import { HistoryFilters, type HistoryFiltersValue } from '@/components/history';

type HistoryFiltersPanelProps = {
  value: HistoryFiltersValue;
  onChange: (value: HistoryFiltersValue) => void;
  categoryOptions: { id: string; name: string }[];
};

const HistoryFiltersPanel = ({ value, onChange, categoryOptions }: HistoryFiltersPanelProps) => {
  return <HistoryFilters value={value} onChange={onChange} categoryOptions={categoryOptions} />;
};

export default HistoryFiltersPanel;