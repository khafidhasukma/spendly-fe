import { useState, useRef } from 'react';
import { formatRupiah } from '@/utils';
import { getIconByName } from '@/lib/category-icons';
import React from 'react';
import type { SpendingCluster } from '@/types';

interface SpendingCategoryCardProps {
  clusters?: SpendingCluster[];
  loading?: boolean;
}

interface Segment {
  name: string;
  color: string;
  pct: number;
  amount: number;
  startPercent: number;
  segLength: number;
  offset: number;
}

const DonutChart = ({ segments, total }: { segments: Segment[]; total: number }) => {
  const [hoveredName, setHoveredName] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const hoveredSeg = segments.find((s) => s.name === hoveredName);

  const handleMouseMove = (e: React.MouseEvent<SVGCircleElement>, name: string) => {
    if (svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top - 40 });
    }
    setHoveredName(name);
  };

  return (
    <div className="relative w-full flex justify-center">
      <div className="relative w-48 h-48 sm:w-56 sm:h-56">
        <svg ref={svgRef} viewBox="0 0 100 100" className="w-full h-full" style={{ overflow: 'visible' }}>
          {segments.map((seg) => (
            <circle
              key={seg.name}
              cx="50" cy="50" r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth="14"
              strokeDasharray={`${seg.segLength} ${circumference - seg.segLength}`}
              strokeDashoffset={seg.offset}
              transform="rotate(-90 50 50)"
              className="cursor-pointer transition-opacity duration-200"
              style={{ opacity: hoveredName && hoveredName !== seg.name ? 0.3 : 1 }}
              onMouseMove={(e) => handleMouseMove(e, seg.name)}
              onMouseLeave={() => { setHoveredName(null); setTooltipPos(null); }}
            />
          ))}
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {hoveredSeg ? (
            <>
              <p className="text-[11px] text-muted-foreground leading-tight text-center px-4">{hoveredSeg.name}</p>
              <p className="text-lg font-bold text-foreground font-manrope">{hoveredSeg.pct.toFixed(1)}%</p>
            </>
          ) : (
            <>
              <p className="text-[11px] text-muted-foreground">Total Expense</p>
              <p className="text-lg font-bold text-foreground font-manrope sm:text-xl">{formatRupiah(total)}</p>
            </>
          )}
        </div>

        {hoveredName && tooltipPos && hoveredSeg && (
          <div
            className="absolute z-30 pointer-events-none whitespace-nowrap rounded-lg bg-foreground px-3 py-1.5 text-xs font-medium text-background shadow-lg"
            style={{ left: tooltipPos.x, top: tooltipPos.y, transform: 'translateX(-50%)' }}
          >
            {hoveredSeg.name}: {formatRupiah(hoveredSeg.amount)}
          </div>
        )}
      </div>
    </div>
  );
};

const SpendingCategoryCard = ({ clusters = [], loading = false }: SpendingCategoryCardProps) => {
  const total = clusters.reduce((s, c) => s + parseFloat(c.total), 0);
  const circumference = 2 * Math.PI * 40;

  const segments: Segment[] = clusters.reduce<Segment[]>((acc, c) => {
    const pct = parseFloat(c.pct_of_total);
    const prevPct = acc.length > 0 ? acc[acc.length - 1].startPercent + acc[acc.length - 1].pct : 0;
    const segLength = (pct / 100) * circumference;
    const offset = circumference - (prevPct / 100) * circumference;
    acc.push({
      name: c.name,
      color: c.color,
      pct,
      amount: parseFloat(c.total),
      startPercent: prevPct,
      segLength,
      offset,
    });
    return acc;
  }, []);

  return (
    <div className="w-full rounded-2xl border border-border bg-card p-5 sm:p-6">
      <h2 className="text-base font-semibold text-foreground font-manrope sm:text-lg">
        Spending by Category
      </h2>

      <div className="mt-5">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
          </div>
        ) : clusters.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-sm text-muted-foreground">
            No spending data
          </div>
        ) : (
          <DonutChart segments={segments} total={total} />
        )}
      </div>

      {!loading && clusters.length > 0 && (
        <div className="mt-5 space-y-3">
          {clusters.map((c) => {
            const icon = getIconByName(c.icon);
            return (
              <div key={c.name} className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md" style={{ background: `${c.color}22` }}>
                  {React.createElement(icon, { className: 'h-3.5 w-3.5', style: { color: c.color } })}
                </span>
                <span className="flex-1 truncate text-sm font-medium text-foreground">{c.name}</span>
                <span className="text-sm font-semibold tabular-nums text-foreground">{parseFloat(c.pct_of_total).toFixed(1)}%</span>
                <span className="h-1 w-1 shrink-0 rounded-full bg-muted-foreground/40" />
                <span className="text-sm font-semibold tabular-nums text-foreground w-24 text-right">
                  {formatRupiah(parseFloat(c.total))}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SpendingCategoryCard;
