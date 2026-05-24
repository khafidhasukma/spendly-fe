import type { LucideIcon } from 'lucide-react';

export const filterOptions = ['This Month', 'Last 3 Months', '6 Months', 'This Year'] as const;
export type FilterOption = (typeof filterOptions)[number];

export interface FilterDropdownProps {
  value: FilterOption;
  onChange: (v: FilterOption) => void;
}

export interface SummaryCardProps {
  label: string;
  value: string;
  change: number;
  positive: boolean;
}

export interface CategoryItem {
  name: string;
  amount: number;
  pct: number;
  color: string;
  tag: string;
  icon: LucideIcon;
}

export interface MonthlyDataItem {
  month: string;
  income: number;
  expense: number;
}
