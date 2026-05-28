import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
} from 'axios';
import { tokenStorage } from './token';

interface RefreshResponse {
  data: { accessToken: string; refreshToken: string };
}

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const client: AxiosInstance = axios.create({
  baseURL: `${BASE_URL}/v1`,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
});

// attach access token on every request
client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = tokenStorage.getAccessToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// silent refresh queue
let isRefreshing = false;
let queue: Array<{ resolve: (v: unknown) => void; reject: (e: unknown) => void }> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  queue.forEach(({ resolve, reject }) => (error ? reject(error) : resolve(token)));
  queue = [];
};

// handle 401 → refresh token → retry
client.interceptors.response.use(
  (res: AxiosResponse) => res,
  async (error: AxiosError) => {
    const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    // skip refresh for auth endpoints
    const url = original.url ?? '';
    if (['/auth/login', '/auth/register', '/auth/refresh'].some((p) => url.includes(p))) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queue.push({ resolve, reject });
      }).then((token) => {
        if (original.headers) original.headers.Authorization = `Bearer ${token}`;
        return client(original);
      });
    }

    original._retry = true;
    isRefreshing = true;

    const refreshToken = tokenStorage.getRefreshToken();
    if (!refreshToken) {
      tokenStorage.clear();
      window.location.href = '/login';
      return Promise.reject(error);
    }

    try {
      const { data } = await axios.post<RefreshResponse>(
        `${BASE_URL}/v1/auth/refresh`,
        { ['refresh_token']: refreshToken },
        { headers: { 'Content-Type': 'application/json' } },
      );

      const { accessToken, refreshToken: newRefresh } = data.data;
      tokenStorage.setTokens(accessToken, newRefresh);

      if (original.headers) original.headers.Authorization = `Bearer ${accessToken}`;
      processQueue(null, accessToken);
      return client(original);
    } catch (err) {
      processQueue(err as AxiosError, null);
      tokenStorage.clear();
      window.location.href = '/login';
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  },
);

// thin wrapper for cleaner usage
export const api = {
  get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return client.get<T>(url, config);
  },

  post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return client.post<T>(url, data, config);
  },

  put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return client.put<T>(url, data, config);
  },

  patch<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return client.patch<T>(url, data, config);
  },

  delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return client.delete<T>(url, config);
  },

  upload<T = unknown>(url: string, formData: FormData, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return client.post<T>(url, formData, {
      ...config,
      headers: { ...config?.headers, 'Content-Type': 'multipart/form-data' },
    });
  },
};

export { client };
export default api;
