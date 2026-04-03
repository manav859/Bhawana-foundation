import { Button } from '@/components/ui/Button.jsx';

export function PlaceholderPanel({ title, description, bullets = [], action }) {
  return (
    <section className="surface-card p-6 sm:p-8">
      <div className="space-y-4">
        <div>
          <h2 className="font-display text-2xl font-semibold text-brand-dark">{title}</h2>
          <p className="mt-2 text-sm leading-7 text-brand-secondary">{description}</p>
        </div>

        {bullets.length > 0 && (
          <ul className="grid gap-3 text-sm text-brand-secondary sm:grid-cols-2">
            {bullets.map((bullet) => (
              <li key={bullet} className="rounded-2xl border border-brand-border bg-slate-50 px-4 py-3">
                {bullet}
              </li>
            ))}
          </ul>
        )}

        {action && (
          <div>
            <Button to={action.to} variant={action.variant || 'primary'}>
              {action.label}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
