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
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export type HistoryTableDesktopProps = {
  transactions: HistoryTransaction[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export type HistoryTableMobileProps = {
  groups: [string, HistoryTransaction[]][];
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
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};
