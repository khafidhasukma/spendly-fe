import { useState } from 'react';
import {
  Wallet,
  CreditCard,
  Landmark,
  PiggyBank,
  Banknote,
  Smartphone,
} from 'lucide-react';
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

const walletTypes = [
  { value: 'cash', label: 'Cash', icon: Banknote },
  { value: 'bank', label: 'Bank', icon: Landmark },
  { value: 'e-wallet', label: 'E-Wallet', icon: Smartphone },
  { value: 'credit', label: 'Credit Card', icon: CreditCard },
  { value: 'savings', label: 'Savings', icon: PiggyBank },
  { value: 'other', label: 'Other', icon: Wallet },
];

interface AddWalletDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (data: { name: string; balance: number; type: string }) => void;
}

const AddWalletDialog = ({ open, onOpenChange, onSave }: AddWalletDialogProps) => {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const handleSave = () => {
    if (name && balance && selectedType) {
      onSave?.({ name, balance: Number(balance), type: selectedType });
      toast.success('Wallet added successfully');
      setName('');
      setBalance('');
      setSelectedType('');
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Wallet</DialogTitle>
          <DialogDescription>
            Add a new wallet to track your balance and transactions.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Wallet type selection */}
          <div className="space-y-2">
            <Label>Wallet Type</Label>
            <div className="grid grid-cols-3 gap-2">
              {walletTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setSelectedType(type.value)}
                  className={`flex flex-col items-center gap-1.5 rounded-lg border p-3 text-xs transition-colors ${
                    selectedType === type.value
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:border-primary/50 hover:bg-muted/50'
                  }`}
                >
                  <type.icon className="size-5" />
                  <span>{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Wallet name */}
          <div className="space-y-2">
            <Label htmlFor="wallet-name">Wallet Name</Label>
            <Input
              id="wallet-name"
              placeholder="e.g. BCA, GoPay, Cash"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Initial balance */}
          <div className="space-y-2">
            <Label htmlFor="wallet-balance">Initial Balance (Rp)</Label>
            <Input
              id="wallet-balance"
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
          <Button onClick={handleSave} disabled={!name || !balance || !selectedType}>
            Add Wallet
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddWalletDialog;
