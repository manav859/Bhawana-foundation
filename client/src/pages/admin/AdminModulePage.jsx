import { PlaceholderPanel } from '@/components/common/PlaceholderPanel.jsx';

export function AdminModulePage({ title, resource, description }) {
  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow">Admin module</p>
        <h1 className="mt-4 font-display text-3xl font-semibold text-brand-dark">{title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-brand-secondary">{description}</p>
      </div>

      <PlaceholderPanel
        title="Module scaffold"
        description="List layout, API service hooks, and protected route structure are in place. Real tables, filters, forms, and mutations will be introduced in later phases."
        bullets={[
          `Resource key: ${resource}`,
          'Admin service layer already exposes list, get, create, update, and delete helpers.',
          'Backend module folder and route namespace are reserved for this resource.',
        ]}
      />
    </div>
  );
}