import { siteConfig } from '@/config/site.js';
import { Button } from '@/components/ui/Button.jsx';

export function AdminTopbar({ onMenuToggle, admin, onLogout }) {
  return (
    <header className="sticky top-0 z-30 border-b border-brand-border bg-white/95 backdrop-blur">
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button type="button" className="rounded-2xl border border-brand-border px-3 py-2 lg:hidden" onClick={onMenuToggle}>
            Menu
          </button>
          <div>
            <p className="font-display text-lg font-semibold text-brand-dark">{siteConfig.adminTitle}</p>
            <p className="text-sm text-brand-secondary">Architecture scaffold and route shell</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden rounded-full bg-blue-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue sm:block">
            {import.meta.env.VITE_ADMIN_AUTH_MODE || 'mock'} mode
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-brand-dark">{admin?.name || 'Admin User'}</p>
            <p className="text-xs text-brand-secondary">{admin?.email || 'No active session'}</p>
          </div>
          <Button variant="secondary" onClick={onLogout}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}