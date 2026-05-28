import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import {
  Store,
  Banknote,
  CalendarDays,
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
import { Separator } from '@/components/ui/separator';
import type { HistoryFormDialogProps } from '@/types';
import { formatRupiah } from '@/utils';

const CATEGORIES = [
  { id: 'groceries', name: 'Groceries' },
  { id: 'dining', name: 'F&B' },
  { id: 'shopping', name: 'Shopping' },
  { id: 'transport', name: 'Transport' },
  { id: 'utilities', name: 'Household' },
  { id: 'health', name: 'Health' },
  { id: 'entertainment', name: 'Entertainment' },
  { id: 'beauty', name: 'Beauty' },
  { id: 'electricity', name: 'Electricity' },
  { id: 'payroll', name: 'Payroll' },
  { id: 'others', name: 'Others' },
];

const PAYMENT_METHODS = [
  { id: 'cash', name: 'Cash' },
  { id: 'debit-card', name: 'Debit Card' },
  { id: 'credit-card', name: 'Credit Card' },
  { id: 'gopay', name: 'GoPay' },
  { id: 'ovo', name: 'OVO' },
  { id: 'dana', name: 'DANA' },
  { id: 'shopeepay', name: 'ShopeePay' },
  { id: 'bank-transfer', name: 'Bank Transfer' },
  { id: 'apple-pay', name: 'Apple Pay' },
  { id: 'auto-debit', name: 'Auto-Debit' },
];

const HistoryFormDialog = ({ open, onOpenChange, mode, transaction, onSave }: HistoryFormDialogProps) => {
  const [merchant, setMerchant] = useState('');
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [category, setCategory] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [notes, setNotes] = useState('');

  // Reset form when dialog opens or transaction changes
  useEffect(() => {
    if (open) {
      if (mode === 'edit' && transaction) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMerchant(transaction.merchant);
        setAmount(Math.abs(transaction.amount));
        setDate(new Date(transaction.date));
        setCategory(transaction.category.id);
        // Try to match payment method
        const matchedMethod = PAYMENT_METHODS.find(
          (m) => m.name.toLowerCase() === transaction.paymentMethod.toLowerCase() ||
                 m.id === transaction.paymentMethod.toLowerCase().replace(/\s/g, '-')
        );
        setPaymentMethod(matchedMethod?.id ?? 'cash');
        setNotes(transaction.notes ?? '');
      } else {
        setMerchant('');
        setAmount(0);
        setDate(new Date());
        setCategory('');
        setPaymentMethod('');
        setNotes('');
      }
    }
  }, [open, mode, transaction]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\./g, '');
    const num = parseInt(raw, 10);
    setAmount(isNaN(num) ? 0 : num);
  };

  const isValid = merchant.trim() !== '' && amount > 0 && date && category !== '' && paymentMethod !== '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || !date) return;

    onSave({
      merchant: merchant.trim(),
      amount,
      date: format(date, 'yyyy-MM-dd'),
      category,
      paymentMethod,
      notes: notes.trim(),
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'Add Transaction' : 'Edit Transaction'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'add'
              ? 'Enter transaction details manually'
              : 'Modify existing transaction details'}
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Merchant Name */}
          <div className="space-y-1.5">
            <Label htmlFor="form-merchant" className="text-xs font-medium text-muted-foreground">
              Merchant Name
            </Label>
            <div className="relative">
              <Store className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="form-merchant"
                placeholder="e.g. Indomaret Sudirman"
                className="pl-9"
                value={merchant}
                onChange={(e) => setMerchant(e.target.value)}
              />
            </div>
          </div>

          {/* Amount & Date */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="form-amount" className="text-xs font-medium text-muted-foreground">
                Amount (Rp)
              </Label>
              <div className="relative">
                <Banknote className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="form-amount"
                  inputMode="numeric"
                  placeholder="0"
                  className="pl-9"
                  value={amount > 0 ? formatRupiah(amount) : ''}
                  onChange={handleAmountChange}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start gap-2 font-normal">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    {date ? format(date, 'PPP') : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={date} onSelect={setDate} />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Category & Payment Method */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground">Payment Method</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  {PAYMENT_METHODS.map((method) => (
                    <SelectItem key={method.id} value={method.id}>
                      {method.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <Label htmlFor="form-notes" className="text-xs font-medium text-muted-foreground">
              Notes (optional)
            </Label>
            <Textarea
              id="form-notes"
              placeholder="Add notes for this transaction..."
              rows={3}
              className="resize-none"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!isValid} className="gap-2">
              {mode === 'add' ? 'Save Transaction' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default HistoryFormDialog;
