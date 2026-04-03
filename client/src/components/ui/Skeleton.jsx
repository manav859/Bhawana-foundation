import React from 'react';

/**
 * Reusable Skeleton component for modern loading states.
 * @param {string} className Tailwind classes for styling (e.g., width, height, rounded)
 */
export function Skeleton({ className = "" }) {
  return (
    <div 
      className={`animate-pulse bg-slate-200 rounded-md ${className}`} 
      aria-hidden="true"
    />
  );
}

/**
 * Pre-styled Skeleton for a Card (used in Projects, Blog, etc.)
 */
export function CardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden border border-border-light bg-white shadow-sm p-4 gap-4 h-full">
      <Skeleton className="w-full aspect-video rounded-xl" />
      <div className="flex flex-col gap-3 flex-1">
        <Skeleton className="w-1/4 h-4 rounded-full" />
        <Skeleton className="w-3/4 h-6 rounded-md" />
        <Skeleton className="w-full h-20 rounded-md" />
        <div className="mt-auto pt-4 flex justify-between gap-4">
          <Skeleton className="w-24 h-8 rounded-lg" />
          <Skeleton className="w-24 h-8 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

/**
 * Pre-styled Skeleton for a Horizontal Event Card
 */
export function EventSkeleton() {
  return (
    <div className="flex flex-col md:flex-row items-center bg-white rounded-[24px] p-6 lg:p-8 shadow-sm border border-border-light/50 gap-6 lg:gap-10 w-full">
      <Skeleton className="w-full md:w-[240px] aspect-video md:aspect-[4/3] rounded-2xl shrink-0" />
      <div className="flex flex-col items-center justify-center min-w-[80px] gap-2">
        <Skeleton className="w-12 h-4" />
        <Skeleton className="w-16 h-12" />
      </div>
      <div className="flex flex-col flex-1 gap-4">
        <Skeleton className="w-24 h-6 rounded-full" />
        <Skeleton className="w-3/4 h-8 rounded-md" />
        <div className="flex gap-4">
          <Skeleton className="w-32 h-4" />
          <Skeleton className="w-32 h-4" />
        </div>
      </div>
      <Skeleton className="w-full md:w-[150px] h-12 rounded-xl" />
    </div>
  );
}
