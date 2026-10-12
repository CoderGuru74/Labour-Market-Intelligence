'use client';

import { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Download, Filter, AlertTriangle, Clock, Search, Bell } from 'lucide-react';
import { MetricCard } from '@/components/lmis/metric-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import {
  SECTORS,
  getMetrics,
  getChartData,
  getWatchlist,
  toCSV,
  type Sector,
  type WatchlistEntry,
} from '@/lib/lmis-data';

const severityVariant: Record<WatchlistEntry['severity'], 'destructive' | 'default' | 'secondary'> = {
  Critical: 'destructive',
  High: 'default',
  Moderate: 'secondary',
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    dataKey: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="rounded-md border border-slate-200 bg-white px-3 py-2 shadow-md">
      <p className="mb-1.5 text-xs font-semibold text-slate-900">{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center gap-2 text-xs">
          <span
            className="inline-block h-2.5 w-2.5 rounded-sm shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-slate-500 capitalize">{entry.dataKey}:</span>
          <span className="font-mono tabular-nums font-medium text-slate-900">
            {entry.value.toLocaleString('en-IN')}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function NationalOverviewPage() {
  const [sector, setSector] = useState<Sector>('All Sectors');

  const metrics = useMemo(() => getMetrics(sector), [sector]);
  const chartData = useMemo(() => getChartData(sector), [sector]);
  const watchlist = useMemo(() => getWatchlist(sector), [sector]);

  const handleExport = () => {
    const rows = watchlist.map((w) => ({
      Occupation: w.occupation,
      Sector: w.sector,
      District: w.district,
      State: w.state,
      'Current Seats': w.currentSeats,
      'Required Seats': w.requiredSeats,
      Deficit: w.deficit,
      Severity: w.severity,
      'Months to Action': w.monthsToAction,
    }));
    const csv = toCSV(rows);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lmis-watchlist-${sector.replace(/\s+/g, '-').toLowerCase()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">National Overview</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Labour Market Intelligence System — Government of India
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-64 hidden md:block">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search occupations, districts..." 
              className="w-full bg-white border border-slate-200 rounded-md pl-9 pr-3 py-1.5 text-xs focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
            <div className="text-right text-xs">
              <span className="font-semibold text-slate-900 block leading-tight">Nodal Officer</span>
              <span className="text-[10px] text-slate-500">Govt. of India</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
              NI
            </div>
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Filter className="h-4 w-4 text-slate-400 shrink-0" />
          <Select value={sector} onValueChange={(v) => setSector(v as Sector)}>
            <SelectTrigger className="w-[180px] bg-white text-xs">
              <SelectValue placeholder="Select sector" />
            </SelectTrigger>
            <SelectContent>
              {SECTORS.map((s) => (
                <SelectItem key={s} value={s} className="text-xs">
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="hidden text-xs text-slate-400 sm:inline">
            Showing data for <span className="font-medium text-slate-600">{sector}</span>
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
          className="border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-medium"
        >
          <Download className="mr-2 h-3.5 w-3.5 text-slate-500" />
          Export CSV
        </Button>
      </div>

      {/* Metric Grid */}
      <div className="grid grid-cols-1 border border-slate-200 bg-white sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
        <MetricCard
          label="Occupations Analyzed"
          value={metrics.occupationsAnalyzed.toLocaleString('en-IN')}
          unit="roles"
          trend={4}
          trendLabel="vs last quarter"
        />
        <MetricCard
          label="Districts Reporting"
          value={metrics.districtsReporting.toLocaleString('en-IN')}
          unit="districts"
          trend={8}
          trendLabel="vs last month"
        />
        <MetricCard
          label="Critical Shortages"
          value={metrics.criticalShortages.toLocaleString('en-IN')}
          unit="occupations"
          trend={12}
          trendLabel="vs last quarter"
          tone="destructive"
        />
        <MetricCard
          label="Oversupply Risks"
          value={metrics.oversupplyRisks.toLocaleString('en-IN')}
          unit="occupations"
          trend={-3}
          trendLabel="vs last quarter"
          tone="warning"
        />
      </div>

      {/* Demand vs Capacity Chart */}
      <div className="border border-slate-200 bg-white">
        <div className="flex flex-col gap-1 border-b border-slate-200 px-5 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-tight text-slate-900">
              Industry Demand vs Training Seat Capacity
            </h2>
            <span className="text-xs text-slate-400">Top 10 by demand</span>
          </div>
          <p className="text-xs text-slate-500">
            Annual workforce demand compared against sanctioned training seats
          </p>
        </div>
        <div className="h-[380px] w-full px-2 py-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 20, left: 10, bottom: 75 }}
              barGap={2}
              barCategoryGap="18%"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis
                dataKey="occupation"
                tick={{ fill: '#64748B', fontSize: 11 }}
                angle={-30}
                textAnchor="end"
                interval={0}
                height={75}
                stroke="#CBD5E1"
              />
              <YAxis
                tick={{ fill: '#64748B', fontSize: 11 }}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                stroke="#CBD5E1"
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F1F5F9' }} />
              <Legend
                wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
                iconType="square"
                iconSize={10}
              />
              <Bar dataKey="demand" fill="#334155" name="Industry Demand" radius={[2, 2, 0, 0]} />
              <Bar dataKey="capacity" fill="#94A3B8" name="Training Capacity" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Priority Action Watchlist */}
      <div className="border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
            <h2 className="text-sm font-semibold tracking-tight text-slate-900">
              Priority Action Watchlist
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            {watchlist.length} shortage occupations flagged
          </span>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200 hover:bg-transparent bg-slate-50/50">
                <TableHead className="text-slate-500">Occupation</TableHead>
                <TableHead className="text-slate-500">District</TableHead>
                <TableHead className="text-slate-500">State</TableHead>
                <TableHead className="text-right text-slate-500">Current Seats</TableHead>
                <TableHead className="text-right text-slate-500">Required Seats</TableHead>
                <TableHead className="text-right text-slate-500">Deficit</TableHead>
                <TableHead className="text-center text-slate-500">Severity</TableHead>
                <TableHead className="text-center text-slate-500">Action Window</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {watchlist.map((entry) => (
                <TableRow key={`${entry.occupation}-${entry.district}`} className="border-slate-200 text-xs">
                  <TableCell className="font-medium text-slate-900">{entry.occupation}</TableCell>
                  <TableCell className="text-slate-600">{entry.district}</TableCell>
                  <TableCell className="text-slate-600">{entry.state}</TableCell>
                  <TableCell className="text-right font-mono tabular-nums text-slate-600">
                    {entry.currentSeats.toLocaleString('en-IN')}
                  </TableCell>
                  <TableCell className="text-right font-mono tabular-nums text-slate-600">
                    {entry.requiredSeats.toLocaleString('en-IN')}
                  </TableCell>
                  <TableCell className="text-right font-mono tabular-nums font-semibold text-rose-600">
                    −{entry.deficit.toLocaleString('en-IN')}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={severityVariant[entry.severity]} className="text-[10px] rounded-xs font-semibold">
                      {entry.severity}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-mono tabular-nums">
                      <Clock className="h-3 w-3 text-slate-400 shrink-0" />
                      {entry.monthsToAction} mo
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}