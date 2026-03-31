import { Link } from 'react-router-dom';
import { adminNavigation } from '@/config/navigation.js';

export function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow">Admin dashboard</p>
        <h1 className="mt-4 font-display text-3xl font-semibold text-brand-dark">Operations shell ready</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-brand-secondary">
          This dashboard confirms the protected admin layout, responsive sidebar, route structure, and future CRUD entry points for website management.
        </p>
      </div>

      <div className="admin-grid">
        {adminNavigation.slice(1).map((item) => (
          <Link key={item.to} to={item.to} className="surface-card p-5 hover:border-brand-blue">
            <h2 className="font-display text-xl font-semibold text-brand-dark">{item.label}</h2>
            <p className="mt-2 text-sm text-brand-secondary">Scaffolded route and layout shell for future management tools.</p>
          </Link>
        ))}
      </div>
    </div>
  );
}