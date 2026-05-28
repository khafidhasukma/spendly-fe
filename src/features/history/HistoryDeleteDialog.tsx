import { Trash2 } from 'lucide-react';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import type { TransactionItem } from '@/types';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  target: TransactionItem | undefined;
  onConfirm: () => void;
};

const HistoryDeleteDialog = ({ open, onOpenChange, target, onConfirm }: Props) => {
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Delete transaction?"
      description={
        target
          ? `Transaction "${target.merchant_name}" will be removed from history. This action cannot be undone.`
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
