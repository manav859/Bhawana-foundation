import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, MapPin, Loader2, AlertCircle, DatabaseIcon } from 'lucide-react';
import { publicService } from '@/features/api/services/public.service.js';

const categories = ["All", "Education", "Healthcare", "Livelihood", "Infrastructure", "Environment"];

export function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, [activeCategory]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = { limit: 50 };
      if (activeCategory !== "All") {
        params.category = activeCategory;
      }
      
      const res = await publicService.getProjects(params);
      setProjects(res.data.data || []);
    } catch (err) {
      setError(err.message || "Failed to load projects. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Although our API supports category filters, we double check here
  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <main className="flex flex-col w-full bg-bg-light overflow-hidden pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative w-full h-[300px] lg:h-[340px] flex items-center bg-primary-blue overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-white opacity-5 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-[300px] h-[300px] bg-accent-blue opacity-20 rounded-full blur-[60px] -ml-10 -mb-10 pointer-events-none" />
        
        <div className="relative z-10 w-full px-6 lg:px-[120px] max-w-[1440px] mx-auto flex flex-col gap-4">
          <div className="flex items-center gap-2 text-white/80 font-sans text-[13px] font-medium">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Our Projects</span>
          </div>
          <h1 className="font-display text-[32px] lg:text-[44px] font-bold text-white max-w-[600px] leading-[1.2]">
            Our Projects
          </h1>
          <p className="font-sans text-[15px] lg:text-[16px] font-normal text-white/80 max-w-[500px] leading-[1.6]">
            Explore our on-the-ground initiatives creating tangible, lasting impact across communities.
          </p>
        </div>
      </section>

      {/* 2. Filters & Projects Grid */}
      <section className="w-full px-6 lg:px-[120px] py-[60px] lg:py-[80px] max-w-[1440px] mx-auto flex flex-col gap-10">
        
        {/* Categories / Tabs */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full font-sans text-[14px] font-semibold transition-all whitespace-nowrap border ${
                activeCategory === cat 
                  ? 'bg-primary-blue text-white shadow-md border-primary-blue' 
                  : 'bg-white border-border-light text-text-secondary hover:text-text-dark hover:border-border-dark'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="min-h-[400px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-border-light shadow-sm">
              <Loader2 className="w-10 h-10 text-primary-blue animate-spin mb-4" />
              <p className="text-text-secondary font-medium">Loading projects...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-red-100 shadow-sm">
              <AlertCircle className="w-10 h-10 text-red-500 mb-4" />
              <h3 className="font-display text-[20px] font-bold text-text-dark">Unable to load projects</h3>
              <p className="font-sans text-[15px] text-text-secondary mt-2">{error}</p>
              <button onClick={fetchProjects} className="mt-6 px-8 py-2 bg-primary-blue text-white rounded-lg font-bold">Retry</button>
            </div>
          ) : (!Array.isArray(filteredProjects) || filteredProjects.length === 0) ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-border-light shadow-sm">
              <DatabaseIcon className="w-12 h-12 text-border-dark mb-4" />
              <h3 className="font-display text-[20px] font-bold text-text-dark">No Projects Found</h3>
              <p className="font-sans text-[15px] text-text-secondary mt-2">There are currently no {activeCategory === "All" ? "" : activeCategory.toLowerCase()} projects to display.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in">
              {filteredProjects.map((project) => (
                <div key={project._id} className="flex flex-col bg-white rounded-2xl overflow-hidden border border-border-light shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                  <div className="relative w-full h-[220px] overflow-hidden">
                    <img 
                      src={project.images && project.images.length > 0 ? project.images[0] : 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600'} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1 bg-white text-text-dark font-sans text-[12px] font-bold rounded-full shadow-sm">
                        {project.category || 'Initiative'}
                      </span>
                      <span className={`px-3 py-1 text-white font-sans text-[12px] font-bold rounded-full shadow-sm capitalize ${project.status === 'published' ? 'bg-success-green' : 'bg-warm-orange'}`}>
                        {project.status === 'published' ? 'Active' : project.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col p-6 gap-4 flex-1">
                    <div className="flex items-center gap-2 text-text-secondary">
                      <MapPin className="w-4 h-4" />
                      <span className="font-sans text-[13px] font-medium">{project.location || 'Pan India'}</span>
                    </div>
                    <h3 className="font-display text-[20px] font-bold text-text-dark leading-tight group-hover:text-primary-blue transition-colors line-clamp-2">
                      <Link to={`/projects/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h3>
                    <p className="font-sans text-[15px] font-normal text-text-secondary leading-[1.6] line-clamp-3 flex-1">
                      {project.shortDescription || project.fullDescription?.substring(0, 120) + "..."}
                    </p>
                    <Link to={`/projects/${project.slug}`} className="flex items-center gap-2 text-primary-blue font-sans text-[14px] font-bold mt-2 hover:gap-3 transition-all">
                      View Project Details
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </section>

    </main>
  );
}
