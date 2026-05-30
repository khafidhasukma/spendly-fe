import { Download, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/ui/page-header';

interface Props {
  onAdd?: () => void;
  onExport?: () => void;
  isExporting?: boolean;
}

const HistoryHeader = ({ onAdd, onExport, isExporting = false }: Props) => {
  return (
    <PageHeader
      title="Transaction History"
      description="Review and manage your detailed spending logs across all accounts."
      action={
        <div className="flex w-full gap-2 max-sm:grid max-sm:grid-cols-2 sm:justify-end">
          <Button
            variant="outline"
            size="sm"
            className="h-10 gap-2 sm:h-9 max-sm:w-full px-5!"
            onClick={onExport}
            disabled={isExporting}
          >
            <Download className="h-4 w-4 shrink-0" />
            <span>{isExporting ? 'Exporting...' : 'Export CSV'}</span>
          </Button>
          <Button size="sm" className="h-10 gap-2 sm:h-9 max-sm:w-full" onClick={onAdd}>
            <Plus className="h-4 w-4 shrink-0" />
            <span>Add Transaction</span>
          </Button>
        </div>
      }
    />
  );
};

export default HistoryHeader;
