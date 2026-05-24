import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AddBudgetDialog,
  BudgetCategoryList,
  BudgetOverviewCard,
  EditBudgetDialog,
} from '@/components/budget';

const BudgetPage = () => {
  const navigate = useNavigate();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editCategory, setEditCategory] = useState({ name: '', limit: 0 });

  const handleEdit = (id: string) => {
    const categoryMap: Record<string, { name: string; limit: number }> = {
      '1': { name: 'Groceries', limit: 3_000_000 },
      '2': { name: 'Food & Dining', limit: 2_500_000 },
      '3': { name: 'Transportation', limit: 1_500_000 },
      '4': { name: 'Entertainment', limit: 1_000_000 },
      '5': { name: 'Utilities', limit: 800_000 },
      '6': { name: 'Education', limit: 2_000_000 },
      '7': { name: 'Health', limit: 1_500_000 },
    };
    const cat = categoryMap[id] ?? { name: 'Category', limit: 0 };
    setEditCategory(cat);
    setEditDialogOpen(true);
  };

  return (
    <div className="space-y-5 sm:space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="shrink-0"
          >
            <ArrowLeft className="size-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground font-manrope sm:text-2xl lg:text-3xl">
              Detailed Budgeting
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage and track your spending limits
            </p>
          </div>
        </div>
        <Button onClick={() => setAddDialogOpen(true)} className="w-full sm:w-auto">
          <Plus className="size-4" />
          Add Budget
        </Button>
      </div>

      {/* Overview */}
      <BudgetOverviewCard />

      {/* Category list */}
      <BudgetCategoryList onEdit={handleEdit} />

      {/* Dialogs */}
      <AddBudgetDialog open={addDialogOpen} onOpenChange={setAddDialogOpen} />
      <EditBudgetDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        categoryName={editCategory.name}
        currentLimit={editCategory.limit}
      />
    </div>
  );
};

export default BudgetPage;
