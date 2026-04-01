import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn.js';

export function BlogCard({ id, title, date, author, image, excerpt, category, className }) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <article className={cn(
      "group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm border border-brand-border/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
      className
    )}>
      {/* Image Container */}
      <Link to={`/blog/${id}`} className="relative h-64 overflow-hidden">
        <img 
          src={image || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1\u0026auto=format\u0026fit=crop\u0026w=800\u0026q=80'} 
          alt={title} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {category && (
          <div className="absolute top-4 left-4 rounded-full bg-brand-warm px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-amber-200">
            {category}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </Link>

      {/* Content Container */}
      <div className="flex flex-1 flex-col p-6 lg:p-8">
        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-brand-muted uppercase tracking-wider">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} className="text-brand-blue" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <User size={14} className="text-brand-accent" />
            <span>{author}</span>
          </div>
        </div>

        <h3 className="mt-4 font-display text-xl font-bold leading-tight text-brand-dark transition-colors group-hover:text-brand-blue line-clamp-2">
          <Link to={`/blog/${id}`}>{title}</Link>
        </h3>
        
        <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-brand-secondary">
          {excerpt}
        </p>

        <div className="mt-auto pt-8">
          <Link 
            to={`/blog/${id}`} 
            className="inline-flex items-center text-sm font-bold text-brand-blue gap-2 transition-all hover:gap-3 group-hover:text-blue-700"
          >
            Read Full Story
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </article>
  );
}
