import { Trash2 } from 'lucide-react';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';

interface DeleteWalletDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  walletName?: string;
  onConfirm: () => void;
}

const DeleteWalletDialog = ({
  open,
  onOpenChange,
  walletName,
  onConfirm,
}: DeleteWalletDialogProps) => {
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Delete wallet?"
      description={
        walletName
          ? `"${walletName}" will be permanently deleted. This action cannot be undone.`
          : 'This wallet will be permanently deleted. This action cannot be undone.'
      }
      confirmLabel="Delete"
      cancelLabel="Cancel"
      variant="destructive"
      onConfirm={onConfirm}
      icon={<Trash2 className="h-6 w-6" />}
    />
  );
};

export default DeleteWalletDialog;
