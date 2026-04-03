import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, CheckCircle, Loader2, AlertCircle, Heart } from 'lucide-react';
import { publicService } from '@/features/api/services/public.service.js';

export function ProgramsPage() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1080&auto=format&fit=crop" 
            alt="Programs Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/65" />
        </div>
        <div className="relative z-10 w-full px-6 lg:px-[120px] max-w-[1440px] mx-auto flex flex-col items-center justify-center text-center">
          <div className="flex items-center justify-center gap-1.5 font-sans text-[13px] mb-3">
            <Link to="/" className="text-white opacity-70 font-medium hover:opacity-100 transition-opacity">Home</Link>
            <span className="text-white opacity-70 font-medium">/</span>
            <span className="text-white font-bold tracking-wide">Programs</span>
          </div>
          <h1 className="font-display text-[40px] lg:text-[64px] font-bold text-white max-w-[800px] leading-[1.1] mb-5 tracking-tight">
            Our Programs
          </h1>
          <p className="font-sans text-[15px] lg:text-[17px] font-normal text-white opacity-80 max-w-[650px] leading-[1.6]">
            Holistic initiatives addressing the core needs of underprivileged<br className="hidden sm:block" />
            communities.
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
        <div className="w-full flex flex-col">
          {/* Program 1 */}
          <section className="w-full px-6 py-[60px] lg:px-20 lg:py-[100px] bg-white">
            <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-[80px] max-w-[1200px] mx-auto">
              {/* Left Image */}
              <div className="w-full lg:w-1/2 h-[350px] lg:h-[420px] rounded-2xl overflow-hidden shadow-lg shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1080&auto=format&fit=crop" 
                  alt="Education for All"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Right Content */}
              <div className="flex flex-col gap-5 w-full lg:w-1/2">
                <div className="flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 w-fit rounded-full ml-[-4px]">
                  <span className="font-sans text-[11px] font-bold tracking-wider text-primary-blue uppercase">01. PROGRAM</span>
                </div>
                
                <h2 className="font-display text-[32px] lg:text-[40px] font-bold text-text-dark leading-[1.2] mt-1">
                  Education for All
                </h2>
                
                <p className="font-sans text-[15px] lg:text-[16px] font-normal text-text-secondary leading-[1.7] mt-2">
                  We believe that education is the most powerful catalyst for social transformation. Our programs ensure that children from marginalized communities receive quality education, learning materials, and mentorship to break the cycle of poverty.
                </p>

                <div className="flex items-center gap-12 mt-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="font-display text-[28px] lg:text-[32px] font-bold text-primary-blue leading-none tracking-tight">15,000+</span>
                    <span className="font-sans text-[12px] text-text-dark font-semibold">Students Enrolled</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="font-display text-[28px] lg:text-[32px] font-bold text-primary-blue leading-none tracking-tight">120</span>
                    <span className="font-sans text-[12px] text-text-dark font-semibold">Schools Supported</span>
                  </div>
                </div>

                <div className="mt-6">
                  <button className="px-7 py-3 border border-border-light rounded-lg font-sans text-text-dark text-[14px] font-semibold hover:bg-bg-light transition-colors shadow-sm">
                    Explore Projects
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Program 2 */}
          <section className="w-full px-6 py-[60px] lg:px-20 lg:py-[100px] bg-white">
            <div className="flex flex-col lg:flex-row-reverse lg:items-center gap-10 lg:gap-[80px] max-w-[1200px] mx-auto">
              {/* Right Image */}
              <div className="w-full lg:w-1/2 h-[350px] lg:h-[420px] rounded-2xl overflow-hidden shadow-lg shrink-0 bg-black flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1080&auto=format&fit=crop" 
                  alt="Healthcare Access"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
              
              {/* Left Content */}
              <div className="flex flex-col gap-5 w-full lg:w-1/2">
                <div className="flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 w-fit rounded-full ml-[-4px]">
                  <span className="font-sans text-[11px] font-bold tracking-wider text-primary-blue uppercase">02. PROGRAM</span>
                </div>
                
                <h2 className="font-display text-[32px] lg:text-[40px] font-bold text-text-dark leading-[1.2] mt-1">
                  Healthcare Access
                </h2>
                
                <p className="font-sans text-[15px] lg:text-[16px] font-normal text-text-secondary leading-[1.7] mt-2">
                  Providing accessible and affordable healthcare services to remote and underserved areas through mobile medical units, health camps, and awareness programs focused on preventive care.
                </p>

                <div className="flex items-center gap-12 mt-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="font-display text-[28px] lg:text-[32px] font-bold text-primary-blue leading-none tracking-tight">50,000+</span>
                    <span className="font-sans text-[12px] text-text-dark font-semibold">Patients Treated</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="font-display text-[28px] lg:text-[32px] font-bold text-primary-blue leading-none tracking-tight">200+</span>
                    <span className="font-sans text-[12px] text-text-dark font-semibold">Health Camps</span>
                  </div>
                </div>

                <div className="mt-6">
                  <button className="px-7 py-3 border border-border-light rounded-lg font-sans text-text-dark text-[14px] font-semibold hover:bg-bg-light transition-colors shadow-sm">
                    Explore Projects
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Program 3 */}
          <section className="w-full px-6 py-[60px] lg:px-20 lg:py-[100px] bg-bg-light">
            <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-[80px] max-w-[1200px] mx-auto">
              {/* Left Image */}
              <div className="w-full lg:w-1/2 h-[350px] lg:h-[420px] rounded-2xl overflow-hidden shadow-lg shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1080&auto=format&fit=crop" 
                  alt="Women Empowerment"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Right Content */}
              <div className="flex flex-col gap-5 w-full lg:w-1/2">
                <div className="flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 w-fit rounded-full ml-[-4px]">
                  <span className="font-sans text-[11px] font-bold tracking-wider text-primary-blue uppercase">03. PROGRAM</span>
                </div>
                
                <h2 className="font-display text-[32px] lg:text-[40px] font-bold text-text-dark leading-[1.2] mt-1">
                  Women Empowerment
                </h2>
                
                <p className="font-sans text-[15px] lg:text-[16px] font-normal text-text-secondary leading-[1.7] mt-2">
                  Empowering women through skill development, vocational training, and micro-finance initiatives to help them become financially independent and leaders in their communities.
                </p>

                <div className="flex items-center gap-12 mt-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="font-display text-[28px] lg:text-[32px] font-bold text-primary-blue leading-none tracking-tight">5,000+</span>
                    <span className="font-sans text-[12px] text-text-dark font-semibold">Women Trained</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="font-display text-[28px] lg:text-[32px] font-bold text-primary-blue leading-none tracking-tight">1,200</span>
                    <span className="font-sans text-[12px] text-text-dark font-semibold">Micro-businesses</span>
                  </div>
                </div>

                <div className="mt-6">
                  <button className="px-7 py-3 border border-border-light bg-white rounded-lg font-sans text-text-dark text-[14px] font-semibold hover:bg-gray-50 transition-colors shadow-sm">
                    Explore Projects
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Program 4 */}
          <section className="w-full px-6 py-[60px] lg:px-20 lg:py-[100px] bg-white">
            <div className="flex flex-col lg:flex-row-reverse lg:items-center gap-10 lg:gap-[80px] max-w-[1200px] mx-auto">
              {/* Right Image */}
              <div className="w-full lg:w-1/2 h-[350px] lg:h-[420px] rounded-2xl overflow-hidden shadow-lg shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1541819381480-16f5c53af19e?q=80&w=1080&auto=format&fit=crop" 
                  alt="Community Development"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Left Content */}
              <div className="flex flex-col gap-5 w-full lg:w-1/2">
                <div className="flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 w-fit rounded-full ml-[-4px]">
                  <span className="font-sans text-[11px] font-bold tracking-wider text-primary-blue uppercase">04. PROGRAM</span>
                </div>
                
                <h2 className="font-display text-[32px] lg:text-[40px] font-bold text-text-dark leading-[1.2] mt-1">
                  Community Development
                </h2>
                
                <p className="font-sans text-[15px] lg:text-[16px] font-normal text-text-secondary leading-[1.7] mt-2">
                  Creating sustainable infrastructure including clean water access, solar lighting, and sanitation facilities to improve the overall quality of living in rural communities.
                </p>

                <div className="flex items-center gap-12 mt-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="font-display text-[28px] lg:text-[32px] font-bold text-primary-blue leading-none tracking-tight">100+</span>
                    <span className="font-sans text-[12px] text-text-dark font-semibold">Villages Adopted</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="font-display text-[28px] lg:text-[32px] font-bold text-primary-blue leading-none tracking-tight">25k+</span>
                    <span className="font-sans text-[12px] text-text-dark font-semibold">Access Clean Water</span>
                  </div>
                </div>

                <div className="mt-6">
                  <button className="px-7 py-3 border border-border-light rounded-lg font-sans text-text-dark text-[14px] font-semibold hover:bg-bg-light transition-colors shadow-sm">
                    Explore Projects
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
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
                      className="flex items-center justify-center gap-2 w-fit px-8 py-3.5 bg-primary-blue rounded-lg font-sans text-white text-[15px] font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-md"
                    >
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link 
                      to="/donate"
                      className="flex items-center justify-center gap-2 w-fit px-8 py-3.5 border border-border-light rounded-lg font-sans text-text-dark text-[15px] font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:bg-white hover:shadow-sm"
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
            <Link to="/donate" className="px-8 py-4 bg-white text-primary-blue font-sans text-[16px] font-bold rounded-lg shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg text-center">
              Donate Now
            </Link>
            <Link to="/volunteer" className="px-8 py-4 bg-transparent border-2 border-white text-white font-sans text-[16px] font-bold rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:bg-white/10 text-center">
              Become a Volunteer
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
