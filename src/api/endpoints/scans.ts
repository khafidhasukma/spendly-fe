import api from '../client';
import { invalidate } from '../cache';
import type {
  ScanUploadData,
  ScanResult,
  ConfirmScanPayload,
  ScanUploadResponse,
  ScanResponse,
  ScanConfirmResponse,
} from '@/types/scan';

export const scansApi = {
  async upload(file: File): Promise<ScanUploadData> {
    const formData = new FormData();
    formData.append('receipt', file);
    const { data } = await api.upload<ScanUploadResponse>('/scans/upload', formData, {
      timeout: 60_000,
    });
    return data.data;
  },

  async getById(scanId: string): Promise<ScanResult> {
    const { data } = await api.get<ScanResponse>(`/scans/${scanId}`);
    return data.data;
  },

  async confirm(scanId: string, payload: ConfirmScanPayload): Promise<ScanConfirmResponse['data']> {
    const { data } = await api.post<ScanConfirmResponse>(`/scans/${scanId}/confirm`, payload);
    invalidate('transactions');
    invalidate('dashboard');
    invalidate('budgets');
    invalidate('wallets');
    return data.data;
  },

  async delete(scanId: string): Promise<void> {
    await api.delete(`/scans/${scanId}`);
  },
};
