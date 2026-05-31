/* eslint-disable camelcase */
import { useState } from 'react';
import {
  Wallet,
  CreditCard,
  Landmark,
  PiggyBank,
  Banknote,
  Smartphone,
} from 'lucide-react';
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
import type { CreateWalletPayload } from '@/types';

const walletTypes = [
  { value: 'cash',     label: 'Cash',        icon: Banknote    },
  { value: 'bank',     label: 'Bank',        icon: Landmark    },
  { value: 'e-wallet', label: 'E-Wallet',    icon: Smartphone  },
  { value: 'credit',   label: 'Credit Card', icon: CreditCard  },
  { value: 'savings',  label: 'Savings',     icon: PiggyBank   },
  { value: 'other',    label: 'Other',       icon: Wallet      },
];

const TYPE_COLORS: Record<string, string> = {
  cash:      '#10B981',
  bank:      '#1B4D35',
  'e-wallet':'#8B5CF6',
  credit:    '#EF4444',
  savings:   '#F59E0B',
  other:     '#6B7280',
};

interface AddWalletDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (payload: CreateWalletPayload) => void | Promise<void>;
  isSubmitting?: boolean;
}

const AddWalletDialog = ({ open, onOpenChange, onSave, isSubmitting = false }: AddWalletDialogProps) => {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [bankName, setBankName] = useState('');

  const reset = () => {
    setName('');
    setBalance('');
    setSelectedType('');
    setBankName('');
  };

  const needsBankName = selectedType === 'bank' || selectedType === 'credit';
  const isValid = name.trim() && balance && selectedType;

  const handleSave = async () => {
    if (!isValid) return;
    const payload: CreateWalletPayload = {
      name: name.trim(),
      type: selectedType,
      balance: Number(balance),
      color: TYPE_COLORS[selectedType] ?? '#6B7280',
      ...(needsBankName && bankName.trim() && { bank_name: bankName.trim() }),
    };
    await onSave?.(payload);
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) reset(); onOpenChange(v); }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-start">Add New Wallet</DialogTitle>
          <DialogDescription className="text-start">
            Add a new wallet to track your balance and transactions.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* wallet type */}
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

          {/* wallet name */}
          <div className="space-y-2">
            <Label htmlFor="wallet-name">Wallet Name</Label>
            <Input
              id="wallet-name"
              placeholder="e.g. BCA Savings, GoPay, Cash"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* bank / credit fields */}
          {needsBankName && (
            <div className="space-y-2">
              <Label htmlFor="bank-name">Bank Name</Label>
              <Input
                id="bank-name"
                placeholder="e.g. Bank BCA"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />
            </div>
          )}

          {/* initial balance */}
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
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!isValid || isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Add Wallet'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddWalletDialog;
