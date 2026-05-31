import { format, parseISO } from 'date-fns';
import type {
  DashboardApiData,
  DisplayTransaction,
  BudgetTrackingItem,
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

export function toBudgetItems(raw: DashboardApiData['budgets']): BudgetTrackingItem[] {
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
