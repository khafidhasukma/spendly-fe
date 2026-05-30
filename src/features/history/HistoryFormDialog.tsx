/* eslint-disable camelcase */
import { useEffect, useReducer, useState } from 'react';
import { format } from 'date-fns';
import { Store, Banknote, CalendarDays } from 'lucide-react';
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
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { formatRupiah } from '@/utils';
import { getIconByName } from '@/lib/category-icons';
import { transactionsApi, categoriesApi, walletsApi } from '@/api';
import type { ApiCategory } from '@/api/endpoints/categories';
import type { ApiWallet } from '@/api/endpoints/wallets';
import type { TransactionItem } from '@/types';

type FormMode = 'add' | 'edit';
type TxType = 'expense' | 'income';

interface FormState {
  txType: TxType;
  merchant: string;
  amountRaw: string;
  amountDisplay: string;
  date: Date | undefined;
  categoryId: string;
  walletId: string;
  notes: string;
}

type FormAction =
  | { type: 'RESET' }
  | { type: 'PREFILL'; payload: FormState }
  | { type: 'SET_TX_TYPE'; value: TxType }
  | { type: 'SET_MERCHANT'; value: string }
  | { type: 'SET_AMOUNT_RAW'; value: string }
  | { type: 'SET_AMOUNT_DISPLAY'; value: string }
  | { type: 'SET_DATE'; value: Date | undefined }
  | { type: 'SET_CATEGORY'; value: string }
  | { type: 'SET_WALLET'; value: string }
  | { type: 'SET_NOTES'; value: string };

const EMPTY: FormState = {
  txType: 'expense',
  merchant: '',
  amountRaw: '',
  amountDisplay: '',
  date: new Date(),
  categoryId: '',
  walletId: '',
  notes: '',
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
  case 'RESET': return { ...EMPTY, date: new Date() };
  case 'PREFILL': return action.payload;
  case 'SET_TX_TYPE': return { ...state, txType: action.value, categoryId: '' };
  case 'SET_MERCHANT': return { ...state, merchant: action.value };
  case 'SET_AMOUNT_RAW': return { ...state, amountRaw: action.value };
  case 'SET_AMOUNT_DISPLAY': return { ...state, amountDisplay: action.value };
  case 'SET_DATE': return { ...state, date: action.value };
  case 'SET_CATEGORY': return { ...state, categoryId: action.value };
  case 'SET_WALLET': return { ...state, walletId: action.value };
  case 'SET_NOTES': return { ...state, notes: action.value };
  default: return state;
  }
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: FormMode;
  editTarget?: TransactionItem;
  onSuccess: () => void;
}

