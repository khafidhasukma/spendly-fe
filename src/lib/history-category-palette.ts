import type { LucideIcon } from 'lucide-react';
import { ICON_OPTIONS } from '@/lib/category-icons';
import type { HistoryCategoryStyle } from '@/types';

// 8 colors, keyed by category id
const PALETTE: HistoryCategoryStyle[] = [
  {
    iconBg: 'bg-teal-100 dark:bg-teal-500/20',
    iconColor: 'text-teal-600 dark:text-teal-400',
    badgeClass: 'border-0 bg-teal-100 text-teal-800 dark:bg-teal-500/20 dark:text-teal-300',
  },
  {
    iconBg: 'bg-amber-100 dark:bg-amber-500/20',
    iconColor: 'text-amber-600 dark:text-amber-400',
    badgeClass: 'border-0 bg-amber-100 text-amber-900 dark:bg-amber-500/20 dark:text-amber-200',
  },
  {
    iconBg: 'bg-blue-100 dark:bg-blue-500/20',
    iconColor: 'text-blue-600 dark:text-blue-400',
    badgeClass: 'border-0 bg-blue-100 text-blue-900 dark:bg-blue-500/20 dark:text-blue-200',
  },
  {
    iconBg: 'bg-purple-100 dark:bg-purple-500/20',
    iconColor: 'text-purple-600 dark:text-purple-400',
    badgeClass: 'border-0 bg-purple-100 text-purple-900 dark:bg-purple-500/20 dark:text-purple-200',
  },
  {
    iconBg: 'bg-sky-100 dark:bg-sky-500/20',
    iconColor: 'text-sky-600 dark:text-sky-400',
    badgeClass: 'border-0 bg-sky-100 text-sky-900 dark:bg-sky-500/20 dark:text-sky-200',
  },
  {
    iconBg: 'bg-red-100 dark:bg-red-500/20',
    iconColor: 'text-red-600 dark:text-red-400',
    badgeClass: 'border-0 bg-red-100 text-red-900 dark:bg-red-500/20 dark:text-red-200',
  },
  {
    iconBg: 'bg-pink-100 dark:bg-pink-500/20',
    iconColor: 'text-pink-600 dark:text-pink-400',
    badgeClass: 'border-0 bg-pink-100 text-pink-900 dark:bg-pink-500/20 dark:text-pink-200',
  },
  {
    iconBg: 'bg-lime-100 dark:bg-lime-500/20',
    iconColor: 'text-lime-700 dark:text-lime-400',
    badgeClass: 'border-0 bg-lime-100 text-lime-900 dark:bg-lime-500/20 dark:text-lime-200',
  },
];

function bucket(key: string, modulo: number): number {
  const k = key.trim() || '_';
  let h = 0;
  for (let i = 0; i < k.length; i++) {
    h = (Math.imul(31, h) + k.charCodeAt(i)) | 0;
  }
  return Math.abs(h) % modulo;
}

export function getHistoryCategoryStyle(categoryId: string): HistoryCategoryStyle {
  return PALETTE[bucket(categoryId, PALETTE.length)]!;
}

export function getHistoryCategoryIcon(categoryId: string): LucideIcon {
  const idx = bucket(`${categoryId}:icon`, ICON_OPTIONS.length);
  return ICON_OPTIONS[idx]!.icon;
}
