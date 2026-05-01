// ─── Transaction ─────────────────────────────────────────────────────────────
export interface Transaction {
  id: string;
  amount: number;
  category: string;
  date: string; // ISO 8601 e.g. "2026-04-27"
  merchant_name: string;
}

// ─── OCR Result ───────────────────────────────────────────────────────────────
export interface OCRResult {
  confidence_score: number; // 0.0 – 1.0
  extracted_text: string;
  total_amount: number;
}

// ─── Prediction ───────────────────────────────────────────────────────────────
export interface Prediction {
  date: string; // ISO 8601
  estimated_spending: number;
}

// ─── API Response wrapper ────────────────────────────────────────────────────
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}
