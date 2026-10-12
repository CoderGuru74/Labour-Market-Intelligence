import { Sidebar } from '@/components/lmis/sidebar';
import { Navbar } from '@/components/lmis/navbar';

interface DashboardLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function DashboardLayout({ title, subtitle, children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar />
      <div className="lg:pl-60">
        <Navbar title={title} subtitle={subtitle} />
        <main className="lmis-scrollbar px-4 py-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
