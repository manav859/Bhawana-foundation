import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button.jsx';

export function ErrorState({ title = 'Something went wrong', message = 'We encountered an error loading this content.', onRetry }) {
  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center space-y-4 rounded-3xl border border-brand-border border-dashed bg-rose-50 px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-100/50">
        <AlertCircle className="h-8 w-8 text-rose-500" />
      </div>
      <div className="space-y-1">
        <h3 className="font-display font-semibold text-brand-dark">{title}</h3>
        <p className="text-sm text-brand-secondary">{message}</p>
      </div>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="mt-4">
          Try Again
        </Button>
      )}
    </div>
  );
}
