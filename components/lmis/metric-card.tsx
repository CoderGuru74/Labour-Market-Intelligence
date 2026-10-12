import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string;
  unit?: string;
  trend?: number;
  trendLabel?: string;
  tone?: 'default' | 'warning' | 'destructive';
}

export function MetricCard({ label, value, unit, trend, trendLabel, tone = 'default' }: MetricCardProps) {
  const TrendIcon = trend === undefined ? null : trend > 0 ? TrendingUp : trend < 0 ? TrendingDown : Minus;
  const trendColor = trend === undefined ? '' : trend > 0 ? 'text-slate-500' : 'text-slate-500';

  return (
    <div className="flex flex-col gap-2 border-r border-slate-200 px-5 py-5 last:border-r-0">
      <span className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
        {label}
      </span>
      <div className="flex items-baseline gap-1.5">
        <span
          className={cn(
            'font-mono-t text-3xl font-semibold tracking-tight',
            tone === 'warning' && 'text-amber-600',
            tone === 'destructive' && 'text-red-600',
            tone === 'default' && 'text-slate-900'
          )}
        >
          {value}
        </span>
        {unit && <span className="text-sm text-slate-400">{unit}</span>}
      </div>
      {TrendIcon && (
        <div className="flex items-center gap-1.5">
          <span className={cn('flex items-center gap-1 text-xs', trendColor)}>
            <TrendIcon className="h-3 w-3" />
            <span className="font-mono-t">{trend! > 0 ? '+' : ''}{trend}%</span>
          </span>
          {trendLabel && <span className="text-xs text-slate-400">{trendLabel}</span>}
        </div>
      )}
    </div>
  );
}
