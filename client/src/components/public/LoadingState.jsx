import { Loader2 } from 'lucide-react';

export function LoadingState({ message = 'Loading content...' }) {
  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center space-y-4 rounded-3xl border border-brand-border border-dashed bg-white">
      <Loader2 className="h-8 w-8 animate-spin text-brand-blue" />
      <p className="font-medium text-brand-secondary">{message}</p>
    </div>
  );
}
