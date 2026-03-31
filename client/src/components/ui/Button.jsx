import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn.js';

const variantClasses = {
  primary: 'bg-brand-blue text-white hover:bg-blue-700',
  secondary: 'border border-brand-border bg-white text-brand-dark hover:border-brand-blue hover:text-brand-blue',
  ghost: 'bg-transparent text-brand-secondary hover:bg-slate-100 hover:text-brand-dark',
  warm: 'bg-brand-warm text-white hover:bg-amber-500',
};

export function Button({
  to,
  href,
  type = 'button',
  variant = 'primary',
  className = '',
  children,
  ...props
}) {
  const classes = cn(
    'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60',
    variantClasses[variant],
    className,
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}