import type { LucideIcon } from 'lucide-react';

export interface HistoryCategory {
  id: string;
  name: string;
}

export interface HistoryTransaction {
  id: string;
  merchant: string;
  paymentMethod: string;
  category: HistoryCategory;
  date: string;
  amount: number;
  icon?: LucideIcon;
}
