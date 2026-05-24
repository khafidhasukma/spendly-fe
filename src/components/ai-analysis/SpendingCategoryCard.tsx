import { useState, useRef } from 'react';
import {
  Zap,
  UtensilsCrossed,
  ShoppingBag,
  Car,
  Home,
  HeartPulse,
} from 'lucide-react';
import type { CategoryItem } from '@/types/ai-analysis';

const formatRupiah = (n: number) => new Intl.NumberFormat('id-ID').format(n);

const categoryBreakdown: CategoryItem[] = [
  { name: 'Lifestyle & Dining', amount: 1_850_000, pct: 35, color: '#10B981', tag: 'Frequent', icon: UtensilsCrossed },
  { name: 'Commute & Travel', amount: 750_000, pct: 18, color: '#76BC43', tag: 'Routine', icon: Car },
  { name: 'Retail Therapy', amount: 1_200_000, pct: 12, color: '#F48221', tag: 'Outliers', icon: ShoppingBag },
  { name: 'Household', amount: 650_000, pct: 15, color: '#3B82F6', tag: 'Essential', icon: Home },
  { name: 'Health & Wellness', amount: 500_000, pct: 11, color: '#EF4444', tag: 'Priority', icon: HeartPulse },
  { name: 'Others', amount: 350_000, pct: 9, color: '#6B7280', tag: 'Misc', icon: Zap },
];

const DonutChart = () => {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const total = categoryBreakdown.reduce((s, c) => s + c.pct, 0);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  const segments = categoryBreakdown.reduce<
    Array<CategoryItem & { startPercent: number; segLength: number; offset: number }>
  >((acc, cat) => {
    const prevPercent = acc.length > 0 ? acc[acc.length - 1].startPercent + acc[acc.length - 1].pct / total : 0;
    const segLength = (cat.pct / total) * circumference;
    const offset = circumference - (prevPercent * circumference);
    acc.push({ ...cat, startPercent: prevPercent, segLength, offset });
    return acc;
  }, []);

  const handleMouseMove = (e: React.MouseEvent<SVGCircleElement>, name: string) => {
    if (svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      setTooltipPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top - 40,
      });
    }
    setHoveredSegment(name);
  };

  const hoveredCat = categoryBreakdown.find((c) => c.name === hoveredSegment);

  return (
    <div className="relative w-full flex justify-center">
      <div className="relative w-48 h-48 sm:w-56 sm:h-56">
        <svg
          ref={svgRef}
          viewBox="0 0 100 100"
          className="w-full h-full"
          style={{ overflow: 'visible' }}
        >
          {segments.map((seg) => (
            <circle
              key={seg.name}
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth="14"
              strokeDasharray={`${seg.segLength} ${circumference - seg.segLength}`}
              strokeDashoffset={seg.offset}
              transform="rotate(-90 50 50)"
              className="cursor-pointer transition-opacity duration-200"
              style={{
                opacity: hoveredSegment && hoveredSegment !== seg.name ? 0.3 : 1,
              }}
              onMouseMove={(e) => handleMouseMove(e, seg.name)}
              onMouseLeave={() => {
                setHoveredSegment(null);
                setTooltipPos(null);
              }}
            />
          ))}
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {hoveredSegment && hoveredCat ? (
            <>
              <p className="text-[11px] text-muted-foreground leading-tight text-center px-4">{hoveredCat.name}</p>
              <p className="text-lg font-bold text-foreground font-manrope">{hoveredCat.pct}%</p>
            </>
          ) : (
            <>
              <p className="text-[11px] text-muted-foreground">Total Expense</p>
              <p className="text-lg font-bold text-foreground font-manrope sm:text-xl">Rp5.3M</p>
            </>
          )}
        </div>

        {hoveredSegment && tooltipPos && hoveredCat && (
          <div
            className="absolute z-30 pointer-events-none whitespace-nowrap rounded-lg bg-foreground px-3 py-1.5 text-xs font-medium text-background shadow-lg"
            style={{ left: tooltipPos.x, top: tooltipPos.y, transform: 'translateX(-50%)' }}
          >
            {hoveredCat.name}: Rp{formatRupiah(hoveredCat.amount)}
          </div>
        )}
      </div>
    </div>
  );
};

const SpendingCategoryCard = () => {
  return (
    <div className="w-full rounded-2xl border border-border bg-card p-5 sm:p-6">
      <h2 className="text-base font-semibold text-foreground font-manrope sm:text-lg">
        Spending by Category
      </h2>

      <div className="mt-5">
        <DonutChart />
      </div>

      <div className="mt-5 space-y-3">
        {categoryBreakdown.map((cat) => (
          <div key={cat.name} className="flex items-center gap-3">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: cat.color }}
            />
            <span className="flex-1 truncate text-sm font-medium text-foreground">{cat.name}</span>
            <span className="text-sm font-semibold tabular-nums text-foreground">{cat.pct}%</span>
            <span className="h-1 w-1 shrink-0 rounded-full bg-muted-foreground/40" />
            <span className="text-sm font-semibold tabular-nums text-foreground w-24 text-right">
              Rp{formatRupiah(cat.amount)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpendingCategoryCard;
