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

interface EditWalletDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  walletName?: string;
  currentBalance?: number;
  onSave?: (data: { name: string; balance: number }) => void;
}

const EditWalletDialog = ({
  open,
  onOpenChange,
  walletName = '',
  currentBalance = 0,
  onSave,
}: EditWalletDialogProps) => {
  const [name, setName] = useState(walletName);
  const [balance, setBalance] = useState(String(currentBalance));

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setName(walletName);
      setBalance(String(currentBalance));
    }
  }, [open, walletName, currentBalance]);

  const handleSave = () => {
    if (name && balance && Number(balance) >= 0) {
      onSave?.({ name, balance: Number(balance) });
      toast.success('Wallet updated successfully');
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className='text-start'>Edit Wallet</DialogTitle>
          <DialogDescription className='text-start'>
            Update your wallet name and balance.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Wallet name */}
          <div className="space-y-2">
            <Label htmlFor="edit-wallet-name">Wallet Name</Label>
            <Input
              id="edit-wallet-name"
              placeholder="e.g. BCA, GoPay, Cash"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Balance */}
          <div className="space-y-2">
            <Label htmlFor="edit-wallet-balance">Balance (Rp)</Label>
            <Input
              id="edit-wallet-balance"
              type="number"
              min="0"
              placeholder="e.g. 5000000"
              value={balance}
              onChange={(e) => {
                const val = e.target.value;
                if (val === '' || Number(val) >= 0) setBalance(val);
              }}
            />
            <p className="text-xs text-muted-foreground">Balance cannot be negative</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!name || !balance || Number(balance) < 0}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditWalletDialog;
