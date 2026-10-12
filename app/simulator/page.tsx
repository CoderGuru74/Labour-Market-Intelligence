'use client';

import { useState } from 'react';
import { Sliders, RotateCcw, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function CapacitySimulatorPage() {
  const [additionalSeats, setAdditionalSeats] = useState(0);
  const [completionRate, setCompletionRate] = useState(75);

  const baselineDeficit = 95000;
  const effectiveSupplyAdded = Math.round(additionalSeats * (completionRate / 100));
  const remainingDeficit = Math.max(0, baselineDeficit - effectiveSupplyAdded);

  const handleReset = () => {
    setAdditionalSeats(0);
    setCompletionRate(75);
  };

  return (
    <div className="space-y-6">
      {/* Title Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Capacity Simulator</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Model the impact of additional training seats and completion rates on skill deficits
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right text-xs">
            <span className="font-semibold text-slate-900 block leading-tight">Nodal Officer</span>
            <span className="text-[10px] text-slate-500">Govt. of India</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
            NI
          </div>
        </div>
      </div>

      {/* KPI Outputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white border border-slate-200 p-4 rounded-sm text-xs">
        <div>
          <span className="text-slate-500 text-[11px] uppercase font-semibold block">Current Skill Deficit</span>
          <span className="text-xl font-bold font-mono tabular-nums text-slate-900">{baselineDeficit.toLocaleString('en-IN')}</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">workers unfilled</span>
        </div>

        <div>
          <span className="text-slate-500 text-[11px] uppercase font-semibold block">Remaining Deficit</span>
          <span className="text-xl font-bold font-mono tabular-nums text-rose-600">{remainingDeficit.toLocaleString('en-IN')}</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">
            after simulation ({Math.round(((baselineDeficit - remainingDeficit) / baselineDeficit) * 100)}% reduction)
          </span>
        </div>

        <div>
          <span className="text-slate-500 text-[11px] uppercase font-semibold block">Additional Seats Allocated</span>
          <span className="text-xl font-bold font-mono tabular-nums text-slate-900">+{additionalSeats.toLocaleString('en-IN')}</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">seats across 8 occupations</span>
        </div>
      </div>

      {/* Controls & Graph Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Card */}
        <div className="lg:col-span-5 bg-white border border-slate-200 p-5 space-y-6 rounded-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-slate-700" /> Simulation Parameters
            </h2>
            <Button variant="ghost" size="sm" onClick={handleReset} className="h-7 text-xs text-slate-500 hover:text-slate-900">
              <RotateCcw className="w-3 h-3 mr-1" /> Reset
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-800 block">Target Sector</label>
            <Select defaultValue="All Sectors">
              <SelectTrigger className="w-full text-xs h-9">
                <SelectValue placeholder="Select Sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Sectors" className="text-xs">All Sectors</SelectItem>
                <SelectItem value="Renewable Energy" className="text-xs">Renewable Energy</SelectItem>
                <SelectItem value="Healthcare" className="text-xs">Healthcare</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-800">Additional Training Seats</span>
              <span className="font-mono tabular-nums font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                +{additionalSeats.toLocaleString('en-IN')}
              </span>
            </div>
            <Slider
              value={[additionalSeats]}
              min={0}
              max={25000}
              step={500}
              onValueChange={(val) => setAdditionalSeats(val[0])}
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>+0</span>
              <span>+25,000 Seats</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-800">Completion & Entry Rate</span>
              <span className="font-mono tabular-nums font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {completionRate}%
              </span>
            </div>
            <Slider
              value={[completionRate]}
              min={50}
              max={100}
              step={5}
              onValueChange={(val) => setCompletionRate(val[0])}
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs space-y-1 text-slate-600">
            <p className="font-semibold text-slate-900 flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-blue-600" /> Model Efficiency Note
            </p>
            <p className="text-[11px] leading-relaxed">
              Accounting for {completionRate}% entry rate, +{additionalSeats.toLocaleString('en-IN')} allocated seats generate{' '}
              <strong className="text-slate-900 font-mono tabular-nums">+{effectiveSupplyAdded.toLocaleString('en-IN')}</strong> active skilled entrants.
            </p>
          </div>
        </div>

        {/* Results Graph / Table */}
        <div className="lg:col-span-7 bg-white border border-slate-200 p-5 rounded-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3 mb-4">
              Skill Deficit: Current vs. Post-Simulation
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between text-xs font-semibold text-slate-700 border-b border-slate-100 pb-1">
                <span>Top Deficit Trade</span>
                <span>Current Deficit</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center p-2 bg-slate-50 rounded border border-slate-100">
                  <span className="font-medium text-slate-900">Staff Nurse (GNM)</span>
                  <span className="font-mono tabular-nums font-bold text-rose-600">-4,100</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-slate-50 rounded border border-slate-100">
                  <span className="font-medium text-slate-900">Solar PV Technician</span>
                  <span className="font-mono tabular-nums font-bold text-rose-600">-3,200</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-slate-50 rounded border border-slate-100">
                  <span className="font-medium text-slate-900">Full-Stack Developer</span>
                  <span className="font-mono tabular-nums font-bold text-rose-600">-3,200</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-slate-50 rounded border border-slate-100">
                  <span className="font-medium text-slate-900">CNC Machine Operator</span>
                  <span className="font-mono tabular-nums font-bold text-rose-600">-2,800</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 font-mono text-center">
            Dataset Horizon: FY 2026–2027 • MSDE Simulated Model
          </div>
        </div>
      </div>
    </div>
  );
}