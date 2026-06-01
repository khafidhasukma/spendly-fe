/* eslint-disable camelcase */
import { useState, useEffect, useMemo } from 'react';
import {
  Store,
  Banknote,
  CalendarDays,
  Loader2,
} from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { categoriesApi, walletsApi, transactionsApi } from '@/api';
import type { ApiCategory, ApiWallet } from '@/types';
import IconSelect, { type IconSelectOption } from './IconSelect';
import { renderCategoryIcon, renderWalletIcon } from './scan-icons';

interface FormState {
  merchantName: string;
  amount: number;
  categoryId: string;
  walletId: string;
  notes: string;
}

const INITIAL_FORM: FormState = {
  merchantName: '',
  amount: 0,
  categoryId: '',
  walletId: '',
  notes: '',
};

const ScanManualInput = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);

  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [wallets, setWallets] = useState<ApiWallet[]>([]);
  const [loadingMeta, setLoadingMeta] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [cats, walletData] = await Promise.all([
          categoriesApi.getAll('expense'),
          walletsApi.getAll(),
        ]);
        if (cancelled) return;
        setCategories(cats);
        setWallets(walletData.wallets);

        const defaultWallet =
          walletData.wallets.find((w) => w.is_default) ?? walletData.wallets[0];
        if (defaultWallet) {
          setForm((prev) => ({ ...prev, walletId: defaultWallet.id }));
        }
      } catch {
        if (!cancelled) toast.error('Failed to load categories and wallets');
      } finally {
        if (!cancelled) setLoadingMeta(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

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

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d]/g, '');
    const num = parseInt(raw, 10);
    setForm((prev) => ({ ...prev, amount: isNaN(num) ? 0 : num }));
  };

  const validate = (): string | null => {
    if (!form.merchantName.trim()) return 'Merchant name is required';
    if (form.amount <= 0) return 'Amount must be greater than 0';
    if (!form.categoryId) return 'Please select a category';
    if (!form.walletId) return 'Please select a wallet';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validate();
    if (error) { toast.error(error); return; }

    setSubmitting(true);
    try {
      await transactionsApi.create({
        type: 'expense',
        amount: form.amount,
        merchant_name: form.merchantName.trim(),
        category_id: form.categoryId,
        wallet_id: form.walletId,
        date: format(date, 'yyyy-MM-dd'),
        notes: form.notes.trim() || undefined,
      });

      toast.success('Transaction saved successfully');
      setForm((prev) => ({ ...INITIAL_FORM, walletId: prev.walletId }));
      setDate(new Date());
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Failed to save transaction. Please try again.';
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
      <h3 className="text-base font-semibold text-foreground font-manrope">Manual Input</h3>
      <p className="text-xs text-muted-foreground">Add transaction details manually</p>

      <Separator className="my-5" />

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-1.5">
          <Label htmlFor="merchant" className="text-xs font-medium text-muted-foreground">
            Merchant Name
          </Label>
          <div className="relative">
            <Store className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="merchant"
              placeholder="e.g. Indomaret Sudirman"
              className="pl-9"
              value={form.merchantName}
              onChange={(e) => setForm((prev) => ({ ...prev, merchantName: e.target.value }))}
            />
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
                value={form.amount > 0 ? form.amount.toLocaleString('id-ID') : ''}
                onChange={handleAmountChange}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-muted-foreground">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 font-normal border-border shadow-none bg-transparent h-12 rounded-[0.75rem] text-sm"
                >
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-muted-foreground">Category</Label>
            <IconSelect
              options={categoryOptions}
              value={form.categoryId}
              onChange={(v) => setForm((prev) => ({ ...prev, categoryId: v }))}
              placeholder="Select category"
              disabled={loadingMeta}
              loading={loadingMeta}
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-muted-foreground">Wallet</Label>
            <IconSelect
              options={walletOptions}
              value={form.walletId}
              onChange={(v) => setForm((prev) => ({ ...prev, walletId: v }))}
              placeholder="Select wallet"
              disabled={loadingMeta}
              loading={loadingMeta}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="notes" className="text-xs font-medium text-muted-foreground">
            Notes <span className="text-muted-foreground/60">(optional)</span>
          </Label>
          <Textarea
            id="notes"
            placeholder="Add notes for this transaction..."
            rows={3}
            className="resize-none"
            value={form.notes}
            onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
          />
        </div>

        <div className="text-end mt-8">
          <Button
            type="submit"
            disabled={submitting || loadingMeta}
            className="w-full gap-2 bg-primary hover:bg-primary/90 sm:w-auto py-2.5 px-5 h-auto"
          >
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {submitting ? 'Saving...' : 'Save Transaction'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ScanManualInput;
