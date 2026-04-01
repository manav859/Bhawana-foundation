import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn.js';
import { Button } from '@/components/ui/Button.jsx';

export function EventCard({ id, title, date, time, location, image, excerpt, category, className }) {
  const formattedDate = date ? new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }) : 'TBA';

  return (
    <div className={cn(
      "group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm border border-brand-border/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
      className
    )}>
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={image || 'https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-1.2.1\u0026auto=format\u0026fit=crop\u0026w=800\u0026q=80'} 
          alt={title} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {category && (
          <div className="absolute top-4 left-4 rounded-full bg-brand-blue px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-200">
            {category}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-6 lg:p-8">
        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-brand-muted uppercase tracking-wider">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} className="text-brand-blue" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-brand-accent" />
            <span>{time}</span>
          </div>
        </div>

        <h3 className="mt-4 font-display text-xl font-bold leading-tight text-brand-dark transition-colors group-hover:text-brand-blue">
          <Link to={`/events/${id}`}>{title}</Link>
        </h3>
        
        <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-brand-secondary">
          {excerpt}
        </p>

        <div className="mt-6 flex items-center gap-3 text-xs font-medium text-brand-muted">
           <MapPin size={14} className="shrink-0 text-brand-warm" />
           <span className="line-clamp-1">{location}</span>
        </div>

        <div className="mt-8 pt-6 border-t border-brand-border/40">
          <Button to={`/events/${id}`} variant="secondary" className="w-full rounded-2xl py-2.5">
            Event Details
            <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
