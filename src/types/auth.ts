export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar_url: string | null;
  is_premium: boolean;
  monthly_limit: string;
  created_at: string;
  push_notifications: boolean;
  email_summaries: boolean;
  security_alerts: boolean;
  spending_alerts: boolean;
  spending_alert_pct?: number;
  dark_mode: boolean;
  currency: string;
}

export interface UpdateProfilePayload {
  first_name?: string;
  last_name?: string;
  monthly_limit?: number;
}

export interface UpdatePasswordPayload {
  current_password: string;
  new_password: string;
}

export interface UpdatePreferencesPayload {
  push_notifications?: boolean;
  email_summaries?: boolean;
  security_alerts?: boolean;
  spending_alerts?: boolean;
  dark_mode?: boolean;
  currency?: string;
}

export interface AuthResponse {
  data: AuthTokens;
  message: string;
}

export interface ProfileResponse {
  data: UserProfile;
  message: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
  data: {
    reset_token: string;
  };
}

export interface ResetPasswordPayload {
  token: string;
  new_password: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}
