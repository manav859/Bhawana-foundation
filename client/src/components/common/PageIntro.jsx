import { cn } from '@/utils/cn.js';

export function PageIntro({ eyebrow = 'Scaffold', title, description, className = '' }) {
  return (
    <div className={cn('space-y-4', className)}>
      <span className="eyebrow">{eyebrow}</span>
      <div className="space-y-3">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-brand-dark sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="max-w-3xl text-sm leading-7 text-brand-secondary sm:text-base">{description}</p>
      </div>
    </div>
  );
}
