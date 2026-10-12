'use client';

import { useState } from 'react';
import { Download, Filter, Info } from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';

const forecastData = [
  { year: '2022', Historical: 1200, Forecast: null, UpperBound: null },
  { year: '2023', Historical: 1800, Forecast: null, UpperBound: null },
  { year: '2024', Historical: 2600, Forecast: null, UpperBound: null },
  { year: '2025', Historical: 3400, Forecast: 3400, UpperBound: 3400 },
  { year: '2026 (F)', Historical: null, Forecast: 4200, UpperBound: 4500 },
  { year: '2027 (F)', Historical: null, Forecast: 5100, UpperBound: 5600 },
];

export default function TradeForecastPage() {
  const [selectedTrade, setSelectedTrade] = useState('Solar PV Technician');

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      <div className="bg-white border border-slate-200 p-4 rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
            Machine Learning Horizon
          </span>
          <h1 className="text-lg font-bold text-slate-900 tracking-tight">Trade Demand Forecasting</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Predictive demand curves for the 2026–2027 training cycle.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-white border border-slate-300 rounded px-2.5 py-1 text-xs">
            <Filter className="w-3 h-3 text-slate-400" />
            <select 
              value={selectedTrade} 
              onChange={(e) => setSelectedTrade(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none"
            >
              <option value="Solar PV Technician">Solar PV Technician</option>
              <option value="Staff Nurse (GNM)">Staff Nurse (GNM)</option>
              <option value="CNC Machine Operator">CNC Machine Operator</option>
            </select>
          </div>

          <button className="flex items-center gap-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-medium text-xs px-3 py-1 rounded">
            <Download className="w-3 h-3 text-slate-500" />
            <span>Export Forecast CSV</span>
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
            Demand History vs ML Projection Horizon (2022–2027)
          </h2>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-600 bg-slate-50 border border-slate-200 px-2 py-1">
            <Info className="w-3 h-3 text-blue-700" />
            <span>Model MAE: 4.2%</span>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={forecastData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#64748B' }} />
              <YAxis tick={{ fontSize: 10, fill: '#64748B' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1E293B', borderRadius: '2px', border: 'none', color: '#FFF', fontSize: '11px' }}
              />
              <Legend wrapperStyle={{ paddingTop: '8px', fontSize: '11px' }} />
              <Area type="monotone" dataKey="Historical" stroke="#334155" strokeWidth={2} fill="#94A3B8" fillOpacity={0.2} name="Historical Postings" />
              <Area type="monotone" dataKey="Forecast" stroke="#2563EB" strokeWidth={2} fill="#3B82F6" fillOpacity={0.15} name="Forecast Demand" />
              <Area type="monotone" dataKey="UpperBound" stroke="#93C5FD" strokeDasharray="3 3" fill="none" name="Upper Confidence Bound" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}