import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function ProgramCard({ program }) {
  if (!program) return null;
  const { title, summary, slug, image } = program;
  const imageUrl = image || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop';

  return (
    <article className="surface-card group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 ring-1 ring-inset ring-brand-dark/10"></div>
      </div>
      
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <h3 className="font-display text-xl font-bold text-brand-dark">
          <Link to={`/programs/${slug}`} className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true"></span>
            {title}
          </Link>
        </h3>
        
        <p className="mt-3 line-clamp-3 flex-1 text-brand-secondary">
          {summary}
        </p>
        
        <div className="mt-6 flex items-center font-medium text-brand-blue group-hover:text-brand-accent">
          <span>Read more</span>
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </article>
  );
}
