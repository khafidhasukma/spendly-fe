import { useState } from 'react';
import {
  ShoppingCart,
  Utensils,
  Car,
  Gamepad2,
  Zap,
  GraduationCap,
  Heart,
  Home,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const categoryOptions = [
  { value: 'groceries', label: 'Groceries', icon: ShoppingCart },
  { value: 'food', label: 'Food & Dining', icon: Utensils },
  { value: 'transport', label: 'Transportation', icon: Car },
  { value: 'entertainment', label: 'Entertainment', icon: Gamepad2 },
  { value: 'utilities', label: 'Utilities', icon: Zap },
  { value: 'education', label: 'Education', icon: GraduationCap },
  { value: 'health', label: 'Health', icon: Heart },
  { value: 'housing', label: 'Housing', icon: Home },
];

interface AddBudgetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (data: { category: string; limit: number }) => void;
}

const AddBudgetDialog = ({ open, onOpenChange, onSave }: AddBudgetDialogProps) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [limit, setLimit] = useState('');

  const handleSave = () => {
    if (selectedCategory && limit) {
      onSave?.({ category: selectedCategory, limit: Number(limit) });
      setSelectedCategory('');
      setLimit('');
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Budget Category</DialogTitle>
          <DialogDescription>
            Set a spending limit for a category.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Category selection */}
          <div className="space-y-2">
            <Label>Category</Label>
            <div className="grid grid-cols-4 gap-2">
              {categoryOptions.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`flex flex-col items-center gap-1.5 rounded-lg border p-2 text-[11px] transition-colors ${
                    selectedCategory === cat.value
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:border-primary/50 hover:bg-muted/50'
                  }`}
                >
                  <cat.icon className="size-4" />
                  <span className="text-center leading-tight">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Limit input */}
          <div className="space-y-2">
            <Label htmlFor="budget-limit">Budget Limit (Rp)</Label>
            <Input
              id="budget-limit"
              type="number"
              min="0"
              placeholder="e.g. 2000000"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!selectedCategory || !limit}>
            Add Budget
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddBudgetDialog;
