import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  /** Provide `to` for all items except the last (current page). */
  to?: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  className?: string;
}

function BreadcrumbNav({ items, className }: BreadcrumbNavProps) {
  return (
    <nav className={cn('flex items-center gap-1.5 text-sm text-muted-foreground', className)}>
      {items.map((item, index) => {
        const isFirst = index === 0;
        const isLast = index === items.length - 1;

        return (
          <span key={index} className="flex items-center gap-1.5">
            {index > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/60" />}

            {item.to ? (
              <Link
                to={item.to}
                className={cn(
                  'flex items-center gap-1 transition-colors hover:text-foreground',
                )}
              >
                {isFirst && <ArrowLeft className="h-3 w-3" />}
                {item.label}
              </Link>
            ) : (
              <span className={cn(isLast && 'font-medium text-foreground')}>
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export default BreadcrumbNav;
