import { Sparkles, TrendingDown } from 'lucide-react';

const PredictionCard = () => {
  return (
    <div className="rounded-2xl border border-primary/20 bg-primary-container p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-sm font-semibold text-primary font-manrope sm:text-base">
                Next Month Prediction
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-on-primary-container/80 sm:text-sm">
                AI predicts your January expenses will be around{' '}
                <span className="font-bold text-primary">Rp5.100.000</span> — 4% lower than this month.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary shrink-0 self-start">
              <TrendingDown className="h-3 w-3" /> -4% predicted
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionCard;
