import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MapPin, Calendar, Users, CheckCircle, ChevronRight, Share2, ArrowRight, Image as ImageIcon, Loader2, AlertCircle } from 'lucide-react';
import { publicService } from '@/features/api/services/public.service.js';
import { formatDate } from '@/utils/format.js';

export function ProjectDetailsPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [similarProjects, setSimilarProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (slug) {
      fetchProjectDetails();
    }
  }, [slug]);

  const fetchProjectDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await publicService.getProject(slug);
      
      if (!res.data.data) {
        throw new Error("Project not found");
      }
      
      setProject(res.data.data);
      
      // Fetch similar projects
      try {
        const similarRes = await publicService.getProjects({ 
          category: res.data.data.category, 
          limit: 3 
        });
        // Filter out the current project
        setSimilarProjects(similarRes.data.data?.filter(p => p._id !== res.data.data._id) || []);
      } catch (e) {
        console.error("Failed to fetch similar projects", e);
      }
      
    } catch (err) {
      setError(err.message || "Failed to load project details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-bg-light">
        <Loader2 className="w-12 h-12 text-primary-blue animate-spin mb-4" />
        <p className="text-text-secondary font-medium">Loading project details...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-bg-light px-6">
        <AlertCircle className="w-16 h-16 text-red-500 mb-6" />
        <h2 className="font-display text-[24px] font-bold text-text-dark">Project Not Found</h2>
        <p className="text-text-secondary mt-2 text-center max-w-md">{error || "The project you are looking for does not exist or has been removed."}</p>
        <Link to="/projects" className="mt-8 px-8 py-3 bg-primary-blue text-white rounded-lg font-bold">
          Back to All Projects
        </Link>
      </div>
    );
  }

  const mainImage = project.images && project.images.length > 0 
    ? project.images[0] 
    : 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1080';

  return (
    <main className="flex flex-col w-full bg-bg-light overflow-hidden pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative w-full h-[340px] overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src={mainImage} 
            alt={project.title} 
            className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
            title="Click to view full image"
            onClick={() => window.open(mainImage, '_blank')}
          />
          <div className="absolute inset-0 bg-black/65" />
        </div>
        <div className="relative z-10 w-full px-6 lg:px-[120px] max-w-[1440px] mx-auto flex flex-col gap-4">
          <div className="flex items-center gap-2 text-white/80 font-sans text-[13px] font-medium flex-wrap">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/projects" className="hover:text-white transition-colors">Our Projects</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white line-clamp-1">{project.title}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white font-sans text-[12px] font-bold rounded-full">
              {project.category || 'Initiative'}
            </span>
            <span className="px-3 py-1 bg-warm-orange text-white font-sans text-[12px] font-bold rounded-full capitalize">
              {project.status === 'published' ? 'Active' : project.status}
            </span>
          </div>
          <h1 className="font-display text-[32px] lg:text-[44px] font-bold text-white max-w-[800px] leading-[1.2]">
            {project.title}
          </h1>
        </div>
      </section>

      {/* 2. Main Content & Sidebar */}
      <section className="w-full px-6 lg:px-[120px] max-w-[1440px] mx-auto mt-10 lg:mt-[60px]">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start">
          
          {/* Main Content (Left) */}
          <div className="flex flex-col gap-8 w-full lg:w-[65%] bg-white p-6 lg:p-10 rounded-2xl border border-border-light shadow-sm">
            
            <div className="flex flex-col gap-4">
              <h2 className="font-display text-[24px] lg:text-[28px] font-bold text-text-dark">About the Project</h2>
              <div className="font-sans text-[15px] lg:text-[16px] font-normal text-text-secondary leading-[1.8] whitespace-pre-line">
                {project.fullDescription || project.shortDescription}
              </div>
            </div>

            {/* Render Goals/Milestones if available in metadata or just generic ones */}
            <div className="flex flex-col gap-4 mt-4">
              <h2 className="font-display text-[24px] lg:text-[28px] font-bold text-text-dark text-left">Our Goals</h2>
              <div className="grid grid-cols-1 gap-4 mt-2">
                <div className="flex gap-4 p-4 rounded-xl bg-bg-light border border-border-light">
                  <div className="w-10 h-10 shrink-0 bg-success-green rounded-full flex items-center justify-center shadow-sm">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-display text-[16px] font-semibold text-text-dark">Sustainable Impact</h4>
                    <p className="font-sans text-[14px] text-text-secondary leading-[1.6]">Creating long-term solutions that the community can maintain independently.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-xl bg-bg-light border border-border-light">
                  <div className="w-10 h-10 shrink-0 bg-success-green rounded-full flex items-center justify-center shadow-sm">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-display text-[16px] font-semibold text-text-dark">Community Engagement</h4>
                    <p className="font-sans text-[14px] text-text-secondary leading-[1.6]">Working closely with local leaders and residents to ensure project success.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery */}
            {project.images && project.images.length > 1 && (
              <div className="flex flex-col gap-4 mt-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-[24px] lg:text-[28px] font-bold text-text-dark">Project Gallery</h2>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                  {project.images.slice(1, 4).map((img, idx) => (
                    <div 
                      key={idx} 
                      className="w-full aspect-square md:h-[140px] rounded-lg overflow-hidden group cursor-pointer relative bg-slate-50"
                      onClick={() => window.open(img, '_blank')}
                    >
                      <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 pt-6 border-t border-border-light">
              <span className="font-sans text-[14px] font-semibold text-text-dark">Share project:</span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied to clipboard!");
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-bg-light hover:bg-border-light transition-colors"
              >
                <Share2 className="w-4 h-4 text-primary-blue" />
                <span className="font-sans text-[13px] font-medium text-text-dark">Copy Link</span>
              </button>
            </div>

          </div>

          {/* Sidebar (Right) */}
          <div className="flex flex-col gap-6 w-full lg:w-[35%] sticky top-24">
            
            {/* Project Status Info */}
            <div className="flex flex-col gap-5 p-6 rounded-2xl bg-white border border-border-light shadow-sm">
              <h3 className="font-display text-[20px] font-bold text-text-dark border-b border-border-light pb-4">Project Overview</h3>
              
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-light-blue flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary-blue" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans text-[12px] text-text-secondary uppercase tracking-[0.5px]">Location</span>
                    <span className="font-sans text-[14px] font-semibold text-text-dark">{project.location || 'Rural Rajasthan'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-light-blue flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-primary-blue" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans text-[12px] text-text-secondary uppercase tracking-[0.5px]">Started On</span>
                    <span className="font-sans text-[14px] font-semibold text-text-dark">{formatDate(project.createdAt)}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-light-blue flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-primary-blue" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans text-[12px] text-text-secondary uppercase tracking-[0.5px]">Beneficiaries</span>
                    <span className="font-sans text-[14px] font-semibold text-text-dark">Thousands impacted</span>
                  </div>
                </div>
              </div>

              <div className="w-full h-px bg-border-light my-2" />

              <div className="flex flex-col gap-3">
                <p className="font-sans text-[14px] text-text-secondary text-center">Your support helps us reach more people.</p>
                <Link to="/donate" className="flex items-center justify-center w-full py-3.5 bg-primary-blue text-white font-sans text-[15px] font-bold rounded-lg hover:bg-primary-blue/90 transition-colors shadow-md">
                  Support This Project
                </Link>
                <Link to="/volunteer" className="flex items-center justify-center w-full py-3.5 bg-white border border-border-light text-text-dark font-sans text-[15px] font-bold rounded-lg hover:bg-bg-light transition-colors">
                  Volunteer With Us
                </Link>
              </div>
            </div>

            {/* Related Projects */}
            {similarProjects.length > 0 && (
              <div className="flex flex-col p-6 rounded-2xl bg-white border border-border-light shadow-sm">
                <h3 className="font-display text-[18px] font-bold text-text-dark mb-4 pb-4 border-b border-border-light">Similar Projects</h3>
                <div className="flex flex-col gap-4">
                  {similarProjects.map((p) => (
                    <Link key={p._id} to={`/projects/${p.slug}`} className="group flex items-center gap-3">
                      <div className="w-14 h-14 rounded overflow-hidden shrink-0 bg-slate-100">
                        <img 
                          src={p.images && p.images.length > 0 ? p.images[0] : 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=150'} 
                          alt={p.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-sans text-[14px] font-semibold text-text-dark group-hover:text-primary-blue transition-colors line-clamp-1">
                          {p.title}
                        </span>
                        <span className="font-sans text-[12px] text-text-secondary line-clamp-1">
                          {p.location || 'Rural Areas'}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

    </main>
  );
}
