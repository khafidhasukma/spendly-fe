import { LayoutGrid } from 'lucide-react';
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from '@/components/ui/empty';

const HistoryTableEmpty = () => {
  return (
    <div className="rounded-2xl border border-border bg-card p-10">
      <Empty>
        <EmptyMedia>
          <LayoutGrid className="h-10 w-10 text-muted-foreground/40" />
        </EmptyMedia>
        <EmptyHeader>
          <EmptyTitle>No transactions found</EmptyTitle>
          <EmptyDescription>Try adjusting your filters.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
}

export default HistoryTableEmpty;
