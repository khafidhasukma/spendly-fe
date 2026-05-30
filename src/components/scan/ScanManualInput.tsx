/* eslint-disable camelcase */
import { useState, useEffect, useMemo } from 'react';
import React from 'react';
import {
  Store,
  Banknote,
  CalendarDays,
  FileText,
  Loader2,
  ChevronDown,
  Check,
  Wallet,
  CreditCard,
  Building2,
  Smartphone,
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
import { cn } from '@/lib/utils';
import { getIconByName, hexTint } from '@/lib/category-icons';
import { categoriesApi, type ApiCategory } from '@/api/endpoints/categories';
import { walletsApi, type ApiWallet } from '@/api/endpoints/wallets';
import { transactionsApi } from '@/api/endpoints/transactions';

// ─── Wallet type → icon mapping ──────────────────────────────────────────────
const WALLET_ICON_MAP: Record<string, React.ElementType> = {
  cash: Banknote,
  debit: CreditCard,
  credit: CreditCard,
  bank: Building2,
  ewallet: Smartphone,
  'e-wallet': Smartphone,
  gopay: Smartphone,
  ovo: Smartphone,
  dana: Smartphone,
  shopeepay: Smartphone,
  savings: Wallet,
  investment: Building2,
};

function getWalletIcon(type: string): React.ElementType {
  const key = type?.toLowerCase().replace(/_/g, '');
  return WALLET_ICON_MAP[key] ?? Wallet;
}

// ─── Icon bubble helpers (render icon element, not component) ─────────────────
function renderCategoryIcon(cat: ApiCategory): React.ReactNode {
  const icon = getIconByName(cat.icon);
  return (
    <span
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md"
      style={{ background: hexTint(cat.color, 0.15) }}
    >
      {React.createElement(icon, { className: 'h-3.5 w-3.5', style: { color: cat.color } })}
    </span>
  );
}

function renderWalletIcon(wallet: ApiWallet): React.ReactNode {
  const icon = getWalletIcon(wallet.type);
  const color = wallet.color ?? '#6366f1';
  return (
    <span
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md"
      style={{ background: hexTint(color, 0.15) }}
    >
      {React.createElement(icon, { className: 'h-3.5 w-3.5', style: { color } })}
    </span>
  );
}

// ─── Reusable icon-select component ──────────────────────────────────────────
interface IconSelectOption {
  id: string;
  label: string;
  iconEl: React.ReactNode;
  meta?: string;
}

interface IconSelectProps {
  options: IconSelectOption[];
  value: string;
  onChange: (id: string) => void;
  placeholder: string;
  disabled?: boolean;
  loading?: boolean;
}

const IconSelect = ({ options, value, onChange, placeholder, disabled, loading }: IconSelectProps) => {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.id === value);

  return (
    <Popover open={open} onOpenChange={disabled ? undefined : setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          aria-expanded={open}
          className={cn(
            'flex h-12 w-full items-center justify-between gap-2 rounded-[0.75rem] border border-input bg-transparent px-3 text-sm transition-[color,box-shadow] outline-none',
            'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
            'disabled:cursor-not-allowed disabled:opacity-50',
            open && 'border-ring ring-[3px] ring-ring/50',
          )}
        >
          <span className="flex min-w-0 items-center gap-2">
            {loading ? (
              <Loader2 className="h-4 w-4 shrink-0 animate-spin text-muted-foreground" />
            ) : selected ? (
              <>
                {selected.iconEl}
                <span className="truncate text-foreground">{selected.label}</span>
                {selected.meta && (
                  <span className="shrink-0 text-[10px] text-muted-foreground">{selected.meta}</span>
                )}
              </>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </span>
          <ChevronDown className={cn('h-4 w-4 shrink-0 text-muted-foreground opacity-50 transition-transform', open && 'rotate-180')} />
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="w-(--radix-popover-trigger-width) p-1"
        align="start"
        sideOffset={4}
      >
        {options.length === 0 ? (
          <p className="px-3 py-2 text-xs text-muted-foreground">No options found</p>
        ) : (
          <ul className="max-h-56 overflow-y-auto">
            {options.map((opt) => (
              <li key={opt.id}>
                <button
                  type="button"
                  onClick={() => { onChange(opt.id); setOpen(false); }}
                  className={cn(
                    'flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground',
                    value === opt.id && 'bg-accent text-accent-foreground',
                  )}
                >
                  {opt.iconEl}
                  <span className="flex-1 truncate text-left">{opt.label}</span>
                  {opt.meta && (
                    <span className="shrink-0 text-[10px] text-muted-foreground">{opt.meta}</span>
                  )}
                  {value === opt.id && <Check className="h-3.5 w-3.5 shrink-0 text-primary" />}
                </button>
              </li>
            ))}
          </ul>
        )}
      </PopoverContent>
    </Popover>
  );
};

// ─── Form state (camelCase) ───────────────────────────────────────────────────
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

// ─── Main component ───────────────────────────────────────────────────────────
const ScanManualInput = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);

  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [wallets, setWallets] = useState<ApiWallet[]>([]);
  const [loadingMeta, setLoadingMeta] = useState(true);

  // Fetch categories (expense only) & wallets in parallel
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const [cats, walletData] = await Promise.all([
          categoriesApi.getAll('expense'),
          walletsApi.getAll(),
        ]);
        if (cancelled) return;
        setCategories(cats);
        setWallets(walletData.wallets);

        // Pre-select default wallet
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
    };
    load();
    return () => { cancelled = true; };
  }, []);

  // Build icon-select options — memoized to avoid re-rendering icons each render
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

      // Reset form but keep wallet selection
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
      {/* Header */}
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

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Merchant name */}
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

        {/* Amount + Date */}
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

        {/* Category + Wallet */}
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

        {/* Notes */}
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

        <Button
          type="submit"
          disabled={submitting || loadingMeta}
          className="w-full gap-2 bg-primary hover:bg-primary/90 sm:w-auto"
        >
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {submitting ? 'Saving...' : 'Save Transaction'}
        </Button>
      </form>
    </div>
  );
};

export default ScanManualInput;
