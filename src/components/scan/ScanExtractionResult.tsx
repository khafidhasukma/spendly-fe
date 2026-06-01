import { useMemo } from 'react';
import { Sparkles, Tag, CalendarDays, Loader2, Banknote, Store, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import IconSelect, { type IconSelectOption } from './IconSelect';
import { renderCategoryIcon, renderWalletIcon } from './scan-icons';
import { useScanReview } from './useScanReview';
import type { ScanResult } from '@/types';

interface ScanExtractionResultProps {
  scanId: string;
  scanResult: ScanResult | null;
  onSave: () => void;
  onDiscard: () => void;
}

const ScanExtractionResult = ({ scanId, scanResult, onSave, onDiscard }: ScanExtractionResultProps) => {
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

  const suggestedName = scanResult?.suggested_category_name;
  const isFailed = scanResult?.status === 'failed';

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d]/g, '');
    const num = parseInt(raw, 10);
    setField('amount', isNaN(num) ? 0 : num);
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-semibold text-foreground font-manrope">Extraction Result</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {isFailed
              ? 'AI could not extract data. Please fill in manually.'
              : 'Verify and edit details before saving.'}
          </p>
        </div>
        {!isFailed && (
          <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3 w-3" />
            AI
          </span>
        )}
      </div>

      {/* Suggested category banner */}
      {suggestedName && !isFailed && (
        <div className="mt-4 flex items-center gap-3 rounded-lg bg-primary/5 border border-primary/15 p-3">
          <Tag className="h-4 w-4 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Smart Suggestion</p>
            <p className="text-sm font-semibold text-foreground">{suggestedName}</p>
          </div>
        </div>
      )}

      {/* Form */}
      <div className="mt-5 space-y-4">
        {/* Merchant */}
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Merchant Name</Label>
          <div className="relative">
            <Store className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-9"
              value={form.merchantName}
              onChange={(e) => setField('merchantName', e.target.value)}
              placeholder="e.g. Indomaret"
            />
          </div>
        </div>

        {/* Amount + Date */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Total Amount (Rp)</Label>
            <div className="relative">
              <Banknote className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                value={form.amount > 0 ? form.amount.toLocaleString('id-ID') : ''}
                onChange={handleAmountChange}
                inputMode="numeric"
                placeholder="0"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 font-normal h-12 border-border bg-transparent shadow-none rounded-[0.75rem] text-sm"
                >
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  {format(form.date, 'PPP')}
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
        </div>

        {/* Category */}
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Category</Label>
          <IconSelect
            options={categoryOptions}
            value={form.categoryId}
            onChange={(v) => setField('categoryId', v)}
            placeholder="Select category"
            disabled={loadingMeta}
            loading={loadingMeta}
          />
        </div>

        {/* Wallet */}
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Wallet</Label>
          <IconSelect
            options={walletOptions}
            value={form.walletId}
            onChange={(v) => setField('walletId', v)}
            placeholder="Select wallet"
            disabled={loadingMeta}
            loading={loadingMeta}
          />
        </div>

        {/* Notes */}
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5" />
              Notes (optional)
            </span>
          </Label>
          <Textarea
            value={form.notes}
            onChange={(e) => setField('notes', e.target.value)}
            placeholder="Add notes..."
            rows={2}
            className="resize-none"
          />
        </div>
      </div>

      <Separator className="my-5" />

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total Amount</span>
          <span className="text-base font-bold text-foreground">
            Rp {form.amount.toLocaleString('id-ID')}
          </span>
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <Button
          onClick={handleConfirm}
          disabled={submitting || loadingMeta}
          className="w-full gap-2 bg-primary hover:bg-primary/90 h-auto! py-2.5"
        >
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {submitting ? 'Saving...' : 'Save Transaction'}
        </Button>
        <button
          type="button"
          onClick={onDiscard}
          disabled={submitting}
          className="w-full py-2 text-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
        >
          Discard Scan
        </button>
      </div>
    </div>
  );
};

export default ScanExtractionResult;
