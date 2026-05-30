/* eslint-disable camelcase */
import { useState } from 'react';
import { toast } from 'sonner';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { BudgetPayload } from '@/types/budget';

interface CategoryOption {
  id: string;
  name: string;
  icon: string;
}

interface AddBudgetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories?: CategoryOption[];
  onSave?: (data: BudgetPayload) => void | Promise<void>;
  isSubmitting?: boolean;
}

const AddBudgetDialog = ({
  open,
  onOpenChange,
  categories = [],
  onSave,
  isSubmitting = false,
}: AddBudgetDialogProps) => {
  const [name, setName] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [limit, setLimit] = useState('');
  const [period] = useState('monthly');

  const resetForm = () => {
    setName('');
    setSelectedCategoryId('');
    setLimit('');
  };

  const handleSave = async () => {
    if (!selectedCategoryId || !limit || !name.trim()) return;

    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];

    const payload: BudgetPayload = {
      name: name.trim(),
      category_id: selectedCategoryId,
      amount: Number(limit),
      period,
      start_date: startDate,
      end_date: endDate,
    };

    try {
      await onSave?.(payload);
      toast.success('Budget added successfully');
      resetForm();
      onOpenChange(false);
    } catch {
      toast.error('Failed to add budget');
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) resetForm(); onOpenChange(v); }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-start">Add Budget Category</DialogTitle>
          <DialogDescription className="text-start">
            Set a spending limit for a category.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Budget name */}
          <div className="space-y-2">
            <Label htmlFor="budget-name">Budget Name</Label>
            <Input
              id="budget-name"
              placeholder="e.g. Monthly Groceries"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Category selection */}
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={selectedCategoryId} onValueChange={setSelectedCategoryId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    <span className="flex items-center gap-2">
                      <span>{cat.name}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
          <Button
            onClick={handleSave}
            disabled={!selectedCategoryId || !limit || !name.trim() || isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Add Budget'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddBudgetDialog;
