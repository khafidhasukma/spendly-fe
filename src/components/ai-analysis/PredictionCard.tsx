import { Sparkles, WifiOff } from 'lucide-react';
import { formatRupiah } from '@/utils';
import type { ForecastData } from '@/types';

interface PredictionCardProps {
  forecast?: ForecastData | null;
  loading?: boolean;
}

const PredictionCard = ({ forecast, loading = false }: PredictionCardProps) => {
  const isUnavailable = !forecast || forecast.source === 'unavailable';

  const nextWeekTotal = forecast?.next_week
    ? Object.values(forecast.next_week).reduce((sum, val) => sum + val, 0)
    : null;

  return (
    <div className="rounded-2xl border border-primary/20 bg-primary-container p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
              <span className="text-sm text-on-primary-container/70">Loading prediction...</span>
            </div>
          ) : isUnavailable ? (
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold text-primary font-manrope sm:text-base">
                Next Week Prediction
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <WifiOff className="h-4 w-4 text-on-primary-container/50" />
                <p className="text-xs text-on-primary-container/60">
                  AI forecast service is currently unavailable.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-primary font-manrope sm:text-base mb-1">
                  Next Week Prediction
                </h3>
                <p className="text-xs leading-relaxed text-on-primary-container/80 sm:text-sm">
                  AI predicts your next week expenses will be around{' '}
                  <span className="font-bold text-primary">
                    {nextWeekTotal !== null && nextWeekTotal > 0
                      ? formatRupiah(nextWeekTotal)
                      : 'Rp0'}
                  </span>.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictionCard;
