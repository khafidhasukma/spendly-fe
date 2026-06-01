import { AlertTriangle, Info, Lightbulb, TrendingUp } from 'lucide-react';
import type { GroupedInsight } from './insight-utils';

const TYPE_CONFIG = {
  warning: { Icon: AlertTriangle, iconColor: 'text-amber-400', dotColor: 'bg-amber-400', label: 'Warning' },
  danger:  { Icon: AlertTriangle, iconColor: 'text-red-400',   dotColor: 'bg-red-400',   label: 'Alert'   },
  info:    { Icon: Info,          iconColor: 'text-blue-400',  dotColor: 'bg-blue-400',  label: 'Info'    },
  tip:     { Icon: Lightbulb,     iconColor: 'text-emerald-400', dotColor: 'bg-emerald-400', label: 'Tip' },
} as const;

interface InsightCardsProps {
  items: GroupedInsight[];
  loading?: boolean;
}

const SkeletonCard = () => (
  <div className="rounded-2xl border border-border bg-card p-4 animate-pulse space-y-3">
    <div className="h-3 w-16 rounded bg-muted" />
    <div className="h-4 w-3/4 rounded bg-muted" />
    <div className="space-y-1.5">
      <div className="h-3 w-full rounded bg-muted" />
      <div className="h-3 w-5/6 rounded bg-muted" />
    </div>
  </div>
);

const InsightCards = ({ items, loading = false }: InsightCardsProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border-border bg-muted/20 py-8 text-center">
        <TrendingUp className="h-7 w-7 text-muted-foreground/30" />
        <p className="text-sm font-medium text-muted-foreground">All clear</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => {
        const cfg = TYPE_CONFIG[item.type] ?? TYPE_CONFIG.info;
        const { Icon } = cfg;
        return (
          <div key={i} className="rounded-lg border border-border bg-card p-4 space-y-2">
            <div className="flex items-center gap-1.5">
              <Icon className={`h-3.5 w-3.5 shrink-0 ${cfg.iconColor}`} />
              <span className={`text-xs font-semibold uppercase tracking-wide ${cfg.iconColor}`}>
                {cfg.label}
              </span>
            </div>
            <p className="text-base font-semibold text-foreground leading-snug">{item.title}</p>
            {item.messages.length === 1 ? (
              <p className="text-sm leading-relaxed text-muted-foreground">{item.messages[0]}</p>
            ) : (
              <ul className="space-y-1">
                {item.messages.map((msg, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                    <span className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${cfg.dotColor}`} />
                    {msg}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default InsightCards;
