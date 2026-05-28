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

export interface BudgetHistoryItem {
  month: string;
  limit: number;
  spent: number;
}

export interface BudgetItem {
  id: string;
  user_id: string;
  category_id: string;
  name: string;
  amount: string;
  period: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  category_name: string;
  category_icon: string;
  category_color: string;
  spent: string;
  percentage_used: string;
  remaining: number;
  is_exceeded: boolean;
  status: 'healthy' | 'warning' | 'exceeded';
}

export interface BudgetListResponse {
  success: boolean;
  message: string;
  data: BudgetItem[];
}

export interface BudgetPayload {
  name: string;
  category_id: string;
  amount: number;
  period: string;
  start_date: string;
  end_date: string;
}

export interface BudgetUpdatePayload {
  amount: number;
}

export interface BudgetMutationResponse {
  success: boolean;
  message: string;
  data: BudgetItem;
}

export interface BudgetDeleteResponse {
  success: boolean;
  message: string;
}

export interface BudgetSummary {
  total_budgets: number;
  exceeded: number;
  warning: number;
  total_budget_amount: string;
  total_spent: string;
}

export interface BudgetSummaryResponse {
  success: boolean;
  message: string;
  data: BudgetSummary;
}