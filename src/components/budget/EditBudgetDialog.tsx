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

interface EditBudgetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoryName?: string;
  currentLimit?: number;
  onSave?: (data: { limit: number }) => void;
}

const EditBudgetDialog = ({
  open,
  onOpenChange,
  categoryName = 'Category',
  currentLimit = 0,
  onSave,
}: EditBudgetDialogProps) => {
  const [limit, setLimit] = useState(String(currentLimit));

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLimit(String(currentLimit));
    }
  }, [open, currentLimit]);

  const handleSave = () => {
    if (limit && Number(limit) > 0) {
      onSave?.({ limit: Number(limit) });
      toast.success('Budget updated successfully');
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className='text-start'>Edit Budget {categoryName}</DialogTitle>
          <DialogDescription className='text-start'>
            Adjust the spending limit for this category.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="edit-budget-limit">Budget Limit (Rp)</Label>
            <Input
              id="edit-budget-limit"
              type="number"
              min="0"
              placeholder="e.g. 2000000"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Set the maximum amount you want to spend in this category.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!limit || Number(limit) <= 0}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditBudgetDialog;
