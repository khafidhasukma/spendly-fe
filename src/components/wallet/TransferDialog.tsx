import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const walletOptions = [
  { id: '1', name: 'Cash' },
  { id: '2', name: 'BCA' },
  { id: '3', name: 'Mandiri' },
  { id: '4', name: 'GoPay' },
  { id: '5', name: 'Credit Card' },
  { id: '6', name: 'Savings' },
];

interface TransferDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTransfer?: (data: { fromWalletId: string; toWalletId: string; amount: number }) => void;
}

const TransferDialog = ({ open, onOpenChange, onTransfer }: TransferDialogProps) => {
  const [fromWallet, setFromWallet] = useState('');
  const [toWallet, setToWallet] = useState('');
  const [amount, setAmount] = useState('');

  const handleTransfer = () => {
    if (fromWallet && toWallet && amount && fromWallet !== toWallet) {
      onTransfer?.({ fromWalletId: fromWallet, toWalletId: toWallet, amount: Number(amount) });
      setFromWallet('');
      setToWallet('');
      setAmount('');
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Transfer Between Wallets</DialogTitle>
          <DialogDescription>
            Move funds from one wallet to another.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* From wallet */}
          <div className="space-y-2">
            <Label>From Wallet</Label>
            <Select value={fromWallet} onValueChange={setFromWallet}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select source wallet" />
              </SelectTrigger>
              <SelectContent>
                {walletOptions.map((w) => (
                  <SelectItem key={w.id} value={w.id}>
                    {w.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Arrow indicator */}
          <div className="flex justify-center">
            <div className="flex size-8 items-center justify-center rounded-full bg-muted">
              <ArrowRight className="size-4 text-muted-foreground rotate-90" />
            </div>
          </div>

          {/* To wallet */}
          <div className="space-y-2">
            <Label>To Wallet</Label>
            <Select value={toWallet} onValueChange={setToWallet}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select destination wallet" />
              </SelectTrigger>
              <SelectContent>
                {walletOptions
                  .filter((w) => w.id !== fromWallet)
                  .map((w) => (
                    <SelectItem key={w.id} value={w.id}>
                      {w.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="transfer-amount">Amount (Rp)</Label>
            <Input
              id="transfer-amount"
              type="number"
              placeholder="e.g. 500000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleTransfer}
            disabled={!fromWallet || !toWallet || !amount || fromWallet === toWallet}
          >
            Transfer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TransferDialog;
