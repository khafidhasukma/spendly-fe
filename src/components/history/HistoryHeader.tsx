import { Download, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/ui/page-header';
import type { HistoryHeaderProps } from '@/types';

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

          <Button size="sm" className="h-10 gap-2 col-span-1 sm:h-9 sm:w-auto" onClick={onAddExpense}>
            <Plus className="h-4 w-4 shrink-0" />
            <span className="truncate sm:max-w-44">
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