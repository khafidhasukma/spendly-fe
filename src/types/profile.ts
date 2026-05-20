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
  name?: string;
  email?: string;
  avatarUrl?: string;
  isPremium?: boolean;
  onEditProfile?: () => void;
}

export interface LogoutConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: () => void;
}

export interface EditProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: {
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl: string;
  };
  onSave?: (data: { firstName: string; lastName: string; email: string; avatarUrl: string }) => void;
}

export interface ChangePasswordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (newPassword: string) => void;
}

export interface BudgetSettingsCardProps {
  monthlyLimit?: number;
  spendingAlerts?: boolean;
}
