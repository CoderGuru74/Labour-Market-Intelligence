'use client';

import { Calendar, Bell, Search } from 'lucide-react';
import { MobileSidebar } from './mobile-sidebar';

interface NavbarProps {
  title: string;
  subtitle?: string;
}

export function Navbar({ title, subtitle }: NavbarProps) {
  const today = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur-sm lg:px-6">
      <div className="flex items-center gap-3">
        <MobileSidebar />
        <div className="flex flex-col">
          <h1 className="text-base font-semibold tracking-tight text-slate-900">{title}</h1>
          {subtitle && (
            <p className="hidden text-xs text-slate-500 sm:block">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 lg:gap-4">
        <div className="hidden items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 md:flex">
          <Search className="h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search occupations, districts..."
            className="w-48 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
          />
        </div>

        <div className="hidden items-center gap-1.5 text-xs font-medium text-slate-500 lg:flex">
          <Calendar className="h-3.5 w-3.5 text-slate-400" />
          <span className="font-mono-t">{today}</span>
        </div>

        <button className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50">
          <Bell className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2 border-l border-slate-200 pl-3 lg:pl-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
            NI
          </div>
          <div className="hidden flex-col leading-none lg:flex">
            <span className="text-xs font-medium text-slate-700">Nodal Officer</span>
            <span className="text-[11px] text-slate-400">Govt. of India</span>
          </div>
        </div>
      </div>
    </header>
  );
}
