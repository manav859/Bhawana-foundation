import { Quote } from 'lucide-react';
import { cn } from '@/utils/cn.js';

export function TestimonialCard({ quote, author, role, image, className }) {
  return (
    <div className={cn(
      "group relative flex flex-col justify-between rounded-3xl bg-white p-8 shadow-sm border border-brand-border/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
      className
    )}>
      <div className="absolute top-6 right-8 text-brand-blue/10 transition-colors group-hover:text-brand-blue/20">
        <Quote size={48} fill="currentColor" />
      </div>
      
      <div className="relative z-10">
        <p className="font-sans text-lg leading-relaxed text-brand-secondary italic">
          "{quote}"
        </p>
      </div>

      <div className="mt-8 flex items-center gap-4">
        {image ? (
          <img 
            src={image} 
            alt={author || 'Anonymous'} 
            className="h-12 w-12 rounded-full object-cover ring-2 ring-brand-blue/10"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue/10 font-bold text-brand-blue">
            {author?.charAt(0) || '?'}
          </div>
        )}
        <div>
          <h4 className="font-display font-bold text-brand-dark">{author || 'Anonymous'}</h4>
          <p className="text-sm text-brand-muted">{role}</p>
        </div>
      </div>
    </div>
  );
}
