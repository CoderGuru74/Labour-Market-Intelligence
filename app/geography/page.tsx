'use client';

import { useState, useMemo } from 'react';
import { Search, Download, Filter, MapPin, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IndiaMap, STATE_METRICS_DATA } from '@/components/lmis/india-map';
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
import { Badge } from '@/components/ui/badge';

const DISTRICT_DATA = [
  { district: 'Patna', state: 'Bihar', sector: 'Renewable Energy', demand: 8200, supply: 3100, gap: 5100, gapPct: 62, severity: 'Severe', institutes: 8 },
  { district: 'Gaya', state: 'Bihar', sector: 'Construction', demand: 4100, supply: 2400, gap: 1700, gapPct: 41, severity: 'Moderate', institutes: 5 },
  { district: 'Muzaffarpur', state: 'Bihar', sector: 'Agriculture', demand: 3200, supply: 2100, gap: 1100, gapPct: 34, severity: 'Low', institutes: 4 },
  { district: 'Bhagalpur', state: 'Bihar', sector: 'Manufacturing', demand: 2800, supply: 1900, gap: 900, gapPct: 32, severity: 'Low', institutes: 3 },
  { district: 'Pune', state: 'Maharashtra', sector: 'Manufacturing', demand: 18600, supply: 9200, gap: 9400, gapPct: 51, severity: 'Severe', institutes: 19 },
  { district: 'Mumbai', state: 'Maharashtra', sector: 'IT & ITES', demand: 24200, supply: 16800, gap: 7400, gapPct: 31, severity: 'Low', institutes: 34 },
  { district: 'Nagpur', state: 'Maharashtra', sector: 'Automotive', demand: 6800, supply: 3200, gap: 3600, gapPct: 53, severity: 'Severe', institutes: 7 },
  { district: 'Bengaluru', state: 'Karnataka', sector: 'IT & ITES', demand: 28500, supply: 19200, gap: 9300, gapPct: 33, severity: 'Low', institutes: 41 },
  { district: 'Hyderabad', state: 'Telangana', sector: 'IT & ITES', demand: 21000, supply: 14800, gap: 6200, gapPct: 30, severity: 'Low', institutes: 28 },
  { district: 'Lucknow', state: 'Uttar Pradesh', sector: 'Construction', demand: 7600, supply: 4200, gap: 3400, gapPct: 45, severity: 'Moderate', institutes: 9 },
  { district: 'Jaipur', state: 'Rajasthan', sector: 'Healthcare', demand: 9200, supply: 5100, gap: 4100, gapPct: 45, severity: 'Moderate', institutes: 11 },
];

export default function GeographyPage() {
  const [selectedState, setSelectedState] = useState('All States');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    return DISTRICT_DATA.filter((row) => {
      const matchesState = selectedState === 'All States' || row.state === selectedState;
      const matchesSearch =
        row.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.state.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesState && matchesSearch;
    });
  }, [selectedState, searchQuery]);

  const totalDemand = useMemo(() => filteredData.reduce((acc, curr) => acc + curr.demand, 0), [filteredData]);
  const totalGap = useMemo(() => filteredData.reduce((acc, curr) => acc + curr.gap, 0), [filteredData]);

  const handleExportCSV = () => {
    const headers = ['District', 'State', 'Sector', 'Demand', 'Supply', 'Gap', 'Gap %', 'Severity', 'Institutes'];
    const rows = filteredData.map(d => [d.district, d.state, d.sector, d.demand, d.supply, d.gap, `${d.gapPct}%`, d.severity, d.institutes]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `lmis-geography-${selectedState.toLowerCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto font-sans">
      {/* Page Title & Context Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">
            <span>Ministry of Skill Development & Entrepreneurship</span>
            <span>•</span>
            <span className="text-blue-700">734 Districts Reporting</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            State & District Skill Gap Intelligence
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            District-level comparison of industry workforce demand against accredited training seat capacity.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right text-xs">
            <span className="font-semibold text-slate-900 block leading-tight">Nodal Officer</span>
            <span className="text-[10px] text-slate-500 font-mono">Govt. of India</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
            NI
          </div>
        </div>
      </div>

      {/* Regional GIS Component */}
      <IndiaMap selectedState={selectedState} onSelectState={setSelectedState} />

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white border border-slate-200 p-3 rounded-sm">
        <div className="flex items-center gap-3 w-full sm:w-auto flex-1 max-w-lg">
          <div className="relative w-full">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <Input
              type="text"
              placeholder="Search district, state, or sector..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 text-xs h-8 bg-slate-50/50"
            />
          </div>

          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger className="w-[160px] text-xs h-8 bg-slate-50/50">
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All States" className="text-xs">All States</SelectItem>
              {Object.keys(STATE_METRICS_DATA).map((st) => (
                <SelectItem key={st} value={st} className="text-xs">{st}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-500">Filtered Gaps: <strong className="text-slate-900">{filteredData.length} Districts</strong></span>
          <Button variant="outline" size="sm" onClick={handleExportCSV} className="text-xs h-8 border-slate-200">
            <Download className="mr-1.5 h-3.5 w-3.5 text-slate-500" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Data Table */}
      <div className="border border-slate-200 bg-white rounded-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/80 border-slate-200">
              <TableHead className="text-xs font-semibold text-slate-700">District</TableHead>
              <TableHead className="text-xs font-semibold text-slate-700">State</TableHead>
              <TableHead className="text-xs font-semibold text-slate-700">Sector</TableHead>
              <TableHead className="text-xs font-semibold text-slate-700 text-right">Demand</TableHead>
              <TableHead className="text-xs font-semibold text-slate-700 text-right">Supply</TableHead>
              <TableHead className="text-xs font-semibold text-slate-700 text-right">Gap</TableHead>
              <TableHead className="text-xs font-semibold text-slate-700 text-center">Gap %</TableHead>
              <TableHead className="text-xs font-semibold text-slate-700 text-center">Severity</TableHead>
              <TableHead className="text-xs font-semibold text-slate-700 text-right">Institutes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((row) => (
                <TableRow key={`${row.district}-${row.sector}`} className="border-slate-200 text-xs hover:bg-slate-50/60">
                  <TableCell className="font-semibold text-slate-900">{row.district}</TableCell>
                  <TableCell className="text-slate-600">{row.state}</TableCell>
                  <TableCell className="text-slate-600">{row.sector}</TableCell>
                  <TableCell className="text-right font-mono tabular-nums text-slate-800">{row.demand.toLocaleString('en-IN')}</TableCell>
                  <TableCell className="text-right font-mono tabular-nums text-slate-600">{row.supply.toLocaleString('en-IN')}</TableCell>
                  <TableCell className="text-right font-mono tabular-nums font-semibold text-rose-600">-{row.gap.toLocaleString('en-IN')}</TableCell>
                  <TableCell className="text-center font-mono tabular-nums font-medium text-slate-700">{row.gapPct}%</TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={row.severity === 'Severe' ? 'destructive' : row.severity === 'Moderate' ? 'default' : 'secondary'}
                      className="text-[10px] rounded-xs font-semibold"
                    >
                      {row.severity}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono tabular-nums text-slate-600">{row.institutes}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8 text-xs text-slate-400 font-mono">
                  No district data matches the selected filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}