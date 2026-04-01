import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

export function ProjectCard({ project }) {
  if (!project) return null;
  const { title, category, location, slug, image, status } = project;
  const imageUrl = image || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=600&auto=format&fit=crop';
  
  const statusColors = {
    ongoing: 'bg-blue-100 text-blue-700',
    completed: 'bg-emerald-100 text-emerald-700',
    planned: 'bg-amber-100 text-amber-700'
  };

  const currentStatus = status || 'ongoing';

  return (
    <article className="surface-card group flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-lg">
      <Link to={`/projects/${slug}`} className="relative aspect-[3/2] w-full overflow-hidden bg-slate-100">
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/20 to-transparent opacity-60 transition-opacity group-hover:opacity-80"></div>
        
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          {category && (
            <span className="rounded-full bg-brand-warm px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow-sm">
              {category}
            </span>
          )}
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium backdrop-blur-md ${statusColors[currentStatus.toLowerCase()] || statusColors.ongoing}`}>
            {currentStatus}
          </span>
        </div>
      </Link>
      
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold leading-tight text-brand-dark group-hover:text-brand-blue">
          <Link to={`/projects/${slug}`}>
            {title}
          </Link>
        </h3>
        
        {location && (
          <div className="mt-auto pt-4 flex items-center text-sm text-brand-secondary">
            <MapPin className="mr-1.5 h-4 w-4 shrink-0 text-brand-muted" />
            <span className="truncate">{location}</span>
          </div>
        )}
      </div>
    </article>
  );
}
