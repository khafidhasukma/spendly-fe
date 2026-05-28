import type { ReactNode } from 'react';

export interface GroupInputProps {
  id?: string;
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  icon?: ReactNode;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export interface PasswordInputProps {
  id?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}
