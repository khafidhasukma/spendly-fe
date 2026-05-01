import axios from 'axios';

const backendApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:3000/api',
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ─── Request interceptor – attach auth token ─────────────────────────────────
backendApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ─── Response interceptor – global error handling ────────────────────────────
backendApi.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized globally
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default backendApi;
