const SkeletonRow = () => (
  <div className="flex items-center gap-3 border-b border-border p-4 last:border-b-0">
    <div className="h-9 w-9 animate-pulse rounded-full bg-muted shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="h-4 w-40 animate-pulse rounded bg-muted" />
      <div className="h-3 w-24 animate-pulse rounded bg-muted" />
    </div>
    <div className="hidden sm:block h-4 w-20 animate-pulse rounded bg-muted" />
    <div className="h-4 w-24 animate-pulse rounded bg-muted shrink-0" />
  </div>
);

const HistoryTableSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <div className="overflow-hidden rounded-lg border border-border bg-card">
    {Array.from({ length: rows }).map((_, i) => <SkeletonRow key={i} />)}
  </div>
);

export default HistoryTableSkeleton;
