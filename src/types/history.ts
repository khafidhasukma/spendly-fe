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
  notes?: string;
  icon?: LucideIcon;
}

export interface HistoryFiltersValue {
  dateRange: string;
  category: string;
  amountMin: string;
  amountMax: string;
}

export interface HistoryFiltersProps {
  value: HistoryFiltersValue;
  onChange: (value: HistoryFiltersValue) => void;
  categoryOptions?: { id: string; name: string }[];
}

export interface HistoryTableProps {
  transactions: HistoryTransaction[];
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export type HistoryTableDesktopProps = {
  transactions: HistoryTransaction[];
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export type HistoryTableMobileProps = {
  groups: [string, HistoryTransaction[]][];
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export interface HistoryHeaderProps {
  onAddExpense?: () => void;
}

export interface HistoryPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export interface HistoryCategoryStyle {
  iconBg: string;
  iconColor: string;
  badgeClass: string;
}

export type UseHistoryListOptions = {
  initialTransactions?: HistoryTransaction[];
  pageSize?: number;
};

export type HistoryFiltersPanelProps = {
  value: HistoryFiltersValue;
  onChange: (value: HistoryFiltersValue) => void;
  categoryOptions: { id: string; name: string }[];
};

export type HistoryDeleteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  target: HistoryTransaction | undefined;
  onConfirm: () => void;
};

export type HistoryTransactionsPanelProps = {
  transactions: HistoryTransaction[];
  isLoading?: boolean;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export interface HistoryTransactionFormData {
  merchant: string;
  amount: number;
  date: string;
  category: string;
  paymentMethod: string;
  notes: string;
}

export type HistoryViewDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: HistoryTransaction | undefined;
};

export type HistoryFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'add' | 'edit';
  transaction?: HistoryTransaction;
  onSave: (data: HistoryTransactionFormData) => void;
};

export interface TransactionItem {
  id: string;
  user_id: string;
  wallet_id: string;
  category_id: string;
  type: 'expense' | 'income' | 'transfer';
  amount: string;
  description: string | null;
  merchant_name: string;
  notes: string | null;
  receipt_url: string | null;
  date: string;
  created_at: string;
  updated_at: string;
  category_name: string;
  category_icon: string;
  category_color: string;
  wallet_name: string;
  wallet_type: string;
}

export interface TransactionPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface TransactionFilters {
  page?: number;
  limit?: number;
  type?: 'expense' | 'income' | 'transfer';
  sort?: string;
  order?: 'ASC' | 'DESC';
  date_from?: string;
  date_to?: string;
  category_id?: string;
  search?: string;
  amount_min?: number;
  amount_max?: number;
}
