import api from '../client';
import { dedupe } from '../cache';
import type { AnalysisSummaryData, AnalysisSummaryResponse } from '@/types/analysis';

export const analysisApi = {
  async getSummary(): Promise<AnalysisSummaryData> {
    return dedupe('analysis:summary', async () => {
      const { data } = await api.get<AnalysisSummaryResponse>('/analysis/summary');
      return data.data;
    });
  },
};