const HistoryFormDialog = ({ open, onOpenChange, mode, editTarget, onSuccess }: Props) => {
  const isEdit = mode === 'edit';

  const [form, dispatch] = useReducer(formReducer, { ...EMPTY, date: new Date() });
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [wallets, setWallets] = useState<ApiWallet[]>([]);

  // Pre-fill or reset when dialog opens
  useEffect(() => {
    if (!open) return;
    if (isEdit && editTarget) {
      const parsed = Math.round(parseFloat(editTarget.amount));
      dispatch({
        type: 'PREFILL',
        payload: {
          txType: (editTarget.type as TxType) ?? 'expense',
          merchant: editTarget.merchant_name,
          amountRaw: String(parsed),
          amountDisplay: formatRupiah(parsed),
          date: new Date(editTarget.date),
          categoryId: editTarget.category_id,
          walletId: editTarget.wallet_id,
          notes: editTarget.notes ?? '',
        },
      });
    } else {
      dispatch({ type: 'RESET' });
    }
  }, [open, isEdit, editTarget]);

  // Load wallets once when dialog opens
  useEffect(() => {
    if (!open) return;
    walletsApi.getAll()
      .then((result) => setWallets(Array.isArray(result.wallets) ? result.wallets : []))
      .catch(() => { setWallets([]); });
  }, [open]);

  // Reload categories when type changes
  useEffect(() => {
    if (!open) return;
    categoriesApi.getAll(form.txType)
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch(() => { setCategories([]); });
  }, [open, form.txType]);

  const amountNum = parseInt(form.amountRaw || '0', 10) || 0;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '');
    dispatch({ type: 'SET_AMOUNT_RAW', value: digits });
  };

  const handleAmountFocus = () => {
    setIsFocused(true);
  };

  const handleAmountBlur = () => {
    setIsFocused(false);
    const num = parseInt(form.amountRaw || '0', 10) || 0;
    dispatch({ type: 'SET_AMOUNT_DISPLAY', value: num > 0 ? formatRupiah(num) : '' });
  };

  const isValid = form.merchant.trim() !== '' && amountNum > 0 && !!form.date && form.categoryId !== '' && form.walletId !== '';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid || !form.date) return;

    setIsSubmitting(true);
    try {
      const dateStr = format(form.date, 'yyyy-MM-dd');
      const notesVal = form.notes.trim() || undefined;

      if (isEdit && editTarget) {
        await transactionsApi.update(editTarget.id, {
          type: form.txType,
          amount: amountNum,
          merchant_name: form.merchant.trim(),
          category_id: form.categoryId,
          wallet_id: form.walletId,
          date: dateStr,
          notes: notesVal,
        });
        toast.success('Transaction updated');
      } else {
        await transactionsApi.create({
          type: form.txType,
          amount: amountNum,
          merchant_name: form.merchant.trim(),
          category_id: form.categoryId,
          wallet_id: form.walletId,
          date: dateStr,
          notes: notesVal,
        });
        toast.success('Transaction added');
      }

      onSuccess();
      onOpenChange(false);
    } catch {
      toast.error(isEdit ? 'Failed to update transaction' : 'Failed to add transaction');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Transaction' : 'Add Transaction'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Modify existing transaction details' : 'Record a new transaction'}
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isEdit && (
            <div className="flex rounded-lg border border-border p-1 gap-1">
              <button
                type="button"
                onClick={() => dispatch({ type: 'SET_TX_TYPE', value: 'expense' })}
                className={cn(
                  'flex-1 rounded-md py-2 text-sm font-semibold transition-colors',
                  form.txType === 'expense'
                    ? 'bg-destructive text-destructive-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                Expense
              </button>
              <button
                type="button"
                onClick={() => dispatch({ type: 'SET_TX_TYPE', value: 'income' })}
                className={cn(
                  'flex-1 rounded-md py-2 text-sm font-semibold transition-colors',
                  form.txType === 'income'
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                Income
              </button>
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="form-merchant" className="text-xs font-medium text-muted-foreground">
              {form.txType === 'income' ? 'Source' : 'Merchant Name'}
            </Label>
            <div className="relative">
              <Store className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="form-merchant"
                placeholder={form.txType === 'income' ? 'e.g. Salary Deposit' : 'e.g. Indomaret Sudirman'}
                className="pl-9"
                value={form.merchant}
                onChange={(e) => dispatch({ type: 'SET_MERCHANT', value: e.target.value })}
              />
            </div>
          </div>

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
                  value={isFocused ? form.amountRaw : form.amountDisplay}
                  onChange={handleAmountChange}
                  onFocus={handleAmountFocus}
                  onBlur={handleAmountBlur}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start gap-2 font-normal h-12 rounded-[0.75rem]">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    {form.date ? format(form.date, 'PPP') : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={form.date}
                    onSelect={(d) => dispatch({ type: 'SET_DATE', value: d })}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground">Category</Label>
              <Select value={form.categoryId} onValueChange={(v) => dispatch({ type: 'SET_CATEGORY', value: v })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => {
                    const CatIcon = getIconByName(cat.icon);
                    return (
                      <SelectItem key={cat.id} value={cat.id}>
                        <span className="flex items-center gap-2">
                          <CatIcon className="h-4 w-4" style={{ color: cat.color }} />
                          <span>{cat.name}</span>
                        </span>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground">Wallet</Label>
              <Select value={form.walletId} onValueChange={(v) => dispatch({ type: 'SET_WALLET', value: v })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select wallet" />
                </SelectTrigger>
                <SelectContent>
                  {wallets.map((w) => (
                    <SelectItem key={w.id} value={w.id}>
                      {w.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="form-notes" className="text-xs font-medium text-muted-foreground">
              Notes (optional)
            </Label>
            <Textarea
              id="form-notes"
              placeholder="Add notes for this transaction..."
              rows={3}
              className="resize-none"
              value={form.notes}
              onChange={(e) => dispatch({ type: 'SET_NOTES', value: e.target.value })}
            />
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? 'Saving...' : isEdit ? 'Save Changes' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default HistoryFormDialog;
