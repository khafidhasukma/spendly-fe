/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useEffect, useState } from 'react';
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
import { budgetApi, categoriesApi } from '@/api';
import type { BudgetItem, BudgetPayload, BudgetSummary, BudgetUpdatePayload } from '@/types/budget';
import type { ApiCategory } from '@/api/endpoints/categories';

const BudgetPage = () => {
  usePageTitle('Budget');

  const [budgets, setBudgets] = useState<BudgetItem[]>([]);
  const [summary, setSummary] = useState<BudgetSummary | undefined>();
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editBudget, setEditBudget] = useState<BudgetItem | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<BudgetItem | null>(null);

  const fetchBudgets = useCallback(async () => {
    try {
      const [budgetData, summaryData] = await Promise.all([
        budgetApi.getAll(),
        budgetApi.getSummary(),
      ]);
      setBudgets(budgetData);
      setSummary(summaryData);
    } catch {
      toast.error('Failed to load budgets');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const data = await categoriesApi.getAll('expense');
      setCategories(data);
    } catch {
      // noop
    }
  }, []);

  useEffect(() => {
    fetchBudgets();
    fetchCategories();
  }, [fetchBudgets, fetchCategories]);

  const handleAdd = async (payload: BudgetPayload) => {
    setIsSubmitting(true);
    try {
      await budgetApi.create(payload);
      await fetchBudgets();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (id: string) => {
    const budget = budgets.find((b) => b.id === id);
    if (budget) {
      setEditBudget(budget);
      setEditDialogOpen(true);
    }
  };

  const handleEditSave = async (id: string, payload: BudgetUpdatePayload) => {
    setIsSubmitting(true);
    try {
      await budgetApi.update(id, payload);
      await fetchBudgets();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteRequest = (id: string) => {
    const budget = budgets.find((b) => b.id === id);
    if (budget) {
      setDeleteTarget(budget);
      setDeleteOpen(true);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await budgetApi.delete(deleteTarget.id);
      toast.success('Budget deleted successfully');
      await fetchBudgets();
    } catch {
      toast.error('Failed to delete budget');
    } finally {
      setDeleteTarget(null);
      setDeleteOpen(false);
    }
  };

  const categoryOptions = categories.map((c) => ({
    id: c.id,
    name: c.name,
    icon: c.icon,
  }));

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

      <BudgetOverviewCard summary={summary} isLoading={isLoading} />

      <BudgetCategoryList
        budgets={budgets}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDeleteRequest}
      />

      <AddBudgetDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        categories={categoryOptions}
        onSave={handleAdd}
        isSubmitting={isSubmitting}
      />
      <EditBudgetDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        budget={editBudget}
        onSave={handleEditSave}
        isSubmitting={isSubmitting}
      />
      <DeleteBudgetDialog
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open);
          if (!open) setDeleteTarget(null);
        }}
        categoryName={deleteTarget?.name}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default BudgetPage;
