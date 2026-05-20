export interface Transaction {
  id: string;
  amount: number;
  category: string;
  date: string;
  merchant_name: string;
}

export interface OCRResult {
  confidence_score: number;
  extracted_text: string;
  total_amount: number;
}

export interface Prediction {
  date: string;
  estimated_spending: number;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}
