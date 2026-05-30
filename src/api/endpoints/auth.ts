import api from '../client';
import { tokenStorage } from '../token';
import type {
  LoginPayload,
  RegisterPayload,
  AuthTokens,
  UserProfile,
  UpdateProfilePayload,
  UpdatePasswordPayload,
  UpdatePreferencesPayload,
  AuthResponse,
  ProfileResponse,
} from '@/types/auth';

export const authApi = {
  async login(payload: LoginPayload): Promise<AuthTokens> {
    const { data } = await api.post<AuthResponse>('/auth/login', payload);
    tokenStorage.setTokens(data.data.accessToken, data.data.refreshToken);
    return data.data;
  },

  async register(payload: RegisterPayload): Promise<AuthTokens> {
    const { data } = await api.post<AuthResponse>('/auth/register', payload);
    tokenStorage.setTokens(data.data.accessToken, data.data.refreshToken);
    return data.data;
  },

  async logout(): Promise<void> {
    const refreshToken = tokenStorage.getRefreshToken();
    try {
      await api.post('/auth/logout', { ['refresh_token']: refreshToken });
    } finally {
      tokenStorage.clear();
    }
  },

  async getProfile(): Promise<UserProfile> {
    const { data } = await api.get<ProfileResponse>('/auth/me');
    return data.data;
  },

  async updateProfile(payload: UpdateProfilePayload): Promise<UserProfile> {
    const { data } = await api.put<ProfileResponse>('/auth/me', payload);
    return data.data;
  },

  async uploadAvatar(file: File): Promise<UserProfile> {
    const formData = new FormData();
    formData.append('avatar', file);
    const { data } = await api.put<ProfileResponse>('/auth/me/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data;
  },

  async updatePassword(payload: UpdatePasswordPayload): Promise<void> {
    await api.put('/auth/me/password', payload);
  },

  async updatePreferences(payload: UpdatePreferencesPayload): Promise<void> {
    await api.put('/auth/me/preferences', payload);
  },
};
