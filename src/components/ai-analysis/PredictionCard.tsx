import { Sparkles, TrendingDown, WifiOff } from 'lucide-react';
import { formatRupiah } from '@/utils';
import type { ForecastData } from '@/api/endpoints/analysis';

interface PredictionCardProps {
  forecast?: ForecastData | null;
  loading?: boolean;
}

const PredictionCard = ({ forecast, loading = false }: PredictionCardProps) => {
  const isUnavailable = !forecast || forecast.source === 'unavailable' || forecast.total_predicted === null;

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
                Next Month Prediction
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <WifiOff className="h-4 w-4 text-on-primary-container/50" />
                <p className="text-xs text-on-primary-container/60">
                  AI forecast service is currently unavailable.
                </p>
              </div>
              {forecast?.categories && forecast.categories.length > 0 && (
                <p className="mt-1 text-xs text-on-primary-container/50">
                  Tracked categories: {forecast.categories.join(', ')}
                </p>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-sm font-semibold text-primary font-manrope sm:text-base">
                  Next Month Prediction
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-on-primary-container/80 sm:text-sm">
                  AI predicts your next month expenses will be around{' '}
                  <span className="font-bold text-primary">
                    {formatRupiah(forecast!.total_predicted!)}
                  </span>.
                </p>
              </div>
              {forecast!.next_week !== null && (
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary shrink-0 self-start">
                  <TrendingDown className="h-3 w-3" />
                  Next week: {formatRupiah(forecast!.next_week)}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictionCard;
