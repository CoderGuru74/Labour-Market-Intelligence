'use client';

import { useState } from 'react';
import { ShieldAlert, AlertTriangle, Filter, CheckCircle2 } from 'lucide-react';

const alertItems = [
  {
    id: 'ALT-101',
    district: 'Patna',
    state: 'Bihar',
    occupation: 'Solar PV Installer & Technician',
    sector: 'Renewable Energy',
    demand: 8200,
    supply: 3100,
    gap: 5100,
    gapPct: 62,
    severity: 'CRITICAL',
    trigger: 'Deficit > 50% & Capacity Under-utilized',
  },
  {
    id: 'ALT-102',
    district: 'Pune',
    state: 'Maharashtra',
    occupation: 'CNC Machine Operator',
    sector: 'Manufacturing',
    demand: 18600,
    supply: 9200,
    gap: 9400,
    gapPct: 51,
    severity: 'CRITICAL',
    trigger: 'High Growth Rate & Industry Vacancies Unfilled',
  },
  {
    id: 'ALT-103',
    district: 'Jaipur',
    state: 'Rajasthan',
    occupation: 'Healthcare Assistant',
    sector: 'Healthcare',
    demand: 9200,
    supply: 5100,
    gap: 4100,
    gapPct: 45,
    severity: 'MODERATE',
    trigger: 'Capacity Deficit > 40%',
  },
];

export default function EarlyWarningPage() {
  const [filterSeverity, setFilterSeverity] = useState('ALL');

  const filteredAlerts = alertItems.filter(alert => 
    filterSeverity === 'ALL' || alert.severity === filterSeverity
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white border border-slate-200 p-4 rounded-sm flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-slate-900">Early Warning Center</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated decision-support notifications flagging emerging skill deficits and oversupply risks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select 
            value={filterSeverity} 
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="bg-white border border-slate-300 rounded text-xs font-semibold px-2.5 py-1 focus:outline-none"
          >
            <option value="ALL">All Severity Rules</option>
            <option value="CRITICAL">Critical Only (&gt;50% Deficit)</option>
            <option value="MODERATE">Moderate Only (&gt;30% Deficit)</option>
          </select>
        </div>
      </div>

      {/* Alert Feed Table */}
      <div className="bg-white border border-slate-200 rounded-sm overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-[10px] text-slate-500 uppercase font-bold">
              <th className="p-3">Alert ID</th>
              <th className="p-3">District / State</th>
              <th className="p-3">Target Occupation</th>
              <th className="p-3 text-right">Demand</th>
              <th className="p-3 text-right">Supply</th>
              <th className="p-3 text-right">Deficit</th>
              <th className="p-3 text-center">Severity</th>
              <th className="p-3">Trigger Rule</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono">
            {filteredAlerts.map((alert) => (
              <tr key={alert.id} className="hover:bg-slate-50/80 transition">
                <td className="p-3 font-bold text-slate-900">{alert.id}</td>
                <td className="p-3 font-sans">
                  <span className="font-semibold text-slate-900 block">{alert.district}</span>
                  <span className="text-[10px] text-slate-500">{alert.state}</span>
                </td>
                <td className="p-3 font-sans font-medium text-slate-800">{alert.occupation}</td>
                <td className="p-3 text-right">{alert.demand.toLocaleString()}</td>
                <td className="p-3 text-right">{alert.supply.toLocaleString()}</td>
                <td className="p-3 text-right font-bold text-slate-900">+{alert.gap.toLocaleString()}</td>
                <td className="p-3 text-center font-sans">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                    alert.severity === 'CRITICAL' 
                      ? 'bg-rose-50 text-rose-800 border-rose-200' 
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}>
                    {alert.severity}
                  </span>
                </td>
                <td className="p-3 font-sans text-slate-600 text-[11px]">{alert.trigger}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}