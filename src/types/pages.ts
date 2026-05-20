import type { LucideIcon } from 'lucide-react';

export interface TncSubItem {
  number: string;
  text: string;
}

export interface TncSectionProps {
  id: string;
  sectionNumber: number;
  title: string;
  description: string;
  items: TncSubItem[];
  blockquote?: string;
  icon: LucideIcon;
}

export interface TocItem {
  id: string;
  label: string;
}

export interface FAQCategory {
  category: string;
  items: { question: string; answer: string }[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface RightItem {
  icon: LucideIcon;
  text: string;
}

export interface InfoCategory {
  title: string;
  items: string[];
}

export interface UsageItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ThemeContextValue {
  dark: boolean;
  toggleDark: () => void;
}
