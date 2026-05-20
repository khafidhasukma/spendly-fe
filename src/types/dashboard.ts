import type { LucideIcon } from 'lucide-react';

export interface BarData {
  month: string;
  value: number;
}

export interface WealthGrowthProps {
  percentage?: number;
  data?: BarData[];
}

export interface DisplayTransaction {
  id: string;
  merchant: string;
  datetime: string;
  amount: number;
  category: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

export interface RecentTransactionsProps {
  transactions?: DisplayTransaction[];
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
}

export interface BalanceCardProps {
  totalBalance?: number;
  income?: number;
  expense?: number;
  percentageChange?: number;
}

export interface AIInsightCardProps {
  title?: string;
  viewDetailsTo?: string;
}
