import { FileQuestion } from 'lucide-react';
import { Button } from '@/components/ui/Button.jsx';

export function PublicEmptyState({
  title = 'Nothing here yet',
  message = "We're currently updating this section with new content. Please check back later.",
  icon: Icon = FileQuestion,
  action,
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center space-y-5 rounded-3xl border border-brand-border bg-brand-light/50 px-6 py-12 text-center shadow-sm">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
        <Icon className="h-10 w-10 text-brand-accent cursor-pointer" />
      </div>

      <div className="max-w-md space-y-2">
        <h3 className="font-display text-xl font-semibold text-brand-dark">{title}</h3>
        <p className="text-base text-brand-secondary">{message}</p>
      </div>

      {action && actionLabel && (
        <Button onClick={onAction} to={typeof action === 'string' ? action : undefined} variant="primary">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
