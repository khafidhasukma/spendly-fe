import type { LucideIcon } from 'lucide-react';

export interface BarData {
  month: string;
  value: number;
}

export interface WealthGrowthProps {
  percentage?: number;
  data?: BarData[];
}

// category icon is an emoji string from the API
export interface DisplayTransaction {
  id: string;
  merchant: string;
  datetime: string;
  amount: number;
  categoryName: string;
  categoryEmoji: string;
  categoryColor: string;
  type: string;
}

export interface RecentTransactionsProps {
  transactions?: DisplayTransaction[];
  isLoading?: boolean;
}

export interface QuickCategory {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

export interface DashboardGreetingProps {
  name?: string;
}

export interface BudgetItem {
  label: string;
  limit: number;
  spent: number;
}

export interface BudgetTrackingProps {
  budgets?: BudgetItem[];
  isLoading?: boolean;
}

export interface BalanceCardProps {
  totalBalance?: number;
  income?: number;
  expense?: number;
  incomeChangePct?: number;
  expenseChangePct?: number;
  isLoading?: boolean;
}

export interface AIInsightCardProps {
  title?: string;
  viewDetailsTo?: string;
}

// --- API response types (matches actual backend shape) ---

export interface DashboardBalance {
  total: string;
  income: string;
  expense: string;
  income_change_pct: number;
  expense_change_pct: number;
  transaction_count: number;
}

export interface DashboardTransaction {
  id: string;
  type: 'income' | 'expense' | 'transfer';
  amount: string;
  merchant_name: string;
  date: string;
  category_name: string | null;
  category_icon: string | null;
  category_color: string | null;
}

export interface DashboardBudget {
  id: string;
  name: string;
  amount: string;
  spent: string;
  percentage: string;
}

export interface DashboardWealthPoint {
  month: string;
  period: string;
  net: string;
}

export interface DashboardApiData {
  balance: DashboardBalance;
  recent_transactions: DashboardTransaction[];
  budgets: DashboardBudget[];
  wealth_growth: DashboardWealthPoint[];
}

export interface DashboardApiResponse {
  success: boolean;
  message: string;
  data: DashboardApiData;
}
