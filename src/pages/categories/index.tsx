import { useEffect, useReducer, useCallback, useState } from 'react';
import { toast } from 'sonner';
import PageHeader from '@/components/ui/page-header';
import { CategoriesEmptyState, CategoryCard, CategoriesFeaturesSection } from '@/components/categories';
import { usePageTitle } from '@/hooks';
import { categoriesApi } from '@/api';
import { getIconByName } from '@/lib/category-icons';
import type { ApiCategory } from '@/api/endpoints/categories';
import CategoryDeleteDialog from '@/components/categories/CategoryDeleteDialog';
import CategoryFormDialog from '@/components/categories/CategoryFormDialog';

// --- fetch reducer ---
type State =
  | { status: 'loading' }
  | { status: 'success'; categories: ApiCategory[] }
  | { status: 'error' };

type Action =
  | { type: 'LOADING' }
  | { type: 'SUCCESS'; payload: ApiCategory[] }
  | { type: 'ERROR' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
  case 'LOADING': return { status: 'loading' };
  case 'SUCCESS': return { status: 'success', categories: action.payload };
  case 'ERROR':   return { status: 'error' };
  default: return state;
  }
}

const SkeletonCard = () => (
  <div className="rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm space-y-3">
    <div className="h-10 w-10 animate-pulse rounded-lg bg-muted sm:h-12 sm:w-12" />
    <div className="h-4 w-24 animate-pulse rounded bg-muted" />
    <div className="h-3 w-16 animate-pulse rounded bg-muted" />
    <div className="h-5 w-20 animate-pulse rounded bg-muted" />
  </div>
);

const CategoriesPage = () => {
  usePageTitle('Categories');

  const [state, dispatch] = useReducer(reducer, { status: 'loading' });
  const [tick, setTick] = useState(0);
  const refetch = useCallback(() => setTick((t) => t + 1), []);

  // form dialog
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<ApiCategory | undefined>();

  // delete dialog
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<ApiCategory | undefined>();

  useEffect(() => {
    let cancelled = false;
    dispatch({ type: 'LOADING' });
    categoriesApi.getAll()
      .then((cats) => { if (!cancelled) dispatch({ type: 'SUCCESS', payload: cats }); })
      .catch(() => { if (!cancelled) dispatch({ type: 'ERROR' }); });
    return () => { cancelled = true; };
  }, [tick]);

  const categories = state.status === 'success' ? state.categories : [];
  const hasTransactions = categories.some((c) => c.transaction_count > 0);

  const handleEdit = (id: string) => {
    const cat = categories.find((c) => c.id === id);
    setEditTarget(cat);
    setFormOpen(true);
  };

  const handleDeleteRequest = (id: string) => {
    const cat = categories.find((c) => c.id === id);
    setDeleteTarget(cat);
    setDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await categoriesApi.delete(deleteTarget.id);
      toast.success(`"${deleteTarget.name}" deleted`);
      setDeleteOpen(false);
      setDeleteTarget(undefined);
      refetch();
    } catch {
      toast.error('Failed to delete category');
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 md:space-y-10">
      <PageHeader
        breadcrumb={[
          { label: 'Dashboard', to: '/dashboard' },
          { label: 'Categories Management' },
        ]}
        title="Categories Management"
        description="Manage your spending categories to get more accurate financial reports."
      />

      {state.status === 'error' && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center text-sm text-destructive">
          Failed to load categories.{' '}
          <button type="button" onClick={refetch} className="font-semibold underline">
            Retry
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:gap-5 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6">
        {state.status === 'loading'
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              id={cat.id}
              name={cat.name}
              icon={getIconByName(cat.icon)}
              color={cat.color}
              type={cat.type}
              isSystem={cat.is_system}
              transactions={cat.transaction_count}
              total={parseFloat(cat.total_amount)}
              onEdit={handleEdit}
              onDelete={handleDeleteRequest}
            />
          ))
        }
      </div>

      {state.status === 'success' && !hasTransactions && <CategoriesEmptyState />}

      <CategoriesFeaturesSection />

      <CategoryFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        editTarget={editTarget}
        onSuccess={() => { setFormOpen(false); refetch(); }}
      />

      <CategoryDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        target={deleteTarget}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default CategoriesPage;
