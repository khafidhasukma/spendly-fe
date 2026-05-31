import type { LucideIcon } from 'lucide-react';

export type CategoryType = 'expense' | 'income' | 'both';

export interface ApiCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: CategoryType;
  is_system: boolean;
  ai_label: string | null;
  created_at: string;
  transaction_count: number;
  total_amount: string;
}

export interface CreateCategoryPayload {
  name: string;
  icon: string;
  color: string;
  type: CategoryType;
}

export interface UpdateCategoryPayload {
  name?: string;
  icon?: string;
  color?: string;
}

export interface CategoriesResponse {
  success: boolean;
  message: string;
  data: ApiCategory[];
}

export interface CategoryResponse {
  success: boolean;
  message: string;
  data: ApiCategory;
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
