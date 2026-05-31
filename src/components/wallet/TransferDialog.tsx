import { useState } from 'react';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { format } from 'date-fns';
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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { walletsApi } from '@/api';
import type { ApiWallet } from '@/types';

interface TransferDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  wallets?: ApiWallet[];
  onSuccess?: () => void;
}

const TransferDialog = ({ open, onOpenChange, wallets = [], onSuccess }: TransferDialogProps) => {
  const safeWallets = Array.isArray(wallets) ? wallets : [];
  const [fromWallet, setFromWallet] = useState('');
  const [toWallet, setToWallet] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setFromWallet('');
    setToWallet('');
    setAmount('');
    setDate(new Date());
    setNotes('');
  };

  const isValid = fromWallet && toWallet && amount && Number(amount) > 0 && fromWallet !== toWallet;

  const handleTransfer = async () => {
    if (!isValid) return;
    setLoading(true);
    try {
      await walletsApi.transfer({
        ['from_wallet_id']: fromWallet,
        ['to_wallet_id']: toWallet,
        amount: Number(amount),
        date: format(date, 'yyyy-MM-dd'),
        notes: notes.trim() || undefined,
      });
      toast.success('Transfer completed successfully');
      reset();
      onOpenChange(false);
      onSuccess?.();
    } catch (err: unknown) {
      const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message
        ?? 'Transfer failed.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) { reset(); onOpenChange(false); } }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-start">Transfer Between Wallets</DialogTitle>
          <DialogDescription className="text-start">
            Move funds from one wallet to another.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label>From Wallet</Label>
            <Select value={fromWallet} onValueChange={setFromWallet}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select source wallet" />
              </SelectTrigger>
              <SelectContent>
                {safeWallets.map((w) => (
                  <SelectItem key={w.id} value={w.id}>{w.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-center">
            <div className="flex size-8 items-center justify-center rounded-full bg-muted">
              <ArrowRight className="size-4 text-muted-foreground rotate-90" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>To Wallet</Label>
            <Select value={toWallet} onValueChange={setToWallet}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select destination wallet" />
              </SelectTrigger>
              <SelectContent>
                {safeWallets
                  .filter((w) => w.id !== fromWallet)
                  .map((w) => (
                    <SelectItem key={w.id} value={w.id}>{w.name}</SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="transfer-amount">Amount (Rp)</Label>
              <Input
                id="transfer-amount"
                type="number"
                placeholder="500000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start gap-2 font-normal h-12 rounded-[0.75rem]">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    {format(date, 'PPP')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={date} onSelect={(d) => d && setDate(d)} />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="transfer-notes">Notes (optional)</Label>
            <Textarea
              id="transfer-notes"
              placeholder="e.g. Transfer to savings"
              rows={2}
              className="resize-none"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleTransfer} disabled={!isValid || loading}>
            {loading ? 'Transferring...' : 'Transfer'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TransferDialog;
