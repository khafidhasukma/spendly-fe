import { Trash2 } from 'lucide-react';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';

interface DeleteBudgetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoryName?: string;
  onConfirm: () => void;
}

const DeleteBudgetDialog = ({
  open,
  onOpenChange,
  categoryName,
  onConfirm,
}: DeleteBudgetDialogProps) => {
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Delete budget?"
      description={
        categoryName
          ? `The budget for "${categoryName}" will be permanently deleted. This action cannot be undone.`
          : 'This budget will be permanently deleted. This action cannot be undone.'
      }
      confirmLabel="Delete"
      cancelLabel="Cancel"
      variant="destructive"
      onConfirm={onConfirm}
      icon={<Trash2 className="h-6 w-6" />}
    />
  );
};

export default DeleteBudgetDialog;
