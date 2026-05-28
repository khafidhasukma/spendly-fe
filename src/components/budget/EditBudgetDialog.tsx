import { useEffect, useState } from 'react';
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
import type { BudgetItem, BudgetUpdatePayload } from '@/types/budget';

interface EditBudgetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  budget?: BudgetItem | null;
  onSave?: (id: string, data: BudgetUpdatePayload) => void | Promise<void>;
  isSubmitting?: boolean;
}

const EditBudgetDialog = ({
  open,
  onOpenChange,
  budget,
  onSave,
  isSubmitting = false,
}: EditBudgetDialogProps) => {
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (open && budget) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAmount(String(parseFloat(budget.amount)));
    }
  }, [open, budget]);

  const handleSave = async () => {
    if (!amount || Number(amount) <= 0 || !budget) return;
    try {
      await onSave?.(budget.id, { amount: Number(amount) });
      toast.success('Budget updated successfully');
      onOpenChange(false);
    } catch {
      toast.error('Failed to update budget');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-start">Edit Budget {budget?.name}</DialogTitle>
          <DialogDescription className="text-start">
            Adjust the spending limit for this category.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 py-2">
          <Label htmlFor="edit-budget-amount">Budget Limit (Rp)</Label>
          <Input
            id="edit-budget-amount"
            type="number"
            min="0"
            placeholder="e.g. 2000000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!amount || Number(amount) <= 0 || isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditBudgetDialog;
