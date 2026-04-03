import { siteConfig } from '@/config/site.js';
import { cn } from '@/utils/cn.js';

export function BrandMark({ compact = false, theme = 'light', className = '' }) {
  const lightTheme = theme === 'light';

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-blue text-sm font-bold uppercase tracking-[0.3em] text-white shadow-lg shadow-blue-200">
        BF
      </div>
      {!compact && (
        <div>
          <div className={cn('font-display text-lg font-semibold', lightTheme ? 'text-brand-dark' : 'text-white')}>
            {siteConfig.name}
          </div>
          <div className={cn('text-xs', lightTheme ? 'text-brand-secondary' : 'text-slate-300')}>
            {siteConfig.tagline}
          </div>
        </div>
      )}
    </div>
  );
}
