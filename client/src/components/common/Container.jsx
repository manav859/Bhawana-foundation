import { cn } from '@/utils/cn.js';

export function Container({ as: Component = 'div', className = '', children }) {
  return <Component className={cn('page-shell', className)}>{children}</Component>;
}
