import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, CheckCircle, Loader2, AlertCircle, Heart } from 'lucide-react';
import { publicService } from '@/features/api/services/public.service.js';

export function ProgramsPage() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await publicService.getPrograms();
      setPrograms(res.data.data || []);
    } catch (err) {
      setError("Failed to load programs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col w-full bg-white overflow-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative w-full h-[340px] overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1593113563332-f36e8976b92a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzQ4ODkwNDN8&ixlib=rb-4.1.0&q=80&w=1080" 
            alt="Programs Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/65" />
        </div>
        <div className="relative z-10 w-full px-6 lg:px-[120px] max-w-[1440px] mx-auto flex flex-col gap-4">
          <div className="flex items-center gap-2 text-white/80 font-sans text-[13px] font-medium">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Our Programs</span>
          </div>
          <h1 className="font-display text-[32px] lg:text-[44px] font-bold text-white max-w-[600px] leading-[1.2]">
            Our Programs
          </h1>
          <p className="font-sans text-[15px] lg:text-[16px] font-normal text-white/80 max-w-[500px] leading-[1.6]">
            Holistic initiatives designed to empower communities, provide essential services, and create sustainable livelihoods.
          </p>
        </div>
      </section>

      {/* 2. Main Content - Dynamic Programs */}
      {loading ? (
        <section className="w-full py-20 flex flex-col items-center justify-center">
          <Loader2 className="w-12 h-12 text-primary-blue animate-spin mb-4" />
          <p className="text-text-secondary font-medium font-sans">Loading our programs...</p>
        </section>
      ) : error ? (
        <section className="w-full py-20 flex flex-col items-center justify-center px-6">
          <div className="max-w-md w-full bg-bg-light p-8 rounded-2xl border border-border-light text-center flex flex-col items-center gap-4">
            <AlertCircle className="w-12 h-12 text-red-500" />
            <h3 className="font-display text-xl font-bold text-text-dark">Something went wrong</h3>
            <p className="font-sans text-text-secondary">{error}</p>
            <button onClick={fetchPrograms} className="mt-4 px-8 py-3 bg-primary-blue text-white rounded-lg font-bold">Retry</button>
          </div>
        </section>
      ) : (!Array.isArray(programs) || programs.length === 0) ? (
        <section className="w-full py-20 flex flex-col items-center justify-center px-6">
          <div className="max-w-md w-full text-center flex flex-col items-center gap-4">
            <Heart className="w-12 h-12 text-border-dark" />
            <h3 className="font-display text-xl font-bold text-text-dark">No Programs to Display</h3>
            <p className="font-sans text-text-secondary">We are currently updating our programs. Please check back later.</p>
          </div>
        </section>
      ) : (
        programs.map((program, index) => {
          const isEven = index % 2 === 0;
          const number = (index + 1).toString().padStart(2, '0');
          
          return (
            <section 
              key={program._id} 
              className={`w-full px-6 py-[60px] lg:px-20 lg:py-[80px] border-b border-border-light ${!isEven ? 'bg-bg-light' : 'bg-white'}`}
            >
              <div className={`flex flex-col lg:items-center gap-10 lg:gap-[60px] max-w-[1440px] mx-auto ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                <div className="w-full lg:w-1/2 h-[300px] lg:h-[420px] rounded-2xl overflow-hidden shadow-lg relative group shrink-0">
                  <img 
                    src={program.image || "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1080"} 
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="flex flex-col gap-6 w-full lg:w-1/2">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-primary-blue font-display text-[20px] font-bold">{number}</span>
                      <span className="w-8 h-px bg-primary-blue" />
                      <span className="font-sans text-[13px] font-bold tracking-[1px] text-primary-blue uppercase">{program.category || 'Focus Area'}</span>
                    </div>
                    <h2 className="font-display text-[28px] lg:text-[36px] font-bold text-text-dark leading-[1.2]">
                      {program.title}
                    </h2>
                  </div>
                  
                  <p className="font-sans text-[15px] lg:text-[16px] font-normal text-text-secondary leading-[1.7]">
                    {program.shortDescription}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(program.impactStats || []).slice(0, 4).map((stat, sIndex) => (
                      <div key={sIndex} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-success-green shrink-0 mt-0.5" />
                        <span className="font-sans text-[14px] text-text-dark font-medium">{stat.label}: {stat.value}</span>
                      </div>
                    ))}
                    {(!program.impactStats || program.impactStats.length === 0) && (
                      <>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-success-green shrink-0 mt-0.5" />
                          <span className="font-sans text-[14px] text-text-dark font-medium">Sustainable Impact</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-success-green shrink-0 mt-0.5" />
                          <span className="font-sans text-[14px] text-text-dark font-medium">Community Driven</span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 mt-2">
                    <Link 
                      to={`/programs/${program.slug}`}
                      className="flex items-center justify-center gap-2 w-fit px-8 py-3.5 bg-primary-blue rounded-lg font-sans text-white text-[15px] font-semibold hover:bg-primary-blue/90 transition-colors shadow-sm"
                    >
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link 
                      to="/donate"
                      className="flex items-center justify-center gap-2 w-fit px-8 py-3.5 border border-border-light rounded-lg font-sans text-text-dark text-[15px] font-semibold hover:bg-white transition-colors shadow-sm"
                    >
                      Support Program
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          );
        })
      )}

      {/* 3. Donation CTA */}
      <section className="w-full bg-primary-blue px-6 py-[60px] lg:px-20 lg:py-[80px] relative overflow-hidden">
        <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-white opacity-5 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-[300px] h-[300px] bg-accent-blue opacity-20 rounded-full blur-[60px] -ml-10 -mb-10 pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 max-w-[1440px] mx-auto relative z-10">
          <div className="flex flex-col gap-4 max-w-[600px] text-center lg:text-left">
            <h2 className="font-display text-[32px] lg:text-[40px] font-bold text-white leading-[1.2]">
              Ready to Make a Difference?
            </h2>
            <p className="font-sans text-[16px] font-normal text-white/90 leading-[1.6]">
              Your contribution, no matter how small, has the power to change a life. Join us in our mission to create a society where everyone has equitable access to opportunities.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto shrink-0">
            <Link to="/donate" className="px-8 py-4 bg-white text-primary-blue font-sans text-[16px] font-bold rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all text-center">
              Donate Now
            </Link>
            <Link to="/volunteer" className="px-8 py-4 bg-transparent border-2 border-white text-white font-sans text-[16px] font-bold rounded-lg hover:bg-white/10 transition-colors text-center">
              Become a Volunteer
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
