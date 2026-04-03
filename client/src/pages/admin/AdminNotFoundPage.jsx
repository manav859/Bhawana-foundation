import { Button } from '@/components/ui/Button.jsx';

export function AdminNotFoundPage() {
  return (
    <div className="surface-card p-8 sm:p-10">
      <p className="eyebrow">Admin 404</p>
      <h1 className="mt-4 font-display text-3xl font-semibold text-brand-dark">Admin route not found</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-brand-secondary">
        This admin path is outside the Phase 1 scaffold. Use the sidebar or return to the dashboard.
      </p>
      <div className="mt-6">
        <Button to="/admin">Return to dashboard</Button>
      </div>
    </div>
  );
}
