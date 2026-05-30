import { Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { ApiCategory } from '@/api/endpoints/categories';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  target?: ApiCategory;
  onConfirm: () => void;
}

const CategoryDeleteDialog = ({ open, onOpenChange, target, onConfirm }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm w-full gap-0 p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="text-base text-start">Delete Category</DialogTitle>
        </DialogHeader>

        <Separator />

        <div className="px-6 py-4">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete{' '}
            <span className="font-semibold text-foreground">&quot;{target?.name}&quot;</span>?
            This action cannot be undone.
          </p>
        </div>

        <Separator />

        <DialogFooter className="px-6 py-4 gap-2 grid grid-cols-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-destructive hover:bg-destructive/90 text-white"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryDeleteDialog;
