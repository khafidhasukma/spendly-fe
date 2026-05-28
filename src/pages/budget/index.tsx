import { useState } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/ui/page-header';
import {
  AddBudgetDialog,
  BudgetCategoryList,
  BudgetOverviewCard,
  DeleteBudgetDialog,
  EditBudgetDialog,
} from '@/components/budget';
import { usePageTitle } from '@/hooks';

const mockCategoryNames: Record<string, string> = {
  '1': 'Groceries',
  '2': 'Food & Dining',
  '3': 'Transportation',
  '4': 'Entertainment',
  '5': 'Utilities',
  '6': 'Education',
  '7': 'Health',
};

const mockCategoryData: Record<string, { name: string; limit: number }> = {
  '1': { name: 'Groceries', limit: 3_000_000 },
  '2': { name: 'Food & Dining', limit: 2_500_000 },
  '3': { name: 'Transportation', limit: 1_500_000 },
  '4': { name: 'Entertainment', limit: 1_000_000 },
  '5': { name: 'Utilities', limit: 800_000 },
  '6': { name: 'Education', limit: 2_000_000 },
  '7': { name: 'Health', limit: 1_500_000 },
};

const BudgetPage = () => {
  usePageTitle('Budget');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editCategory, setEditCategory] = useState({ name: '', limit: 0 });

  // Delete state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    const cat = mockCategoryData[id] ?? { name: 'Category', limit: 0 };
    setEditCategory(cat);
    setEditDialogOpen(true);
  };

  const handleDeleteRequest = (id: string) => {
    setDeleteTargetId(id);
    setDeleteOpen(true);
  };

  const handleDeleteConfirm = () => {
    // TODO: delete budget by deleteTargetId
    toast.success('Budget deleted successfully');
    setDeleteTargetId(null);
  };

  return (
    <div className="space-y-5 sm:space-y-6 lg:space-y-8">
      <PageHeader
        title="Detailed Budgeting"
        description="Manage and track your spending limits per category"
        breadcrumb={[
          { label: 'Profile', to: '/profile' },
          { label: 'Detailed Budgeting' },
        ]}
        action={
          <Button onClick={() => setAddDialogOpen(true)} className="w-full sm:w-auto">
            <Plus className="size-4" />
            Add Budget
          </Button>
        }
      />

      {/* Overview */}
      <BudgetOverviewCard />

      {/* Category list */}
      <BudgetCategoryList onEdit={handleEdit} onDelete={handleDeleteRequest} />

      {/* Dialogs */}
      <AddBudgetDialog open={addDialogOpen} onOpenChange={setAddDialogOpen} />
      <EditBudgetDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        categoryName={editCategory.name}
        currentLimit={editCategory.limit}
      />
      <DeleteBudgetDialog
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open);
          if (!open) setDeleteTargetId(null);
        }}
        categoryName={deleteTargetId ? mockCategoryNames[deleteTargetId] : undefined}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default BudgetPage;
