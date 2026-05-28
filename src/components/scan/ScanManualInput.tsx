import { useState } from 'react';
import {
  Store,
  Banknote,
  CalendarDays,
  FileText,
} from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
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
import { Separator } from '@/components/ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

const CATEGORIES = [
  'F&B', 'Shopping', 'Transport', 'Household',
  'Health', 'Beauty', 'Electricity', 'Groceries', 'Others',
];

const PAYMENT_METHODS = [
  'Cash', 'Debit Card', 'Credit Card',
  'GoPay', 'OVO', 'DANA', 'ShopeePay', 'Bank Transfer',
];

const formatRupiah = (n: number) => new Intl.NumberFormat('id-ID').format(n);

const ScanManualInput = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [amount, setAmount] = useState(0);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\./g, '');
    const num = parseInt(raw, 10);
    setAmount(isNaN(num) ? 0 : num);
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <FileText className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-foreground font-manrope">Manual Input</h3>
          <p className="text-xs text-muted-foreground">Add transaction details manually</p>
        </div>
      </div>

      <Separator className="my-5" />

      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success('Transaction saved successfully'); }}>
        <div className="space-y-1.5">
          <Label htmlFor="merchant" className="text-xs font-medium text-muted-foreground">
            Merchant Name
          </Label>
          <div className="relative">
            <Store className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="merchant" placeholder="e.g. Indomaret Sudirman" className="pl-9" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="amount" className="text-xs font-medium text-muted-foreground">
              Amount (Rp)
            </Label>
            <div className="relative">
              <Banknote className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="amount"
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
                <Button variant="outline" className="w-full text-sm md:text-base justify-start gap-2 font-normal border-border shadow-none py-0 bg-white h-12 rounded-[0.75rem]">
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-muted-foreground">Category</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-muted-foreground">Payment Method</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                {PAYMENT_METHODS.map((method) => (
                  <SelectItem key={method} value={method.toLowerCase().replace(/\s/g, '-')}>
                    {method}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="notes" className="text-xs font-medium text-muted-foreground">
            Notes (optional)
          </Label>
          <Textarea
            id="notes"
            placeholder="Add notes for this transaction..."
            rows={3}
            className="resize-none"
          />
        </div>

        <Button type="submit" className="w-full gap-2 bg-primary hover:bg-primary/90 sm:w-auto">
          Save
        </Button>
      </form>
    </div>
  );
};

export default ScanManualInput;
