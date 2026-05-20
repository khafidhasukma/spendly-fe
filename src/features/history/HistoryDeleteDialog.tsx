import { Trash2 } from 'lucide-react';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import type { HistoryDeleteDialogProps } from '@/types';

const HistoryDeleteDialog = ({ open, onOpenChange, target, onConfirm }: HistoryDeleteDialogProps) => {
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Hapus riwayat transaksi?"
      description={
        target
          ? `Transaksi "${target.merchant}" akan dihapus dari riwayat. Tindakan ini tidak dapat dibatalkan.`
          : undefined
      }
      confirmLabel="Hapus"
      cancelLabel="Batal"
      variant="destructive"
      onConfirm={onConfirm}
      icon={<Trash2 className="h-6 w-6" />}
    />
  );
};

export default HistoryDeleteDialog;