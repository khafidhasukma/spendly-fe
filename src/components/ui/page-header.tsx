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

function PageHeader({ title, description, action, breadcrumb, className }: PageHeaderProps) {
  return (
    <div className={cn('w-full', className)}>
      {breadcrumb && breadcrumb.length > 0 && <BreadcrumbNav items={breadcrumb} className="mb-4 sm:mb-6" />}

      <div className="flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
        <div className="min-w-0 flex-1 space-y-2 sm:space-y-3">
          <h1 className="text-balance text-2xl font-bold text-primary font-manrope sm:text-3xl lg:text-headline-lg">
            {title}
          </h1>
          {description && (
            <p className="max-w-full text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base sm:leading-normal lg:max-w-2xl">
              {description}
            </p>
          )}
        </div>

        {action && <div className="w-full shrink-0 lg:w-auto lg:max-w-md xl:max-w-lg">{action}</div>}
      </div>
    </div>
  );
}

export default PageHeader;
