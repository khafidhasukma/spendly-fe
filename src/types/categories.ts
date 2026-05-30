import type { LucideIcon } from 'lucide-react';

// legacy type kept for backward compat — prefer ApiCategory from api/endpoints/categories
export interface Category {
  id: string;
  name: string;
  iconId: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  transactions: number;
  total: number;
}

export interface CategoryIconOption {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface ColorOption {
  color: string;
  bgColor: string;
}
