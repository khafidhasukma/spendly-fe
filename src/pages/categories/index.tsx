import { useState } from 'react';
import {
  UtensilsCrossed,
  Shirt,
  Heart,
  Scissors,
  ShoppingCart,
  Zap,
  Fuel,
  LayoutGrid,
  Trash2,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/ui/page-header';
import { CategoriesEmptyState, CategoryCard, CategoriesFeaturesSection } from '@/components/categories';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { EditCategoryDialog } from '@/components/ui/edit-category-dialog';
import { getIconById, getNextColor } from '@/lib/category-icons';
import type { Category } from '@/types';

const INITIAL_CATEGORIES: Category[] = [
  { id: 'fnb',         iconId: 'utensils',      name: 'F&B',         icon: UtensilsCrossed, color: 'text-orange-500', bgColor: 'bg-orange-100 dark:bg-orange-500/20', transactions: 0, total: 0 },
  { id: 'apparels',    iconId: 'shirt',         name: 'Apparels',    icon: Shirt,           color: 'text-blue-500',   bgColor: 'bg-blue-100 dark:bg-blue-500/20',   transactions: 0, total: 0 },
  { id: 'health',      iconId: 'heart-pulse',   name: 'Health',      icon: Heart,           color: 'text-red-500',    bgColor: 'bg-red-100 dark:bg-red-500/20',    transactions: 0, total: 0 },
  { id: 'beauty',      iconId: 'scissors',      name: 'Beauty',      icon: Scissors,        color: 'text-pink-500',   bgColor: 'bg-pink-100 dark:bg-pink-500/20',   transactions: 0, total: 0 },
  { id: 'groceries',   iconId: 'shopping-cart', name: 'Groceries',   icon: ShoppingCart,    color: 'text-green-500',  bgColor: 'bg-green-100 dark:bg-green-500/20',  transactions: 0, total: 0 },
  { id: 'electricity', iconId: 'zap',           name: 'Electricity', icon: Zap,             color: 'text-yellow-500', bgColor: 'bg-yellow-100 dark:bg-yellow-500/20', transactions: 0, total: 0 },
  { id: 'gas',         iconId: 'fuel',          name: 'Gas',         icon: Fuel,            color: 'text-slate-500',  bgColor: 'bg-slate-100 dark:bg-slate-500/20',  transactions: 0, total: 0 },
  { id: 'others',      iconId: 'layout-grid',   name: 'Others',      icon: LayoutGrid,      color: 'text-gray-500',   bgColor: 'bg-gray-100 dark:bg-gray-500/20',   transactions: 0, total: 0 },
];


const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);

  const [editTarget, setEditTarget] = useState<Category | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  const [addOpen, setAddOpen] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const openEdit = (category: Category) => {
    setEditTarget(category);
    setEditOpen(true);
  };

  const openDelete = (category: Category) => {
    setDeleteTarget(category);
    setDeleteOpen(true);
  };

  const handleSaveEdit = (newName: string, newIconId: string) => {
    if (!editTarget) return;
    const newIcon = getIconById(newIconId);
    setCategories((prev) =>
      prev.map((c) =>
        c.id === editTarget.id
          ? { ...c, name: newName, iconId: newIconId, icon: newIcon }
          : c
      )
    );
  };

  const handleAddCategory = (newName: string, newIconId: string) => {
    const newIcon = getIconById(newIconId);
    const { color, bgColor } = getNextColor(categories.length);
    const newCategory: Category = {
      id: `cat-${Date.now()}`,
      name: newName,
      iconId: newIconId,
      icon: newIcon,
      color,
      bgColor,
      transactions: 0,
      total: 0,
    };
    setCategories((prev) => [...prev, newCategory]);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    setCategories((prev) => prev.filter((c) => c.id !== deleteTarget.id));
  };

  const hasTransactions = categories.some((c) => c.transactions > 0);

  return (
    <div className="space-y-6 sm:space-y-8 md:space-y-10">
      {/* Header */}
      <PageHeader
        breadcrumb={[
          { label: 'Dashboard', to: '/dashboard' },
          { label: 'Categories Management' },
        ]}
        title="Manajemen Kategori"
        description="Kelola kategori pengeluaran Anda untuk mendapatkan laporan keuangan yang lebih akurat."
        action={
          <Button onClick={() => setAddOpen(true)} className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Tambah Kategori
          </Button>
        }
      />

      {/* Category Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:gap-5 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            {...category}
            onEdit={() => openEdit(category)}
            onDelete={() => openDelete(category)}
          />
        ))}
      </div>

      {/* Empty State */}
      {!hasTransactions && <CategoriesEmptyState />}

      {/* Features Section */}
      <CategoriesFeaturesSection />

      {/* Edit Category Modal */}
      <EditCategoryDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        mode="edit"
        categoryName={editTarget?.name ?? ''}
        categoryIconId={editTarget?.iconId}
        onSave={handleSaveEdit}
      />

      {/* Add Category Modal */}
      <EditCategoryDialog open={addOpen} onOpenChange={setAddOpen} mode="add" onSave={handleAddCategory} />

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Hapus Kategori?"
        description={`Kategori "${deleteTarget?.name}" akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.`}
        confirmLabel="Hapus"
        cancelLabel="Batal"
        variant="destructive"
        onConfirm={handleConfirmDelete}
        icon={<Trash2 className="h-6 w-6" />}
      />
    </div>
  );
};

export default CategoriesPage;