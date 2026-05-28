import { useState } from 'react';
import { Sparkles, CreditCard, Tag, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

interface ExtractionData {
  merchant: string;
  amount: number;
  date: string;
  category: string;
  paymentMethod: string;
  confidence: number;
}

interface ScanExtractionResultProps {
  data: ExtractionData;
  onSave: () => void;
  onDiscard: () => void;
}

const CATEGORIES = [
  'F&B', 'Shopping', 'Transport', 'Household',
  'Health', 'Beauty', 'Electricity', 'Groceries', 'Others',
];

const PAYMENT_METHODS = [
  'Cash', 'Debit - BCA', 'Debit - Mandiri', 'Credit Card',
  'GoPay', 'OVO', 'DANA', 'ShopeePay', 'Bank Transfer',
];

const formatRupiah = (n: number) => new Intl.NumberFormat('id-ID').format(n);

const ScanExtractionResult = ({ data, onSave, onDiscard }: ScanExtractionResultProps) => {
  const [merchant, setMerchant] = useState(data.merchant);
  const [amount, setAmount] = useState(data.amount);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [category, setCategory] = useState(data.category.toLowerCase());
  const [paymentMethod, setPaymentMethod] = useState(
    data.paymentMethod.toLowerCase().replace(/\s/g, '-'),
  );

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\./g, '');
    const num = parseInt(raw, 10);
    setAmount(isNaN(num) ? 0 : num);
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-semibold text-foreground font-manrope">Extraction Result</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">Verify and edit details before saving.</p>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
          <Sparkles className="h-3 w-3" />
          AI
        </span>
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-lg bg-primary-container/50 p-3">
        <Tag className="h-4 w-4 text-primary" />
        <div>
          <p className="text-xs text-muted-foreground">Smart Suggestion</p>
          <p className="text-sm font-semibold text-foreground">{data.category}</p>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Merchant Name</Label>
          <Input value={merchant} onChange={(e) => setMerchant(e.target.value)} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Total Amount</Label>
            <Input
              value={formatRupiah(amount)}
              onChange={handleAmountChange}
              inputMode="numeric"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start gap-2 font-normal h-12 border-border bg-white shadow-none rounded-[0.75rem] py-0">
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

        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Payment Method</Label>
          <Select value={paymentMethod} onValueChange={setPaymentMethod}>
            <SelectTrigger className="w-full">
              <div className="flex items-center gap-2">
                <CreditCard className="h-3.5 w-3.5 text-muted-foreground" />
                <SelectValue />
              </div>
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

      <Separator className="my-5" />

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total Amount</span>
          <span className="text-base font-bold text-foreground">Rp {formatRupiah(amount)}</span>
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <Button onClick={onSave} className="w-full gap-2 bg-primary hover:bg-primary/90 h-auto! py-2.5">
          Save Transaction
        </Button>
        <button
          type="button"
          onClick={onDiscard}
          className="w-full py-2 text-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Discard Scan
        </button>
      </div>
    </div>
  );
};

export default ScanExtractionResult;
