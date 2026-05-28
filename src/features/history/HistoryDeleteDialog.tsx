import { Trash2 } from 'lucide-react';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import type { HistoryDeleteDialogProps } from '@/types';

const HistoryDeleteDialog = ({ open, onOpenChange, target, onConfirm }: HistoryDeleteDialogProps) => {
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Delete transaction?"
      description={
        target
          ? `Transaction "${target.merchant}" will be removed from history. This action cannot be undone.`
          : undefined
      }
      confirmLabel="Delete"
      cancelLabel="Cancel"
      variant="destructive"
      onConfirm={onConfirm}
      icon={<Trash2 className="h-6 w-6" />}
    />
  );
};

export default HistoryDeleteDialog;