/* eslint-disable camelcase */
import { useState, useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { categoriesApi, walletsApi, scansApi } from '@/api';
import type { ApiCategory, ApiWallet, ScanResult } from '@/types';

export interface ScanReviewForm {
  merchantName: string;
  amount: number;
  date: Date;
  categoryId: string;
  walletId: string;
  notes: string;
}

interface UseScanReviewArgs {
  scanId: string;
  scanResult: ScanResult | null;
  onSaved: () => void;
}

export function useScanReview({ scanId, scanResult, onSaved }: UseScanReviewArgs) {
  const [form, setForm] = useState<ScanReviewForm>(() => buildInitialForm(scanResult));

  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [wallets, setWallets] = useState<ApiWallet[]>([]);
  const [loadingMeta, setLoadingMeta] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setForm(buildInitialForm(scanResult));
  }, [scanResult]);

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

        setForm((prev) => {
          const next = { ...prev };
          if (!next.categoryId && scanResult?.suggested_category_id) {
            next.categoryId = scanResult.suggested_category_id;
          }
          if (!next.walletId) {
            const def = walletData.wallets.find((w) => w.is_default) ?? walletData.wallets[0];
            if (def) next.walletId = def.id;
          }
          return next;
        });
      } catch {
        if (!cancelled) toast.error('Failed to load categories and wallets');
      } finally {
        if (!cancelled) setLoadingMeta(false);
      }
    })();
    return () => { cancelled = true; };
  }, [scanResult]);

  const setField = <K extends keyof ScanReviewForm>(key: K, value: ScanReviewForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validate = (): string | null => {
    if (!form.merchantName.trim()) return 'Merchant name is required';
    if (form.amount <= 0) return 'Amount must be greater than 0';
    if (!form.categoryId) return 'Please select a category';
    if (!form.walletId) return 'Please select a wallet';
    return null;
  };

  const handleConfirm = async () => {
    const error = validate();
    if (error) { toast.error(error); return; }

    setSubmitting(true);
    try {
      await scansApi.confirm(scanId, {
        merchant_name: form.merchantName.trim(),
        total_amount: form.amount,
        category_id: form.categoryId,
        wallet_id: form.walletId,
        date: format(form.date, 'yyyy-MM-dd'),
        notes: form.notes.trim() || undefined,
      });
      toast.success('Transaction saved successfully');
      onSaved();
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Failed to save transaction. Please try again.';
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const confidence = useMemo(() => {
    if (!scanResult) return 0;
    return Math.round((scanResult.confidence_score ?? 0) * 100);
  }, [scanResult]);

  return {
    form,
    setField,
    categories,
    wallets,
    loadingMeta,
    submitting,
    confidence,
    handleConfirm,
  };
}

function buildInitialForm(scanResult: ScanResult | null): ScanReviewForm {
  const today = new Date();
  if (!scanResult) {
    return {
      merchantName: '',
      amount: 0,
      date: today,
      categoryId: '',
      walletId: '',
      notes: '',
    };
  }

  const scanDate = scanResult.scan_date ? safeParseDate(scanResult.scan_date) : today;

  return {
    merchantName: scanResult.merchant_name ?? '',
    amount: scanResult.total_amount ?? 0,
    date: scanDate,
    categoryId: scanResult.suggested_category_id ?? '',
    walletId: '',
    notes: '',
  };
}

function safeParseDate(input: string): Date {
  const d = new Date(input);
  return isNaN(d.getTime()) ? new Date() : d;
}
