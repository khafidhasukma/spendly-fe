import { Download, FileText, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/ui/page-header';

interface HistoryHeaderProps {
  onAddExpense?: () => void;
}

const HistoryHeader = ({ onAddExpense }: HistoryHeaderProps) => {
  return (
    <PageHeader
      title="Transaction History"
      description="Review and manage your detailed spending logs across all accounts."
      action={
        <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-end sm:gap-2">
          <Button variant="outline" size="sm" className="h-10 gap-2 sm:h-9">
            <Download className="h-4 w-4 shrink-0" />
            <span>CSV</span>
          </Button>
          <Button variant="outline" size="sm" className="h-10 gap-2 sm:h-9">
            <FileText className="h-4 w-4 shrink-0" />
            <span className="truncate sm:max-w-none">
              <span className="sm:hidden">PDF</span>
              <span className="hidden sm:inline">PDF Report</span>
            </span>
          </Button>
          <Button size="sm" className="col-span-2 h-10 gap-2 sm:col-span-1 sm:h-9 sm:w-auto" onClick={onAddExpense}>
            <PlusCircle className="h-4 w-4 shrink-0" />
            <span className="truncate sm:max-w-[11rem]">
              <span className="hidden sm:inline">Add Manual Expense</span>
              <span className="sm:hidden">Add expense</span>
            </span>
          </Button>
        </div>
      }
    />
  );
};

export default HistoryHeader;