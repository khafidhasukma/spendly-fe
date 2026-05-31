import { useState } from 'react';
import { toast } from 'sonner';
import PageHeader from '@/components/ui/page-header';
import {
  CategoriesEmptyState,
  CategoryCard,
  CategoryCardSkeleton,
  CategoriesFeaturesSection,
  CategoryDeleteDialog,
  CategoryFormDialog,
} from '@/components/categories';
import { usePageTitle } from '@/hooks';
import { categoriesApi } from '@/api';
import { getIconByName } from '@/lib/category-icons';
import { useCategoriesList } from '@/features/categories';
import type { ApiCategory } from '@/types';

const CategoriesPage = () => {
  usePageTitle('Categories');

  const { state, refetch } = useCategoriesList();

  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<ApiCategory | undefined>();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<ApiCategory | undefined>();

  const categories = state.status === 'success' ? state.categories : [];
  const hasTransactions = categories.some((c) => c.transaction_count > 0);

  const handleEdit = (id: string) => {
    setEditTarget(categories.find((c) => c.id === id));
    setFormOpen(true);
  };

  const handleDeleteRequest = (id: string) => {
    setDeleteTarget(categories.find((c) => c.id === id));
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
          ? Array.from({ length: 8 }).map((_, i) => <CategoryCardSkeleton key={i} />)
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
