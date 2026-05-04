import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import BreadcrumbNav, { type BreadcrumbItem } from '@/components/ui/breadcrumb-nav';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
  breadcrumb?: BreadcrumbItem[];
  className?: string;
}

function PageHeader({
  title,
  description,
  action,
  breadcrumb,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn(className)}>
      {breadcrumb && breadcrumb.length > 0 && <BreadcrumbNav items={breadcrumb} className="mb-6" />}

      <div className="flex max-md:flex-col md:items-center justify-between gap-4">
        <div className='space-y-2'>
          <h1 className="text-headline-lg font-bold text-foreground font-manrope">{title}</h1>
          {description && (
            <div className="flex max-md:flex-col items-center justify-between gap-4">
              {description && <p className="text-sm text-muted-foreground lg:max-w-lg">{description}</p>}
            </div>
          )}
        </div>

        {(action) && (
          <div>
            {action && <div className="shrink-0">{action}</div>}
          </div>
        )}
      </div>
    </div>
  );
}

export default PageHeader;
