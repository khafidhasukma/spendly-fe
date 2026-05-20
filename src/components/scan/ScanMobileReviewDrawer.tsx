import { useState } from 'react';
import { Store, Banknote, CalendarDays, CheckCircle2, RotateCcw, Tag, CreditCard } from 'lucide-react';
import { format } from 'date-fns';
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer';

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

const formatRupiah = (n: number) => new Intl.NumberFormat('id-ID').format(n);

const ScanMobileReviewDrawer = ({ open, onOpenChange, data, onSave, onRetake }: ScanMobileReviewDrawerProps) => {
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
    <Drawer open={open} onOpenChange={() => {}} direction="bottom" dismissible={false}>
      <DrawerContent className="max-h-[85vh]">
        <div className="overflow-y-auto px-5 pb-6">
          <DrawerHeader className="px-0 pt-2 pb-4">
            <DrawerTitle className="text-2xl font-bold text-primary font-manrope">
              Review Receipt
            </DrawerTitle>
            <DrawerDescription>
              Not precise? Manual editing is enabled!
            </DrawerDescription>
          </DrawerHeader>

          <div className="space-y-4">
            {/* Merchant */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground">Merchant Name</Label>
              <div className="relative">
                <Store className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={merchant}
                  onChange={(e) => setMerchant(e.target.value)}
                  className="pl-9 bg-muted/30"
                />
              </div>
            </div>

            {/* Amount */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground">Total Amount</Label>
              <div className="relative">
                <Banknote className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={amount > 0 ? `Rp. ${formatRupiah(amount)}` : ''}
                  onChange={handleAmountChange}
                  inputMode="numeric"
                  className="pl-9 bg-muted/30 text-primary font-semibold"
                />
              </div>
            </div>

            {/* Date + Category */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-muted-foreground">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start gap-2 font-normal bg-muted/30 border-border">
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{date ? format(date, 'MMM d, yyyy') : 'Pick date'}</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={date} onSelect={setDate} />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-muted-foreground">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-full bg-muted/30">
                    <div className="flex items-center gap-2">
                      <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground">Payment Method</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger className="w-full bg-muted/30">
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

          {/* Actions */}
          <div className="mt-6 space-y-2.5">
            <Button onClick={onSave} className="w-full h-12 gap-2 bg-primary hover:bg-primary/90 text-base font-semibold rounded-xl">
              <CheckCircle2 className="h-4 w-4" />
              Save Transaction
            </Button>
            <Button
              variant="outline"
              onClick={onRetake}
              className="w-full h-12 gap-2 border-primary text-primary hover:bg-primary/5 text-base font-semibold rounded-xl"
            >
              <RotateCcw className="h-4 w-4" />
              Retake Photo
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ScanMobileReviewDrawer;
