export type ScanStatus = 'processing' | 'completed' | 'failed';
export type ConfidenceLevel = 'low' | 'medium' | 'high';

export interface ScanUploadData {
  scan_id: string;
  file_url: string;
  status: ScanStatus;
}

export interface ScanResult {
  id: string;
  user_id: string;
  file_url: string;
  file_name: string;
  status: ScanStatus;
  merchant_name: string | null;
  total_amount: number | null;
  scan_date: string | null;
  suggested_category_id: string | null;
  suggested_category_name: string | null;
  suggested_category_icon: string | null;
  suggested_category_color: string | null;
  confidence_score: number;
  confidence_level: ConfidenceLevel;
  raw_text: string | null;
  transaction_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface ConfirmScanPayload {
  merchant_name: string;
  total_amount: number;
  category_id: string;
  wallet_id: string;
  date: string;
  notes?: string;
}

export interface ScanUploadResponse {
  success: boolean;
  message: string;
  data: ScanUploadData;
}

export interface ScanResponse {
  success: boolean;
  message: string;
  data: ScanResult;
}

export interface ScanConfirmResponse {
  success: boolean;
  message: string;
  data: { transaction_id: string } & Record<string, unknown>;
}
