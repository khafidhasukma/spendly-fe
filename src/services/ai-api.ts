import axios from 'axios';
import type { OCRResult, Prediction } from '../types';

const aiApi = axios.create({
  baseURL: import.meta.env.VITE_AI_API_URL ?? 'http://localhost:8000/api',
  timeout: 30_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ─── OCR ─────────────────────────────────────────────────────────────────────
export const scanReceipt = async (imageFile: File): Promise<OCRResult> => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const { data } = await aiApi.post<OCRResult>('/ocr/scan', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

// ─── Predictions ─────────────────────────────────────────────────────────────
export const getSpendingPredictions = async (): Promise<Prediction[]> => {
  const { data } = await aiApi.get<Prediction[]>('/predictions');
  return data;
};

export default aiApi;
