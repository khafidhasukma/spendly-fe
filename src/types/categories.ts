import type { LucideIcon } from 'lucide-react';

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
