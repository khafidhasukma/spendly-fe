import type { LucideIcon } from 'lucide-react';

export interface PersonalInfoCardProps {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface SupportItem {
  label: string;
  icon: LucideIcon;
  href?: string;
  external?: boolean;
}

export interface SupportCardProps {
  onLogout?: () => void;
}

export interface SecurityCardProps {
  lastPasswordChange?: string;
  twoFactorEnabled?: boolean;
  onUpdatePassword?: () => void;
}

export interface ProfileHeaderProps {
  onEditProfile?: () => void;
}

export interface LogoutConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface EditProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface ChangePasswordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface BudgetSettingsCardProps {
  spendingAlerts?: boolean;
}
