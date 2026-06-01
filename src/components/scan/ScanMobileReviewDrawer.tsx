import { useMemo } from 'react';
import {
  Store,
  Banknote,
  CalendarDays,
  FileText,
  Sparkles,
  Tag,
  Loader2,
} from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import IconSelect, { type IconSelectOption } from './IconSelect';
import { renderCategoryIcon, renderWalletIcon } from './scan-icons';
import { useScanReview } from './useScanReview';
import type { ScanResult } from '@/types';

interface ScanMobileReviewDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scanId: string;
  scanResult: ScanResult | null;
  onSave: () => void;
  onRetake: () => void;
}

const LABEL_CLASS = 'text-sm font-medium text-muted-foreground';
const INPUT_CLASS = 'h-12 text-sm bg-muted/30 border-border';

const ScanMobileReviewDrawer = ({
  open,
  onOpenChange,
  scanId,
  scanResult,
  onSave,
  onRetake,
}: ScanMobileReviewDrawerProps) => {
  const {
    form,
    setField,
    categories,
    wallets,
    loadingMeta,
    submitting,
    handleConfirm,
  } = useScanReview({ scanId, scanResult, onSaved: onSave });

  const categoryOptions: IconSelectOption[] = useMemo(
    () => categories.map((cat) => ({
      id: cat.id,
      label: cat.name,
      iconEl: renderCategoryIcon(cat),
    })),
    [categories],
  );

  const walletOptions: IconSelectOption[] = useMemo(
    () => wallets.map((w) => ({
      id: w.id,
      label: w.name,
      iconEl: renderWalletIcon(w),
      meta: w.is_default ? '(default)' : undefined,
    })),
    [wallets],
  );

  const isFailed = scanResult?.status === 'failed';
  const suggestedName = scanResult?.suggested_category_name;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d]/g, '');
    const num = parseInt(raw, 10);
    setField('amount', isNaN(num) ? 0 : num);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="bottom" dismissible={false}>
      <DrawerContent className="max-h-[85vh] flex flex-col">
        {/* Scrollable form area */}
        <div className="flex-1 overflow-y-auto px-5">
          <DrawerHeader className="px-0 pt-2 pb-4">
            <div className="flex items-center justify-between">
              <DrawerTitle className="text-xl font-bold text-primary font-manrope">
                Review Receipt
              </DrawerTitle>
              {!isFailed && (
                <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary">
                  <Sparkles className="h-3 w-3" />
                  AI
                </span>
              )}
            </div>
          </DrawerHeader>

          <div className="space-y-4 pb-4">
            {/* Suggested category banner */}
            {suggestedName && !isFailed && (
              <div className="flex items-center gap-3 rounded-lg bg-primary/5 border border-primary/15 p-3">
                <Tag className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-[11px] text-muted-foreground">Smart Suggestion</p>
                  <p className="text-sm font-semibold text-foreground">{suggestedName}</p>
                </div>
              </div>
            )}

            {isFailed && (
              <div className="rounded-lg bg-amber-500/10 border border-amber-500/30 p-3">
                <p className="text-xs text-amber-700 dark:text-amber-400">
                  AI could not extract data automatically. Please fill in the details manually.
                </p>
              </div>
            )}

            {/* Merchant */}
            <div className="space-y-1.5">
              <Label className={LABEL_CLASS}>Merchant Name</Label>
              <div className="relative">
                <Store className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={form.merchantName}
                  onChange={(e) => setField('merchantName', e.target.value)}
                  placeholder="e.g. Indomaret"
                  className={`pl-9 ${INPUT_CLASS}`}
                />
              </div>
            </div>

            {/* Amount */}
            <div className="space-y-1.5">
              <Label className={LABEL_CLASS}>Total Amount (Rp)</Label>
              <div className="relative">
                <Banknote className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={form.amount > 0 ? form.amount.toLocaleString('id-ID') : ''}
                  onChange={handleAmountChange}
                  inputMode="numeric"
                  placeholder="0"
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
                      <span className="text-sm truncate">{format(form.date, 'MMM d, yyyy')}</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={form.date}
                      onSelect={(d) => d && setField('date', d)}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-1.5">
                <Label className={LABEL_CLASS}>Category</Label>
                <IconSelect
                  options={categoryOptions}
                  value={form.categoryId}
                  onChange={(v) => setField('categoryId', v)}
                  placeholder="Select"
                  disabled={loadingMeta}
                  loading={loadingMeta}
                  className="bg-muted/30"
                />
              </div>
            </div>

            {/* Wallet */}
            <div className="space-y-1.5">
              <Label className={LABEL_CLASS}>Wallet</Label>
              <IconSelect
                options={walletOptions}
                value={form.walletId}
                onChange={(v) => setField('walletId', v)}
                placeholder="Select wallet"
                disabled={loadingMeta}
                loading={loadingMeta}
                className="bg-muted/30"
              />
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
                value={form.notes}
                onChange={(e) => setField('notes', e.target.value)}
                placeholder="Add notes for this transaction..."
                rows={3}
                className="resize-none text-sm bg-muted/30 border-border"
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
              disabled={submitting}
              className="w-full h-12 gap-2 border-primary text-primary hover:bg-primary/5 text-sm font-semibold rounded-full"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={submitting || loadingMeta}
              className="w-full h-12 gap-2 bg-primary hover:bg-primary/90 text-sm font-semibold rounded-full"
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {submitting ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ScanMobileReviewDrawer;
