import type { LucideIcon } from 'lucide-react';

export interface SidebarProps {
  isOpen?: boolean;
  onClose: () => void;
}

export interface NavbarProps {
  title?: string;
}

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  scan?: boolean;
}
