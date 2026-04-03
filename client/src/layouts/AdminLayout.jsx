import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from '@/components/navigation/AdminSidebar.jsx';
import { AdminTopbar } from '@/components/navigation/AdminTopbar.jsx';
import { useAuth } from '@/features/auth/auth.context.jsx';

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { admin, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-100 text-brand-dark">
      <div className="flex min-h-screen">
        <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex min-h-screen flex-1 flex-col">
          <AdminTopbar
            onMenuToggle={() => setSidebarOpen((current) => !current)}
            admin={admin}
            onLogout={logout}
          />
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
