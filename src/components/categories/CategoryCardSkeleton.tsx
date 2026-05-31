const CategoryCardSkeleton = () => (
  <div className="rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm space-y-3">
    <div className="h-10 w-10 animate-pulse rounded-lg bg-muted sm:h-12 sm:w-12" />
    <div className="h-4 w-24 animate-pulse rounded bg-muted" />
    <div className="h-3 w-16 animate-pulse rounded bg-muted" />
    <div className="h-5 w-20 animate-pulse rounded bg-muted" />
  </div>
);

export default CategoryCardSkeleton;
