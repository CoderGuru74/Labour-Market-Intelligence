import { Sidebar } from '@/components/lmis/sidebar';
import '@/app/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-100 text-slate-900 flex min-h-screen antialiased font-sans">
        {/* Fixed Left Sidebar */}
        <Sidebar />
        
        {/* Main Workspace Offset by Sidebar Width (lg:pl-60) */}
        <div className="flex-1 flex flex-col min-w-0 lg:pl-60">
          <main className="p-6 flex-1 w-full max-w-[1600px] mx-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}