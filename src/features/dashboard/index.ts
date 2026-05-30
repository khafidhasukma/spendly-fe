import { useState, useEffect, useCallback, useReducer } from 'react';
import { format, parseISO } from 'date-fns';
import { dashboardApi } from '@/api';
import type {
  DashboardApiData,
  DisplayTransaction,
  BudgetItem,
  BarData,
} from '@/types/dashboard';

function formatDatetime(dateStr: string): string {
  try {
    const date = parseISO(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return `Today • ${format(date, 'h:mm a')}`;
    }
    if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday • ${format(date, 'h:mm a')}`;
    }
    return format(date, 'MMM d • h:mm a');
  } catch {
    return dateStr;
  }
}

// --- fetch reducer ---

type FetchState<T> =
  | { status: 'loading'; data: null; error: null }
  | { status: 'success'; data: T; error: null }
  | { status: 'error'; data: null; error: string };

type FetchAction<T> =
  | { type: 'LOADING' }
  | { type: 'SUCCESS'; payload: T }
  | { type: 'ERROR'; payload: string };

function fetchReducer<T>(state: FetchState<T>, action: FetchAction<T>): FetchState<T> {
  switch (action.type) {
  case 'LOADING': return { status: 'loading', data: null, error: null };
  case 'SUCCESS': return { status: 'success', data: action.payload, error: null };
  case 'ERROR':   return { status: 'error', data: null, error: action.payload };
  default: return state;
  }
}

// --- hook ---

export interface DashboardState {
  data: DashboardApiData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useDashboard(): DashboardState {
  const [tick, setTick] = useState(0);
  const [state, dispatch] = useReducer(
    fetchReducer<DashboardApiData>,
    { status: 'loading', data: null, error: null },
  );

  useEffect(() => {
    let cancelled = false;
    dispatch({ type: 'LOADING' });
    dashboardApi.getDashboard()
      .then((result) => { if (!cancelled) dispatch({ type: 'SUCCESS', payload: result }); })
      .catch(() => { if (!cancelled) dispatch({ type: 'ERROR', payload: 'Failed to load dashboard data.' }); });
    return () => { cancelled = true; };
  }, [tick]);

  const refetch = useCallback(() => setTick((t) => t + 1), []);

  return {
    data: state.data,
    isLoading: state.status === 'loading',
    error: state.error,
    refetch,
  };
}

// --- transform helpers ---

export function toDisplayTransactions(
  raw: DashboardApiData['recent_transactions'],
): DisplayTransaction[] {
  return raw.map((tx) => ({
    id: tx.id,
    merchant: tx.merchant_name,
    datetime: formatDatetime(tx.date),
    amount: tx.type === 'expense'
      ? -Math.abs(parseFloat(tx.amount))
      : Math.abs(parseFloat(tx.amount)),
    categoryName: tx.category_name?.toUpperCase() ?? tx.type.toUpperCase(),
    categoryIcon: tx.category_icon ?? 'LayoutGrid',
    categoryColor: tx.category_color ?? '#6B7280',
    type: tx.type,
  }));
}

export function toBudgetItems(raw: DashboardApiData['budgets']): BudgetItem[] {
  return raw.map((b) => ({
    label: b.name,
    limit: parseFloat(b.amount),
    spent: parseFloat(b.spent),
  }));
}

export function toBarData(raw: DashboardApiData['wealth_growth']): BarData[] {
  return raw.map((w) => ({
    month: w.month,
    value: parseFloat(w.net),
  }));
}
