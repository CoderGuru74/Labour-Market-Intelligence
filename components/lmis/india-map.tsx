'use client';

import { useState } from 'react';
import { MapPin, Info } from 'lucide-react';

export interface StateMetrics {
  id: string;
  name: string;
  districtsCount: number;
  totalDemand: number;
  totalSupply: number;
  gap: number;
  severity: 'Critical' | 'High' | 'Moderate' | 'Low';
  topTrade: string;
}

export const STATE_METRICS_DATA: Record<string, StateMetrics> = {
  'Bihar': {
    id: 'BR',
    name: 'Bihar',
    districtsCount: 38,
    totalDemand: 18300,
    totalSupply: 9500,
    gap: 8800,
    severity: 'Critical',
    topTrade: 'Solar PV Installer & Technician',
  },
  'Maharashtra': {
    id: 'MH',
    name: 'Maharashtra',
    districtsCount: 36,
    totalDemand: 55000,
    totalSupply: 32800,
    gap: 22200,
    severity: 'Critical',
    topTrade: 'CNC Machine Operator',
  },
  'Karnataka': {
    id: 'KA',
    name: 'Karnataka',
    districtsCount: 31,
    totalDemand: 40900,
    totalSupply: 27700,
    gap: 13200,
    severity: 'High',
    topTrade: 'Full-Stack Developer / GNM Nurse',
  },
  'Telangana': {
    id: 'TS',
    name: 'Telangana',
    districtsCount: 33,
    totalDemand: 21000,
    totalSupply: 14800,
    gap: 6200,
    severity: 'Moderate',
    topTrade: 'Data Analyst',
  },
  'Uttar Pradesh': {
    id: 'UP',
    name: 'Uttar Pradesh',
    districtsCount: 75,
    totalDemand: 32000,
    totalSupply: 18000,
    gap: 14000,
    severity: 'Critical',
    topTrade: 'Construction Site Supervisor',
  },
  'Rajasthan': {
    id: 'RJ',
    name: 'Rajasthan',
    districtsCount: 50,
    totalDemand: 19000,
    totalSupply: 11500,
    gap: 7500,
    severity: 'Moderate',
    topTrade: 'Healthcare Assistant',
  },
  'Tamil Nadu': {
    id: 'TN',
    name: 'Tamil Nadu',
    districtsCount: 38,
    totalDemand: 22200,
    totalSupply: 15400,
    gap: 6800,
    severity: 'Low',
    topTrade: 'Automotive Electrician',
  },
  'Gujarat': {
    id: 'GJ',
    name: 'Gujarat',
    districtsCount: 33,
    totalDemand: 28400,
    totalSupply: 19100,
    gap: 9300,
    severity: 'High',
    topTrade: 'Welder (TIG/MIG)',
  },
};

interface IndiaMapProps {
  selectedState: string;
  onSelectState: (stateName: string) => void;
}

export function IndiaMap({ selectedState, onSelectState }: IndiaMapProps) {
  const [hoveredState, setHoveredState] = useState<StateMetrics | null>(null);

  const activeData = hoveredState || (selectedState !== 'All States' ? STATE_METRICS_DATA[selectedState] : null);

  const getSeverityBadgeClass = (severity: string) => {
    if (severity === 'Critical') return 'bg-rose-950 text-rose-300 border-rose-800';
    if (severity === 'High') return 'bg-amber-950 text-amber-300 border-amber-800';
    return 'bg-blue-950 text-blue-300 border-blue-800';
  };

  return (
    <div className="bg-white border border-slate-200 p-4 rounded-sm space-y-3 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-slate-800" />
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            State-Wise Skill Deficit Heatmap (Select State to Drill Down)
          </h2>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-mono text-slate-600">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-xs bg-rose-600 inline-block"></span> Critical (&gt;40% Deficit)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-xs bg-amber-500 inline-block"></span> High Deficit
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-xs bg-blue-500 inline-block"></span> Moderate
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* State Selection Matrix */}
        <div className="lg:col-span-7 bg-slate-50/70 border border-slate-200 p-3 rounded-sm space-y-2">
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>REGIONAL GIS INDEX</span>
            <span>8 Key States Reporting</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {Object.values(STATE_METRICS_DATA).map((state) => {
              const isSelected = selectedState === state.name;
              return (
                <button
                  key={state.id}
                  onClick={() => onSelectState(isSelected ? 'All States' : state.name)}
                  onMouseEnter={() => setHoveredState(state)}
                  onMouseLeave={() => setHoveredState(null)}
                  className={`p-2.5 rounded text-left transition-all border ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 font-bold shadow-xs'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-slate-400 hover:bg-slate-100/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] opacity-70">{state.id}</span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        state.severity === 'Critical'
                          ? 'bg-rose-500'
                          : state.severity === 'High'
                          ? 'bg-amber-500'
                          : 'bg-blue-500'
                      }`}
                    />
                  </div>
                  <p className="font-semibold text-xs mt-1 truncate">{state.name}</p>
                  <p className="text-[10px] font-mono opacity-80 mt-0.5">
                    Deficit: -{state.gap.toLocaleString('en-IN')}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Analytical Drawer Panel */}
        <div className="lg:col-span-5 bg-slate-900 text-white p-4 rounded-sm space-y-3 font-mono">
          <div className="flex items-start justify-between border-b border-slate-800 pb-2">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block">
                Regional Intelligence Focus
              </span>
              <h3 className="text-base font-bold text-white font-sans mt-0.5">
                {activeData ? activeData.name : selectedState !== 'All States' ? selectedState : 'National Summary'}
              </h3>
            </div>
            {activeData && (
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getSeverityBadgeClass(activeData.severity)}`}>
                {activeData.severity}
              </span>
            )}
          </div>

          {activeData ? (
            <div className="space-y-2 text-xs pt-1">
              <div className="flex justify-between text-slate-300">
                <span className="font-sans text-slate-400">Districts Reporting:</span>
                <span className="font-bold">{activeData.districtsCount} Districts</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="font-sans text-slate-400">Total Industry Demand:</span>
                <span>{activeData.totalDemand.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="font-sans text-slate-400">Sanctioned Seats:</span>
                <span>{activeData.totalSupply.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between border-t border-slate-800 pt-2 text-rose-400 font-bold">
                <span className="font-sans text-slate-400">Calculated Deficit:</span>
                <span>-{activeData.gap.toLocaleString('en-IN')}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 font-sans text-[11px] text-slate-300">
                <span className="text-slate-400 block text-[10px]">HIGHEST DEFICIT OCCUPATION:</span>
                <span className="font-semibold text-blue-300">{activeData.topTrade}</span>
              </div>
            </div>
          ) : (
            <div className="py-4 text-slate-400 text-xs font-sans space-y-1">
              <p className="text-white font-semibold">Select a state above or from the table below.</p>
              <p className="text-[11px] leading-relaxed text-slate-400">
                Displays district-level skill shortages, active ITI seat capacity, and industry hiring trends across all 734 districts.
              </p>
            </div>
          )}

          <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-500 flex items-center gap-1 font-sans">
            <Info className="w-3 h-3 text-blue-400 shrink-0" />
            <span>Data source: NCVT Accreditation Feed & NCS Job Vacancies</span>
          </div>
        </div>
      </div>
    </div>
  );
}