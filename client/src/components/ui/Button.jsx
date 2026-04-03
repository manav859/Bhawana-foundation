import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn.js';

const variantClasses = {
  primary: 'bg-primary-blue text-white hover:bg-blue-700',
  secondary: 'border border-border-light bg-white text-text-dark hover:border-primary-blue hover:text-primary-blue',
  ghost: 'bg-transparent text-text-secondary hover:bg-gray-100 hover:text-text-dark',
  warm: 'bg-warm-orange text-white hover:bg-amber-600',
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
    'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60',
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