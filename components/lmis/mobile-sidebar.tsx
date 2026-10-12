'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, Menu, X, LayoutDashboard, SlidersHorizontal, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';

const NAV_ITEMS = [
  { href: '/', label: 'National Overview', icon: LayoutDashboard },
  { href: '/simulator', label: 'Capacity Simulator', icon: SlidersHorizontal },
  { href: '/geography', label: 'State & District', icon: MapPin },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-1 px-3 py-4">
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
            onClick={onNavigate}
            className={cn(
              'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
              active
                ? 'bg-slate-100 text-slate-900'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            )}
          >
            <Icon className={cn('h-4 w-4', active ? 'text-slate-900' : 'text-slate-400')} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 lg:hidden">
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 border-slate-200 bg-white p-0">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <div className="flex h-16 items-center gap-2.5 border-b border-slate-200 px-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-900">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-semibold tracking-tight text-slate-900">LMIS</span>
            <span className="text-[11px] text-slate-500">Dashboard</span>
          </div>
        </div>
        <NavLinks onNavigate={() => setOpen(false)} />
        <div className="mt-auto border-t border-slate-200 px-5 py-4">
          <div className="text-[11px] leading-relaxed text-slate-400">
            Ministry of Skill Development<br />&amp; Entrepreneurship
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
