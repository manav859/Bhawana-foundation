import { NavLink } from 'react-router-dom';
import { BrandMark } from '@/components/common/BrandMark.jsx';
import { adminNavigation } from '@/config/navigation.js';
import { cn } from '@/utils/cn.js';

export function AdminSidebar({ open, onClose }) {
  return (
    <>
      <div className={cn('fixed inset-0 z-40 bg-slate-950/40 lg:hidden', open ? 'block' : 'hidden')} onClick={onClose} />
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-brand-border bg-white px-5 py-6 transition-transform lg:static lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex items-center justify-between">
          <BrandMark compact />
          <button type="button" className="rounded-xl border border-brand-border px-3 py-2 lg:hidden" onClick={onClose}>
            Close
          </button>
        </div>

        <nav className="mt-8 grid gap-2">
          {adminNavigation.map((item) =>
            item.separator ? (
              <div key={item.label} className="px-4 pt-4 pb-1 text-xs font-bold text-brand-secondary/60 uppercase tracking-widest select-none">
                {item.label}
              </div>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/admin'}
                className={({ isActive }) =>
                  cn(
                    'rounded-2xl px-4 py-3 text-sm font-medium text-brand-secondary hover:bg-slate-100 hover:text-brand-dark',
                    isActive && 'bg-blue-50 text-brand-blue',
                  )
                }
                onClick={onClose}
              >
                {item.label}
              </NavLink>
            ),
          )}
        </nav>
      </aside>
    </>
  );
}
