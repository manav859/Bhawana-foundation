import React from 'react';
import { cn } from '@/utils/cn.js';

export const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex w-full px-4 py-3 rounded-lg border border-border-light bg-bg-light font-sans text-[15px] text-text-dark file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-muted focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";
