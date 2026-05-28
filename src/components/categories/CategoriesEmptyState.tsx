import { ScanLine } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from '@/components/ui/empty';

const CategoriesEmptyState = () => {
  return (
    <Empty className="border bg-primary/5 border-primary/5">
      <EmptyHeader>
        <EmptyTitle className="text-xl lg:text-2xl font-semibold text-primary">
          No Expenses Yet
        </EmptyTitle>
        <EmptyDescription>
          Your categories are ready! Start recording your first transaction to see
          your financial progress.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="pt-5 lg:pt-10">
        <Button
          asChild
          className="bg-primary hover:bg-primary/90 text-sm md:text-base py-2.5 px-8! h-auto rounded-md"
        >
          <Link to="/scan">
            <ScanLine className="mr-2 h-6! w-6!" />
            Record First Transaction
          </Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
};

export default CategoriesEmptyState;
