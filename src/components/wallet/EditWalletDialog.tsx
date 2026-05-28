/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
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
import type { ApiWallet, UpdateWalletPayload } from '@/api/endpoints/wallets';

interface EditWalletDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  wallet?: ApiWallet | null;
  onSave?: (id: string, payload: UpdateWalletPayload) => void | Promise<void>;
  isSubmitting?: boolean;
}

const EditWalletDialog = ({
  open,
  onOpenChange,
  wallet,
  onSave,
  isSubmitting = false,
}: EditWalletDialogProps) => {
  const [name, setName] = useState('');
  const [bankName, setBankName] = useState('');
  const [balance, setBalance] = useState('');

  useEffect(() => {
    if (open && wallet) {
      setName(wallet.name);
      setBankName(wallet.bank_name ?? '');
      setBalance(String(Math.round(parseFloat(wallet.balance))));
    }
  }, [open, wallet]);

  const handleSave = async () => {
    if (!name.trim() || !wallet) return;
    const payload: UpdateWalletPayload = {
      name: name.trim(),
      bank_name: bankName.trim() || undefined,
      balance: balance ? Number(balance) : undefined,
    };
    await onSave?.(wallet.id, payload);
    onOpenChange(false);
  };

  const showBankField = wallet?.type === 'bank' || wallet?.type === 'credit';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-start">Edit Wallet</DialogTitle>
          <DialogDescription className="text-start">
            Update your wallet details.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="edit-wallet-name">Wallet Name</Label>
            <Input
              id="edit-wallet-name"
              placeholder="e.g. BCA, GoPay, Cash"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {showBankField && (
            <div className="space-y-2">
              <Label htmlFor="edit-bank-name">Bank Name</Label>
              <Input
                id="edit-bank-name"
                placeholder="e.g. Bank BCA"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />
            </div>
          )}

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
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!name.trim() || isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditWalletDialog;
