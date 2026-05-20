import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import type { HistoryPaginationProps } from '@/types';

const HistoryPagination = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: HistoryPaginationProps) => {
  const from = Math.min((currentPage - 1) * pageSize + 1, totalItems);
  const to = Math.min(currentPage * pageSize, totalItems);

  const getPages = (): (number | 'ellipsis')[] => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | 'ellipsis')[] = [1];
    if (currentPage > 3) pages.push('ellipsis');
    for (let p = Math.max(2, currentPage - 1); p <= Math.min(totalPages - 1, currentPage + 1); p++) {
      pages.push(p);
    }
    if (currentPage < totalPages - 2) pages.push('ellipsis');
    pages.push(totalPages);
    return pages;
  };

  return (
    <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-between sm:gap-4">
      <p className="text-center text-xs text-muted-foreground sm:text-left sm:text-sm">
        Showing {from}–{to} of {totalItems} transactions
      </p>

      <div className="w-full max-w-full overflow-x-auto pb-1 sm:w-auto sm:pb-0 sm:overflow-visible">
        <Pagination className="mx-auto w-max max-w-full justify-center sm:mx-0 sm:ms-auto">
          <PaginationContent className="flex-wrap justify-center gap-0.5 sm:flex-nowrap sm:gap-1">
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) onPageChange(currentPage - 1);
                }}
                aria-disabled={currentPage === 1}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>

            {getPages().map((p, i) =>
              p === 'ellipsis' ? (
                <PaginationItem key={`ellipsis-${i}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={p}>
                  <PaginationLink
                    href="#"
                    isActive={p === currentPage}
                    onClick={(e) => {
                      e.preventDefault();
                      onPageChange(p);
                    }}
                    className={
                      p === currentPage ? 'bg-primary text-primary-foreground hover:bg-primary/90 border-primary' : ''
                    }
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) onPageChange(currentPage + 1);
                }}
                aria-disabled={currentPage === totalPages}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default HistoryPagination;