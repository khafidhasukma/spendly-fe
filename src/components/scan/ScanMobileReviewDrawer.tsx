import { useState } from 'react';
import { Store, Banknote, CalendarDays, Tag, CreditCard, FileText } from 'lucide-react';
import { format } from 'date-fns';
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
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { formatRupiah } from '@/utils';

interface ReviewData {
  merchant: string;
  amount: number;
  date: string;
  category: string;
  paymentMethod: string;
  confidence: number;
}

interface ScanMobileReviewDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: ReviewData;
  onSave: () => void;
  onRetake: () => void;
}

const CATEGORIES = [
  'F&B', 'Shopping', 'Transport', 'Household',
  'Health', 'Beauty', 'Electricity', 'Groceries', 'Others',
];

const PAYMENT_METHODS = [
  'Cash', 'Debit - BCA', 'Debit - Mandiri', 'Credit Card',
  'GoPay', 'OVO', 'DANA', 'ShopeePay', 'Bank Transfer',
];

// Strip everything except digits
const stripNonDigits = (s: string) => s.replace(/\D/g, '');

const INPUT_CLASS = 'h-12 text-sm md:text-base bg-muted/30 border-border';
const LABEL_CLASS = 'text-sm font-medium text-muted-foreground';

const ScanMobileReviewDrawer = ({ open, onOpenChange, data, onSave, onRetake }: ScanMobileReviewDrawerProps) => {
  const [merchant, setMerchant] = useState(data.merchant);
  const [amount, setAmount] = useState(data.amount);
  const [amountDisplay, setAmountDisplay] = useState(
    data.amount > 0 ? `Rp${formatRupiah(data.amount)}` : '',
  );
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [category, setCategory] = useState(data.category.toLowerCase());
  const [paymentMethod, setPaymentMethod] = useState(
    data.paymentMethod.toLowerCase().replace(/\s/g, '-'),
  );
  const [notes, setNotes] = useState('');

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = stripNonDigits(e.target.value);
    const num = digits === '' ? 0 : parseInt(digits, 10);
    setAmount(num);
    setAmountDisplay(num > 0 ? `Rp${formatRupiah(num)}` : '');
  };

  // On focus: show raw number so user can type freely
  const handleAmountFocus = () => {
    setAmountDisplay(amount > 0 ? String(amount) : '');
  };

  // On blur: reformat back to Rp display
  const handleAmountBlur = () => {
    setAmountDisplay(amount > 0 ? `Rp${formatRupiah(amount)}` : '');
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="bottom" dismissible={false}>
      <DrawerContent className="max-h-[85vh] flex flex-col">
        {/* Scrollable form area */}
        <div className="flex-1 overflow-y-auto px-5">
          <DrawerHeader className="px-0 pt-2 pb-4">
            <DrawerTitle className="text-xl font-bold text-primary font-manrope">
              Review Receipt
            </DrawerTitle>
          </DrawerHeader>

          <div className="space-y-4 pb-4">
            {/* Merchant */}
            <div className="space-y-1.5">
              <Label className={LABEL_CLASS}>Merchant Name</Label>
              <div className="relative">
                <Store className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={merchant}
                  onChange={(e) => setMerchant(e.target.value)}
                  className={`pl-9 ${INPUT_CLASS}`}
                />
              </div>
            </div>

            {/* Amount */}
            <div className="space-y-1.5">
              <Label className={LABEL_CLASS}>Total Amount</Label>
              <div className="relative">
                <Banknote className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={amountDisplay}
                  onChange={handleAmountChange}
                  onFocus={handleAmountFocus}
                  onBlur={handleAmountBlur}
                  inputMode="numeric"
                  placeholder="Rp0"
                  className={`pl-9 font-semibold text-primary ${INPUT_CLASS}`}
                />
              </div>
            </div>

            {/* Date + Category */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className={LABEL_CLASS}>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start gap-2 font-normal bg-muted/30 border-border px-3 ${INPUT_CLASS}`}
                    >
                      <CalendarDays className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <span className="text-sm md:text-base truncate">
                        {date ? format(date, 'MMM d, yyyy') : 'Pick date'}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={date} onSelect={setDate} />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-1.5">
                <Label className={LABEL_CLASS}>Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className={`w-full bg-muted/30 px-3 ${INPUT_CLASS}`}>
                    <div className="flex items-center gap-2 min-w-0">
                      <Tag className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <SelectValue className="text-sm md:text-base" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat.toLowerCase()} className="text-sm md:text-base">
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-1.5">
              <Label className={LABEL_CLASS}>Payment Method</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger className={`w-full bg-muted/30 px-3 ${INPUT_CLASS}`}>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <SelectValue className="text-sm md:text-base" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {PAYMENT_METHODS.map((method) => (
                    <SelectItem
                      key={method}
                      value={method.toLowerCase().replace(/\s/g, '-')}
                      className="text-sm md:text-base"
                    >
                      {method}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Notes */}
            <div className="space-y-1.5">
              <Label className={LABEL_CLASS}>
                <span className="flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" />
                  Notes (optional)
                </span>
              </Label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes for this transaction..."
                rows={3}
                className="resize-none text-sm md:text-base bg-muted/30 border-border"
              />
            </div>
          </div>
        </div>

        {/* Sticky footer */}
        <DrawerFooter className="border-t border-border px-5 py-4">
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={onRetake}
              className="w-full h-12 gap-2 border-primary text-primary hover:bg-primary/5 text-sm md:text-base font-semibold rounded-full"
            >
              Cancel
            </Button>
            <Button
              onClick={onSave}
              className="w-full h-12 gap-2 bg-primary hover:bg-primary/90 text-sm md:text-base font-semibold rounded-full"
            >
              Save
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ScanMobileReviewDrawer;
