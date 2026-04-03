import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Target, CheckCircle, ChevronRight, Share2, ArrowRight, Loader2, AlertCircle, Heart } from 'lucide-react';
import { publicService } from '@/features/api/services/public.service.js';

export function ProgramDetailsPage() {
  const { slug } = useParams();
  const [program, setProgram] = useState(null);
  const [otherPrograms, setOtherPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProgramDetails();
  }, [slug]);

  const fetchProgramDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [programRes, allProgramsRes] = await Promise.all([
        publicService.getProgram(slug),
        publicService.getPrograms({ limit: 5 })
      ]);
      
      setProgram(programRes.data.data);
      setOtherPrograms((allProgramsRes.data.data || []).filter(p => p.slug !== slug).slice(0, 3));
    } catch (err) {
      setError(err.response?.status === 404 ? "Program not found" : "Failed to load program details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-bg-light">
        <Loader2 className="w-12 h-12 text-primary-blue animate-spin mb-4" />
        <p className="text-text-secondary font-medium font-sans">Loading program details...</p>
      </div>
    );
  }

  if (error || !program) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-bg-light px-6">
        <div className="p-8 bg-white rounded-2xl border border-border-light shadow-sm flex flex-col items-center gap-4 max-w-md w-full text-center">
          <AlertCircle className="w-12 h-12 text-red-500" />
          <h2 className="font-display text-2xl font-bold text-text-dark">{error || "Program Not Found"}</h2>
          <p className="font-sans text-text-secondary">The program you are looking for might have been moved or doesn't exist.</p>
          <Link to="/programs" className="mt-4 px-8 py-3 bg-primary-blue text-white rounded-lg font-bold">Explore All Programs</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="flex flex-col w-full bg-bg-light overflow-hidden pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative w-full h-[340px] overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src={program.image || "https://images.unsplash.com/photo-1593113563332-f36e8976b92a?q=80&w=1080"} 
            alt={program.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/65" />
        </div>
        <div className="relative z-10 w-full px-6 lg:px-[120px] max-w-[1440px] mx-auto flex flex-col gap-4">
          <div className="flex items-center gap-2 text-white/80 font-sans text-[13px] font-medium flex-wrap">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/programs" className="hover:text-white transition-colors">Our Programs</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white line-clamp-1">{program.title}</span>
          </div>
          <h1 className="font-display text-[32px] lg:text-[44px] font-bold text-white max-w-[700px] leading-[1.2]">
            {program.title}
          </h1>
          <p className="font-sans text-[15px] lg:text-[16px] font-normal text-white/80 max-w-[600px] leading-[1.6]">
            {program.shortDescription}
          </p>
        </div>
      </section>

      {/* 2. Main Content & Sidebar */}
      <section className="w-full px-6 lg:px-[120px] max-w-[1440px] mx-auto mt-10 lg:mt-[60px]">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start">
          
          {/* Main Content (Left) */}
          <div className="flex flex-col gap-8 w-full lg:w-[65%] bg-white p-6 lg:p-10 rounded-2xl border border-border-light shadow-sm">
            
            <div className="flex flex-col gap-4 text-content">
              <h2 className="font-display text-[24px] lg:text-[28px] font-bold text-text-dark">Overview</h2>
              <div className="font-sans text-[15px] lg:text-[16px] font-normal text-text-secondary leading-[1.8] whitespace-pre-wrap">
                {program.fullDescription || program.shortDescription}
              </div>
            </div>

            {program.image && (
              <div className="w-full rounded-xl overflow-hidden mt-4">
                <img 
                  src={program.image} 
                  alt={program.title}
                  className="w-full h-auto object-cover max-h-[450px]"
                />
              </div>
            )}

            {program.impactStats && program.impactStats.length > 0 && (
              <div className="flex flex-col gap-4 mt-4">
                <h2 className="font-display text-[24px] lg:text-[28px] font-bold text-text-dark">Key Initiatives & Impact</h2>
                <div className="flex flex-col gap-4 mt-2">
                  {program.impactStats.map((stat, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-5 rounded-xl bg-bg-light border border-border-light">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-light-blue shrink-0">
                        <Target className="w-5 h-5 text-primary-blue" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <h4 className="font-display text-[16px] font-semibold text-text-dark">{stat.label}</h4>
                        <p className="font-sans text-[14px] text-text-secondary leading-[1.6]">{stat.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 pt-6 border-t border-border-light">
              <span className="font-sans text-[14px] font-semibold text-text-dark">Share this program:</span>
              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-bg-light hover:bg-border-light transition-colors">
                <Share2 className="w-4 h-4 text-primary-blue" />
                <span className="font-sans text-[13px] font-medium text-text-dark">Share</span>
              </button>
            </div>

          </div>

          {/* Sidebar (Right) */}
          <div className="flex flex-col gap-6 w-full lg:w-[35%] sticky top-24">
            
            {/* Support Widget */}
            <div className="flex flex-col gap-5 p-6 rounded-2xl bg-primary-blue text-white shadow-lg relative overflow-hidden">
              <div className="absolute right-0 top-0 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl -mr-10 -mt-10" />
              <h3 className="font-display text-[22px] font-bold">Support This Program</h3>
              <p className="font-sans text-[14px] text-white/90 leading-[1.6]">
                Your donation directly funds essentials, training, and infrastructure. Every contribution makes a difference.
              </p>
              <div className="flex flex-col gap-3 mt-2">
                <Link to="/donate" className="flex items-center justify-center w-full py-3.5 bg-white text-primary-blue font-sans text-[15px] font-bold rounded-lg hover:bg-white/90 transition-colors">
                  Donate Now
                </Link>
                <Link to="/volunteer" className="flex items-center justify-center w-full py-3.5 bg-transparent border border-white text-white font-sans text-[15px] font-bold rounded-lg hover:bg-white/10 transition-colors">
                  Volunteer With Us
                </Link>
              </div>
            </div>

            {/* Program Details Card */}
            <div className="flex flex-col p-6 rounded-2xl bg-white border border-border-light shadow-sm">
              <h3 className="font-display text-[18px] font-bold text-text-dark mb-4 pb-4 border-b border-border-light">Program Quick Facts</h3>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="font-sans text-[14px] text-text-secondary">Focus Area</span>
                  <span className="font-sans text-[14px] font-semibold text-text-dark capitalize">{program.category || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-sans text-[14px] text-text-secondary">Status</span>
                  <span className="font-sans text-[12px] font-bold bg-success-green/10 text-success-green px-2 py-1 rounded">Active</span>
                </div>
              </div>
            </div>

            {/* Related Programs */}
            {otherPrograms.length > 0 && (
              <div className="flex flex-col p-6 rounded-2xl bg-white border border-border-light shadow-sm">
                <h3 className="font-display text-[18px] font-bold text-text-dark mb-4 pb-4 border-b border-border-light">Other Programs</h3>
                <div className="flex flex-col gap-4">
                  {otherPrograms.map(other => (
                    <Link key={other._id} to={`/programs/${other.slug}`} className="group flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-bg-light overflow-hidden shrink-0 border border-border-light">
                          <img 
                            src={other.image || "https://images.unsplash.com/photo-1593113563332-f36e8976b92a?q=80&w=150"} 
                            alt={other.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                          />
                        </div>
                        <span className="font-sans text-[14px] font-medium text-text-dark group-hover:text-primary-blue transition-colors line-clamp-1">{other.title}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-text-secondary group-hover:text-primary-blue transition-colors shrink-0" />
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
