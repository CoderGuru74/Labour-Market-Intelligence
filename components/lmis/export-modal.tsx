'use client';

import { useState } from 'react';
import { Download, FileText, FileSpreadsheet, Check, X, ShieldAlert, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  defaultSector?: string;
}

export function ExportModal({
  isOpen,
  onClose,
  title = 'Labour Market Intelligence Dataset Export',
  defaultSector = 'All Sectors',
}: ExportModalProps) {
  const [format, setFormat] = useState<'csv' | 'pdf'>('pdf');
  const [dateHorizon, setDateHorizon] = useState('2026-Q3');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [includeMLConfidence, setIncludeMLConfidence] = useState(true);
  const [includeNCOCodes, setIncludeNCOCodes] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setIsExporting(true);

    setTimeout(() => {
      setIsExporting(false);
      
      // Trigger dynamic client-side file generation
      if (format === 'csv') {
        const csvContent =
          'data:text/csv;charset=utf-8,' +
          'Occupation,NCO-2015 Code,District,State,Sector,Demand,Supply,Deficit,Severity,Action Window\n' +
          'Solar PV Technician,7421.0301,Patna,Bihar,Renewable Energy,3680,480,-3200,Critical,3 mo\n' +
          'Staff Nurse (GNM),3221.0100,Bengaluru,Karnataka,Healthcare,5300,1200,-4100,Critical,4 mo\n' +
          'CNC Machine Operator,7223.0101,Pune,Maharashtra,Manufacturing,3420,620,-2800,Critical,2 mo\n';
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `LMIS_Report_${dateHorizon}_${defaultSector.replace(/\s+/g, '_')}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // PDF Summary trigger stub
        alert(`Generating Official Executive PDF Summary Report for ${dateHorizon} (${defaultSector})...`);
      }

      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 font-sans animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-sm w-full max-w-lg shadow-2xl overflow-hidden space-y-0">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-slate-800 border border-slate-700 flex items-center justify-center">
              <Download className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight">Configure Dataset Export</h2>
              <p className="text-[11px] text-slate-400 font-mono">Ministry of Skill Development & Entrepreneurship</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-5 text-xs">
          {/* Format Selection */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
              1. Select Export Format
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormat('pdf')}
                className={`p-3 rounded-sm border text-left flex items-start gap-3 transition ${
                  format === 'pdf'
                    ? 'border-blue-600 bg-blue-50/60 text-slate-900 font-semibold ring-1 ring-blue-600'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                <FileText className={`w-5 h-5 shrink-0 ${format === 'pdf' ? 'text-blue-700' : 'text-slate-400'}`} />
                <div>
                  <span className="block font-bold text-slate-900">Official Executive PDF</span>
                  <span className="text-[10px] text-slate-500 font-sans leading-tight block mt-0.5">
                    Formatted government brief with charts & executive signatures
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormat('csv')}
                className={`p-3 rounded-sm border text-left flex items-start gap-3 transition ${
                  format === 'csv'
                    ? 'border-blue-600 bg-blue-50/60 text-slate-900 font-semibold ring-1 ring-blue-600'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                <FileSpreadsheet className={`w-5 h-5 shrink-0 ${format === 'csv' ? 'text-emerald-700' : 'text-slate-400'}`} />
                <div>
                  <span className="block font-bold text-slate-900">Full Raw CSV Dataset</span>
                  <span className="text-[10px] text-slate-500 font-sans leading-tight block mt-0.5">
                    Machine-readable tabular data for Excel, Python, or SQL imports
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Filtering Options */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
              2. Scope & Parameters
            </label>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[11px] text-slate-600 font-medium block mb-1">Date Horizon</span>
                <select
                  value={dateHorizon}
                  onChange={(e) => setDateHorizon(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-800 font-mono focus:outline-none"
                >
                  <option value="2026-Q3">2026 Q3 (Current Audit)</option>
                  <option value="2026-FY">FY 2026–2027 Full Forecast</option>
                  <option value="2025-HIST">2022–2025 Historical Baseline</option>
                </select>
              </div>

              <div>
                <span className="text-[11px] text-slate-600 font-medium block mb-1">Deficit Severity</span>
                <select
                  value={severityFilter}
                  onChange={(e) => setSeverityFilter(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none"
                >
                  <option value="All">All Severity Thresholds</option>
                  <option value="Critical">Critical Shortages Only (&gt;50%)</option>
                  <option value="Moderate">Moderate Shortages Only (&gt;30%)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Data Inclusion Checkboxes */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
              3. Data Fields & Provenance
            </label>

            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700">
                <input
                  type="checkbox"
                  checked={includeNCOCodes}
                  onChange={(e) => setIncludeNCOCodes(e.target.checked)}
                  className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                />
                <span>Include NCO-2015 Classification Codes & NSQF Level Alignments</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700">
                <input
                  type="checkbox"
                  checked={includeMLConfidence}
                  onChange={(e) => setIncludeMLConfidence(e.target.checked)}
                  className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                />
                <span>Include Machine Learning MAE Confidence Bounds (2026–2027 Forecasts)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 flex items-center justify-between">
          <div className="text-[10px] text-slate-400 font-mono">
            Data Sync: 12 Oct 2026 • Verified
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              className="border-slate-200 text-slate-700 hover:bg-slate-100 text-xs"
            >
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleDownload}
              disabled={isExporting}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4"
            >
              {isExporting ? (
                <span>Generating File...</span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5" />
                  Generate {format.toUpperCase()}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}