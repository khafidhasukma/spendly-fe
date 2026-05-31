import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { analysisApi } from '@/api';
import type { AnalysisSummaryData } from '@/types';

export function useAnalysis() {
  const [data, setData] = useState<AnalysisSummaryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    analysisApi.getSummary()
      .then((res) => { if (!cancelled) setData(res); })
      .catch(() => { if (!cancelled) toast.error('Failed to load analysis data'); })
      .finally(() => { if (!cancelled) setIsLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return { data, isLoading };
}
