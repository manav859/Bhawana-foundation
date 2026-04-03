import { useParams } from 'react-router-dom';
import { PlaceholderPanel } from '@/components/common/PlaceholderPanel.jsx';

export function AdminEditorPage({ title, resource, mode }) {
  const params = useParams();

  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow">Admin editor</p>
        <h1 className="mt-4 font-display text-3xl font-semibold text-brand-dark">{title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-brand-secondary">
          This is the route shell for the {resource} {mode} flow. Form architecture will be implemented in a later phase.
        </p>
      </div>

      <PlaceholderPanel
        title="Editor route state"
        description="The route structure is ready for reusable admin forms, validation, media uploads, and status controls."
        bullets={[
          `Mode: ${mode}`,
          `Identifier: ${params.id || 'new resource'}`,
          'Route is protected behind the admin auth shell.',
        ]}
      />
    </div>
  );
}
