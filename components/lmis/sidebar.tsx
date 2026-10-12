'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  SlidersHorizontal, 
  MapPin, 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  Bot 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/', label: 'National Overview', icon: LayoutDashboard },
  { href: '/geography', label: 'State & District', icon: MapPin },
  { href: '/forecast', label: 'Trade Forecast', icon: TrendingUp },
  { href: '/alerts', label: 'Early Warning Center', icon: AlertTriangle },
  { href: '/simulator', label: 'Capacity Simulator', icon: SlidersHorizontal },
  { href: '/assistant', label: 'AI Planner Assistant', icon: Bot },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-screen w-60 flex-col border-r border-slate-200 bg-white lg:flex">
      <div className="flex h-16 items-center gap-2.5 border-b border-slate-200 px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-900">
          <BarChart3 className="h-5 w-5 text-white" />
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-sm font-semibold tracking-tight text-slate-900">LMIS</span>
          <span className="text-[11px] text-slate-500">Dashboard</span>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        <div className="px-3 pb-2 text-[11px] font-medium uppercase tracking-wider text-slate-400">
          Navigation
        </div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                active
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              )}
            >
              <Icon className={cn('h-4 w-4', active ? 'text-slate-900' : 'text-slate-400')} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 px-5 py-4">
        <div className="text-[11px] leading-relaxed text-slate-500 font-medium">
          Ministry of Skill Development<br />
          &amp; Entrepreneurship
        </div>
        <div className="mt-2 text-[11px] text-slate-400 font-mono">Data updated: 12 Oct 2026</div>
      </div>
    </aside>
  );
}