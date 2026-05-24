import type { LucideIcon } from 'lucide-react';

export interface BudgetCategory {
  id: string;
  label: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  limit: number;
  spent: number;
}

export interface BudgetOverview {
  totalLimit: number;
  totalSpent: number;
  totalRemaining: number;
  percentageUsed: number;
}

export interface BudgetHistoryItem {
  month: string;
  limit: number;
  spent: number;
}

export interface AddBudgetFormData {
  category: string;
  limit: number;
}
