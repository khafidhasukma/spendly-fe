export interface CashFlowItem {
  label: string;
  period: string;
  income: string;
  expense: string;
}

export interface HeatmapItem {
  dow: number;
  day_name: string;
  tx_count: number;
  total: string;
}

export interface SpendingCluster {
  name: string;
  icon: string;
  color: string;
  frequency: number;
  total: string;
  pct_of_total: string;
}

export interface InsightItem {
  type: 'warning' | 'info' | 'danger' | 'tip';
  title: string;
  message: string;
  action: string;
  category?: string;
  source?: string;
}

export interface UnusualSpending {
  category: string;
  merchant_name: string;
  amount: string;
  date: string;
  avg_amount: string;
  deviation_pct: string;
}

export interface ForecastData {
  next_week: { [category: string]: number } | null;
  total_predicted: number | null;
  categories: string[];
  source: string;
  error?: string;
}

export interface AiHealth {
  ai_service: { online: boolean; error?: string };
  ai_url: string;
}

export interface AnalysisSummaryData {
  insights: {
    cash_flow: CashFlowItem[];
    heatmap: HeatmapItem[];
    spending_clusters: SpendingCluster[];
    recurring_patterns: unknown[];
    insights_list: InsightItem[];
  };
  unusual_spending: UnusualSpending[];
  forecast: ForecastData;
  ai_health: AiHealth;
}

export interface AnalysisSummaryResponse {
  success: boolean;
  message: string;
  data: AnalysisSummaryData;
}
