import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, Users, CheckCircle, ArrowRight, Layers, Target, 
  MessageCircle, Send, BookOpen, HeartPulse, Sparkles, Home,
  Landmark, Globe, Building, Shield, Quote, Calendar, MapPin, Loader2
} from 'lucide-react';
import { publicService } from '@/features/api/services/public.service.js';
import { formatDate } from '@/utils/format.js';

export function HomePage() {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [recentEvents, setRecentEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      setLoading(true);
      const [projectsRes, eventsRes] = await Promise.all([
        publicService.getProjects({ limit: 3 }),
        publicService.getEvents({ limit: 3 })
      ]);
      setFeaturedProjects(projectsRes.data.data || []);
      setRecentEvents(eventsRes.data.data || []);
    } catch (err) {
      console.error("Failed to load home page data", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col w-full bg-white overflow-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative w-full h-[500px] lg:h-[620px] overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1761039808159-f02b58f07032?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzQ4ODc0ODV8&ixlib=rb-4.1.0&q=80&w=1080" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/65" />
        </div>

        <div className="relative z-10 w-full px-6 lg:px-[120px] flex flex-col gap-6 lg:w-[840px] max-w-[1440px] mx-auto">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full w-fit">
            <div className="w-2 h-2 rounded-full bg-success-green" />
            <span className="font-sans text-[13px] font-medium text-white/80">
              Making a Difference Since 2015
            </span>
          </div>

          <h1 className="font-display text-[32px] lg:text-[56px] font-bold text-white leading-[1.15] max-w-[680px]">
            Together We Can Change Lives
          </h1>
          
          <p className="font-sans text-[15px] lg:text-[18px] font-normal text-white/80 leading-[1.6] lg:max-w-[580px]">
            Bhawna Foundation works to improve education, healthcare, and community welfare across India. Join us in building a brighter future for those who need it most.
          </p>

          <div className="flex flex-col lg:flex-row items-center gap-4 pt-2">
            <Link to="/donate" className="flex items-center justify-center gap-2 w-full lg:w-auto px-8 py-4 bg-white rounded-lg transition-transform hover:scale-105 group">
              <span className="font-sans text-base font-semibold text-primary-blue">Donate Now</span>
              <Heart className="w-[18px] h-[18px] text-primary-blue group-hover:fill-primary-blue transition-all" />
            </Link>
            <Link to="/volunteer" className="flex items-center justify-center gap-2 w-full lg:w-auto px-8 py-4 bg-transparent border-2 border-white rounded-lg transition-colors hover:bg-white/10">
              <span className="font-sans text-base font-semibold text-white">Become Volunteer</span>
              <Users className="w-[18px] h-[18px] text-white" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Impact Stats */}
      <section className="w-full bg-white shadow-sm lg:shadow-[0_4px_24px_-4px_rgba(11,94,215,0.08)] relative z-20">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full px-6 py-[60px] lg:px-20 lg:py-0 gap-8 lg:gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-200  max-w-[1440px] mx-auto">
          <div className="flex flex-col items-center justify-center gap-2 w-full lg:w-1/4 lg:py-8 pt-8 first:pt-0 lg:first:pt-8 last:pb-0">
            <span className="font-display text-[36px] font-bold text-primary-blue">50,000+</span>
            <span className="font-sans text-[14px] font-medium text-text-secondary uppercase tracking-wider">Lives Impacted</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 w-full lg:w-1/4 lg:py-8 pt-8">
            <span className="font-display text-[36px] font-bold text-accent-blue">2,500+</span>
            <span className="font-sans text-[14px] font-medium text-text-secondary uppercase tracking-wider">Active Volunteers</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 w-full lg:w-1/4 lg:py-8 pt-8">
            <span className="font-display text-[36px] font-bold text-success-green">120+</span>
            <span className="font-sans text-[14px] font-medium text-text-secondary uppercase tracking-wider">Projects Completed</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 w-full lg:w-1/4 lg:py-8 pt-8">
            <span className="font-display text-[36px] font-bold text-warm-orange">25+</span>
            <span className="font-sans text-[14px] font-medium text-text-secondary uppercase tracking-wider">Cities Reached</span>
          </div>
        </div>
      </section>

      {/* 3. About Preview */}
      <section className="w-full bg-bg-light px-6 py-[60px] lg:px-20 lg:py-[80px]">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-[60px] max-w-[1440px] mx-auto">
          <div className="w-full lg:w-[560px] h-[280px] lg:h-[400px] shrink-0 rounded-2xl overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1590874023110-f82d4c63b599?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzQ4ODc1MjN8&ixlib=rb-4.1.0&q=80&w=1080" 
              alt="About Us"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-5 w-full lg:flex-1">
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-light-blue rounded-full w-fit">
              <span className="w-3.5 h-3.5 flex items-center justify-center text-primary-blue font-bold text-[12px] italic">i</span>
              <span className="font-sans text-[12px] font-bold tracking-[1px] text-primary-blue uppercase">About Us</span>
            </div>
            <h2 className="font-display text-[26px] lg:text-[36px] font-bold text-text-dark leading-[1.2]">
              Empowering Communities, Transforming Lives
            </h2>
            <p className="font-sans text-[16px] font-normal text-text-secondary leading-[1.7]">
              Bhawna Foundation is a non-profit organization dedicated to creating lasting change in underprivileged communities. Through education, healthcare, women empowerment, and sustainable development programs, we strive to build a world where every individual has the opportunity to thrive.
            </p>
            <div className="flex flex-col gap-3 py-2">
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-5 h-5 text-success-green shrink-0" />
                <span className="font-sans text-[15px] font-medium text-text-dark">Registered Non-Profit Organization</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-5 h-5 text-success-green shrink-0" />
                <span className="font-sans text-[15px] font-medium text-text-dark">10+ Years of Community Service</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-5 h-5 text-success-green shrink-0" />
                <span className="font-sans text-[15px] font-medium text-text-dark">Transparent & Accountable Operations</span>
              </div>
            </div>
            <Link to="/about" className="flex items-center justify-center gap-2 w-fit px-7 py-3.5 mt-2 bg-primary-blue rounded-lg transition-transform hover:scale-105 text-white">
              <span className="font-sans text-[15px] font-semibold">Learn More About Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Programs Preview */}
      <section className="w-full bg-white px-6 py-[60px] lg:px-20 lg:py-[80px]">
        <div className="flex flex-col gap-10 lg:gap-12 max-w-[1440px] mx-auto">
          <div className="flex flex-col gap-3 lg:w-[600px] mx-auto items-center">
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-light-blue rounded-full w-fit">
              <Layers className="w-3.5 h-3.5 text-primary-blue shrink-0" />
              <span className="font-sans text-[12px] font-bold tracking-[1px] text-primary-blue uppercase">Our Programs</span>
            </div>
            <h2 className="font-display text-[26px] lg:text-[36px] font-bold text-text-dark text-center leading-[1.2]">
              Programs That Create Impact
            </h2>
            <p className="font-sans text-[15px] lg:text-[16px] font-normal text-text-secondary text-center leading-[1.6]">
              We run focused programs across education, healthcare, women empowerment, and community development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Education Card */}
            <div className="flex flex-col rounded-xl overflow-hidden border border-border-light bg-white group hover:shadow-lg transition-shadow">
              <div className="w-full h-[180px] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1602542164986-edc061d9c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzQ4ODc2MjN8&ixlib=rb-4.1.0&q=80&w=600" alt="Education" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="flex flex-col gap-3 p-6 w-full">
                <div className="flex items-center justify-center w-11 h-11 bg-light-blue rounded-[10px]">
                  <BookOpen className="w-[22px] h-[22px] text-primary-blue" />
                </div>
                <h3 className="font-display text-[20px] font-semibold text-text-dark">Education</h3>
                <p className="font-sans text-[14px] font-normal text-text-secondary leading-[1.6]">Providing quality education and learning resources to underprivileged children across rural India.</p>
                <Link to="/programs" className="flex items-center gap-1.5 mt-1 group/link">
                  <span className="font-sans text-[14px] font-semibold text-primary-blue">Learn More</span>
                  <ArrowRight className="w-[14px] h-[14px] text-primary-blue transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Healthcare Card */}
            <div className="flex flex-col rounded-xl overflow-hidden border border-border-light bg-white group hover:shadow-lg transition-shadow">
              <div className="w-full h-[180px] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1576089172869-4f5f6f315620?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzQ4OTc3OTN8&ixlib=rb-4.1.0&q=80&w=600" alt="Healthcare" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="flex flex-col gap-3 p-6 w-full">
                <div className="flex items-center justify-center w-11 h-11 bg-red-50 rounded-[10px]">
                  <HeartPulse className="w-[22px] h-[22px] text-coral-red" />
                </div>
                <h3 className="font-display text-[20px] font-semibold text-text-dark">Healthcare</h3>
                <p className="font-sans text-[14px] font-normal text-text-secondary leading-[1.6]">Organizing medical camps and health awareness drives in rural and underserved communities.</p>
                <Link to="/programs" className="flex items-center gap-1.5 mt-1 group/link">
                  <span className="font-sans text-[14px] font-semibold text-primary-blue">Learn More</span>
                  <ArrowRight className="w-[14px] h-[14px] text-primary-blue transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Women Empowerment Card */}
            <div className="flex flex-col rounded-xl overflow-hidden border border-border-light bg-white group hover:shadow-lg transition-shadow">
              <div className="w-full h-[180px] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1623121608226-ca93dec4d94e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzQ4ODc2OTB8&ixlib=rb-4.1.0&q=80&w=600" alt="Women Empowerment" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="flex flex-col gap-3 p-6 w-full">
                <div className="flex items-center justify-center w-11 h-11 bg-fuchsia-50 rounded-[10px]">
                  <Sparkles className="w-[22px] h-[22px] text-purple-500" />
                </div>
                <h3 className="font-display text-[20px] font-semibold text-text-dark">Women Empowerment</h3>
                <p className="font-sans text-[14px] font-normal text-text-secondary leading-[1.6]">Empowering women through skill development, financial literacy, and leadership training programs.</p>
                <Link to="/programs" className="flex items-center gap-1.5 mt-1 group/link">
                  <span className="font-sans text-[14px] font-semibold text-primary-blue">Learn More</span>
                  <ArrowRight className="w-[14px] h-[14px] text-primary-blue transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Community Development Card */}
            <div className="flex flex-col rounded-xl overflow-hidden border border-border-light bg-white group hover:shadow-lg transition-shadow">
              <div className="w-full h-[180px] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1766059965300-8ada347134cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzQ4ODc2OTB8&ixlib=rb-4.1.0&q=80&w=600" alt="Community Development" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="flex flex-col gap-3 p-6 w-full">
                <div className="flex items-center justify-center w-11 h-11 bg-orange-50 rounded-[10px]">
                  <Home className="w-[22px] h-[22px] text-warm-orange" />
                </div>
                <h3 className="font-display text-[20px] font-semibold text-text-dark">Community Development</h3>
                <p className="font-sans text-[14px] font-normal text-text-secondary leading-[1.6]">Building sustainable infrastructure and creating opportunities for economic growth in communities.</p>
                <Link to="/programs" className="flex items-center gap-1.5 mt-1 group/link">
                  <span className="font-sans text-[14px] font-semibold text-primary-blue">Learn More</span>
                  <ArrowRight className="w-[14px] h-[14px] text-primary-blue transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Featured Projects */}
      <section className="w-full bg-bg-light px-6 py-[60px] lg:px-20 lg:py-[80px]">
        <div className="flex flex-col gap-10 lg:gap-12 max-w-[1440px] mx-auto">
          <div className="flex flex-col gap-3 lg:w-[600px] items-center mx-auto">
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-light-blue rounded-full w-fit">
              <Target className="w-3.5 h-3.5 text-primary-blue shrink-0" />
              <span className="font-sans text-[12px] font-bold tracking-[1px] text-primary-blue uppercase">Featured Projects</span>
            </div>
            <h2 className="font-display text-[26px] lg:text-[36px] font-bold text-text-dark text-center leading-[1.2]">
              Making a Real Difference
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading ? (
               Array(3).fill(0).map((_, i) => (
                <div key={i} className="h-[380px] bg-white rounded-xl border border-border-light animate-pulse" />
              ))
            ) : featuredProjects.length > 0 ? (
              featuredProjects.map((project) => (
                <div key={project._id} className="flex flex-col rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow group">
                  <div className="w-full h-[200px] overflow-hidden">
                    <img 
                      src={project.images && project.images.length > 0 ? project.images[0] : 'https://images.unsplash.com/photo-1708417147232-e0c57faf8a39?q=80&w=600'} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <div className="flex flex-col gap-2.5 p-6 w-full flex-1">
                    <span className="font-sans text-[12px] font-semibold text-accent-blue tracking-[0.5px] uppercase">{project.category || 'Initiative'}</span>
                    <h3 className="font-display text-[18px] font-semibold text-text-dark line-clamp-2">
                       <Link to={`/projects/${project.slug}`} className="hover:text-primary-blue transition-colors">
                        {project.title}
                       </Link>
                    </h3>
                    <p className="font-sans text-[14px] font-normal text-text-secondary leading-[1.6] line-clamp-3">
                      {project.shortDescription || project.fullDescription?.substring(0, 100) + "..."}
                    </p>
                    <div className="mt-auto pt-4 border-t border-slate-100">
                      <Link to={`/projects/${project.slug}`} className="flex items-center gap-2 text-primary-blue font-sans text-[14px] font-bold hover:gap-3 transition-all">
                        View Details
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center col-span-full py-10 text-text-secondary">No featured projects found.</p>
            )}
          </div>
        </div>
      </section>

      {/* 5.5 Recent Events (Newly Added) */}
      <section className="w-full bg-white px-6 py-[60px] lg:px-20 lg:py-[80px]">
        <div className="flex flex-col gap-10 lg:gap-12 max-w-[1440px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-light-blue rounded-full w-fit">
                <Calendar className="w-3.5 h-3.5 text-primary-blue shrink-0" />
                <span className="font-sans text-[12px] font-bold tracking-[1px] text-primary-blue uppercase">Recent Events</span>
              </div>
              <h2 className="font-display text-[26px] lg:text-[36px] font-bold text-text-dark leading-[1.2]">
                Our Recent Activities
              </h2>
            </div>
            <Link to="/events" className="flex items-center gap-1.5 px-6 py-3 border-[1.5px] border-primary-blue rounded-lg group hover:bg-primary-blue transition-colors">
              <span className="font-sans text-[14px] font-semibold text-primary-blue group-hover:text-white">View All Events</span>
              <ArrowRight className="w-3.5 h-3.5 text-primary-blue group-hover:text-white" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loading ? (
               Array(3).fill(0).map((_, i) => (
                <div key={i} className="h-[300px] bg-bg-light rounded-xl animate-pulse" />
              ))
            ) : recentEvents.length > 0 ? (
              recentEvents.map((event) => (
                <div key={event._id} className="flex flex-col bg-bg-light rounded-xl overflow-hidden border border-border-light hover:border-primary-blue/30 transition-all group">
                  <div className="flex flex-col p-6 gap-3">
                    <div className="flex items-center gap-2 text-primary-blue font-sans text-[13px] font-bold">
                       <Calendar className="w-4 h-4" />
                       <span>{formatDate(event.date)}</span>
                    </div>
                    <h3 className="font-display text-[18px] font-bold text-text-dark line-clamp-2 min-h-[54px] group-hover:text-primary-blue transition-colors">
                       <Link to={`/events/${event.slug}`}>{event.title}</Link>
                    </h3>
                    <div className="flex items-center gap-2 text-text-secondary font-sans text-[13px]">
                       <MapPin className="w-4 h-4" />
                       <span>{event.location || 'Rural India'}</span>
                    </div>
                    <Link to={`/events/${event.slug}`} className="mt-4 flex items-center gap-2 text-text-dark font-sans text-[14px] font-semibold hover:text-primary-blue transition-colors">
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center col-span-full py-10 text-text-secondary">No recent events found.</p>
            )}
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="w-full bg-white px-6 py-[60px] lg:px-20 lg:py-[80px] border-t border-border-light">
        <div className="flex flex-col gap-10 lg:gap-12 max-w-[1440px] mx-auto">
          <div className="flex flex-col gap-3 lg:w-[600px] items-center mx-auto">
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-light-blue rounded-full w-fit">
              <MessageCircle className="w-3.5 h-3.5 text-primary-blue shrink-0" />
              <span className="font-sans text-[12px] font-bold tracking-[1px] text-primary-blue uppercase">Testimonials</span>
            </div>
            <h2 className="font-display text-[26px] lg:text-[36px] font-bold text-text-dark text-center leading-[1.2]">
              What People Say About Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-5 p-8 rounded-xl bg-bg-light border border-border-light relative">
              <Quote className="w-8 h-8 text-primary-blue/30" />
              <p className="font-sans text-[15px] font-normal text-text-dark leading-[1.7] italic">
                “Bhawna Foundation changed my daughter's life. She now has access to quality education and dreams of becoming a doctor. We are forever grateful.”
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-11 h-11 bg-primary-blue rounded-full text-white font-sans text-base font-semibold">
                  RS
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-[14px] font-semibold text-text-dark">Rekha Sharma</span>
                  <span className="font-sans text-[13px] font-normal text-text-secondary">Parent, Jaipur</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 p-8 rounded-xl bg-bg-light border border-border-light relative">
              <Quote className="w-8 h-8 text-accent-blue/30" />
              <p className="font-sans text-[15px] font-normal text-text-dark leading-[1.7] italic">
                “Volunteering with Bhawna Foundation has been the most rewarding experience. The team's dedication to community development is truly inspiring.”
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-11 h-11 bg-accent-blue rounded-full text-white font-sans text-base font-semibold">
                  AK
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-[14px] font-semibold text-text-dark">Amit Kumar</span>
                  <span className="font-sans text-[13px] font-normal text-text-secondary">Volunteer, Delhi</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 p-8 rounded-xl bg-bg-light border border-border-light relative">
              <Quote className="w-8 h-8 text-success-green/30" />
              <p className="font-sans text-[15px] font-normal text-text-dark leading-[1.7] italic">
                “The healthcare camps organized by Bhawna Foundation provided free medical check-ups for our entire village. They truly care about the well-being of people.”
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-11 h-11 bg-success-green rounded-full text-white font-sans text-base font-semibold">
                  PM
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-[14px] font-semibold text-text-dark">Priya Mehra</span>
                  <span className="font-sans text-[13px] font-normal text-text-secondary">Beneficiary, Udaipur</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Partners Section */}
      <section className="w-full bg-bg-light px-6 py-[60px] lg:px-20">
        <div className="flex flex-col gap-8 max-w-[1440px] mx-auto items-center">
          <p className="font-sans text-[16px] font-medium text-text-muted tracking-[0.5px]">
            Trusted By Leading Organizations
          </p>
          <div className="flex flex-wrap lg:flex-nowrap justify-center gap-6 lg:gap-12 w-full">
            <div className="flex items-center gap-2 px-6 py-3 bg-white border border-border-light rounded-lg">
              <Landmark className="w-6 h-6 text-text-muted shrink-0" />
              <span className="font-sans text-[14px] font-semibold text-text-secondary">UNICEF India</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 bg-white border border-border-light rounded-lg">
              <Heart className="w-6 h-6 text-text-muted shrink-0" />
              <span className="font-sans text-[14px] font-semibold text-text-secondary">Give India</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 bg-white border border-border-light rounded-lg">
              <Globe className="w-6 h-6 text-text-muted shrink-0" />
              <span className="font-sans text-[14px] font-semibold text-text-secondary">WHO</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 bg-white border border-border-light rounded-lg">
              <Building className="w-6 h-6 text-text-muted shrink-0" />
              <span className="font-sans text-[14px] font-semibold text-text-secondary">Tata Trusts</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 bg-white border border-border-light rounded-lg">
              <Shield className="w-6 h-6 text-text-muted shrink-0" />
              <span className="font-sans text-[14px] font-semibold text-text-secondary">Govt. of India</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Latest Blog Placeholder */}
      <section className="w-full bg-white px-6 py-[60px] lg:px-20 lg:py-[80px]">
        <div className="flex flex-col gap-10 lg:gap-12 max-w-[1440px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-light-blue rounded-full w-fit">
                <span className="font-sans text-[12px] font-bold tracking-[1px] text-primary-blue uppercase">Blog</span>
              </div>
              <h2 className="font-display text-[26px] lg:text-[36px] font-bold text-text-dark leading-[1.2]">
                Stories From the Field
              </h2>
            </div>
            <Link to="/blog" className="flex items-center gap-1.5 px-6 py-3 border-[1.5px] border-primary-blue rounded-lg group hover:bg-primary-blue transition-colors text-primary-blue">
              <span className="font-sans text-[14px] font-semibold group-hover:text-white">View All Posts</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:text-white" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col rounded-xl overflow-hidden border border-border-light bg-white group hover:shadow-lg transition-shadow">
              <div className="w-full h-[200px] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1692269725911-87697c558be1?q=80&w=600" alt="Blog 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="flex flex-col gap-2.5 p-6 w-full">
                <span className="font-sans text-[12px] font-medium text-text-muted">March 15, 2026</span>
                <h3 className="font-display text-[18px] font-semibold text-text-dark leading-[1.3]">How Education Breaks the Cycle of Poverty</h3>
                <p className="font-sans text-[14px] font-normal text-text-secondary leading-[1.6]">Discover how our education programs are transforming lives and creating pathways to a brighter future...</p>
                <Link to="/blog" className="font-sans text-[14px] font-semibold text-primary-blue mt-1">Read More &rarr;</Link>
              </div>
            </div>
            <div className="flex flex-col rounded-xl overflow-hidden border border-border-light bg-white group hover:shadow-lg transition-shadow">
              <div className="w-full h-[200px] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1774050021883-b711be066448?q=80&w=600" alt="Blog 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="flex flex-col gap-2.5 p-6 w-full">
                <span className="font-sans text-[12px] font-medium text-text-muted">March 8, 2026</span>
                <h3 className="font-display text-[18px] font-semibold text-text-dark leading-[1.3]">Healthcare Camps Reach 5,000 People in Rural Areas</h3>
                <p className="font-sans text-[14px] font-normal text-text-secondary leading-[1.6]">Our mobile healthcare units bring essential medical services to remote villages with limited access...</p>
                <Link to="/blog" className="font-sans text-[14px] font-semibold text-primary-blue mt-1">Read More &rarr;</Link>
              </div>
            </div>
            <div className="flex flex-col rounded-xl overflow-hidden border border-border-light bg-white group hover:shadow-lg transition-shadow">
              <div className="w-full h-[200px] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1609126385558-bc3fc5082b0a?q=80&w=600" alt="Blog 3" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="flex flex-col gap-2.5 p-6 w-full">
                <span className="font-sans text-[12px] font-medium text-text-muted">February 28, 2026</span>
                <h3 className="font-display text-[18px] font-semibold text-text-dark leading-[1.3]">Women Entrepreneurs: Success Stories from Our Programs</h3>
                <p className="font-sans text-[14px] font-normal text-text-secondary leading-[1.6]">Meet the incredible women who transformed their lives through our skill development initiatives...</p>
                <Link to="/blog" className="font-sans text-[14px] font-semibold text-primary-blue mt-1">Read More &rarr;</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Newsletter Section */}
      <section className="w-full bg-light-blue px-6 py-[60px] lg:px-20 lg:py-[60px]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 max-w-[1440px] mx-auto">
          <div className="flex flex-col gap-2 lg:w-[500px]">
            <h2 className="font-display text-[20px] lg:text-[24px] font-bold text-text-dark">
              Stay Updated with Our Newsletter
            </h2>
            <p className="font-sans text-[15px] font-normal text-text-secondary leading-[1.5]">
              Get the latest news, updates, and stories of impact delivered to your inbox.
            </p>
          </div>
          <form className="flex w-full lg:w-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="px-5 py-3.5 border border-border-light rounded-l-lg w-full lg:w-[320px] font-sans text-[14px] focus:outline-none focus:border-primary-blue text-text-dark"
            />
            <button type="submit" className="flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-blue rounded-r-lg hover:bg-primary-blue/90 transition-colors">
              <span className="font-sans text-[14px] font-semibold text-white hidden sm:block">Subscribe</span>
              <Send className="w-4 h-4 text-white" />
            </button>
          </form>
        </div>
      </section>

      {/* 10. Donation CTA */}
      <section className="relative w-full h-[320px] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1636170310737-48abb9a69b2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzQ4ODc5OTh8&ixlib=rb-4.1.0&q=80&w=1080" 
            alt="CTA Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/65" />
        </div>
        
        <div className="relative z-10 w-full px-6 flex flex-col items-center gap-6 lg:w-[700px]  max-w-[1440px] mx-auto">
          <h2 className="font-display text-[24px] lg:text-[36px] font-bold text-white text-center">
            Your Support Can Change Lives
          </h2>
          <p className="font-sans text-[16px] font-normal text-white/80 leading-[1.6] text-center lg:w-[560px]">
            Every contribution, no matter how small, creates a ripple effect of positive change in someone's life.
          </p>
          <div className="flex flex-col lg:flex-row items-center gap-4 w-full justify-center">
            <Link to="/donate" className="flex items-center justify-center gap-2 w-full lg:w-auto px-9 py-4 bg-white rounded-lg transition-transform hover:scale-105 group text-primary-blue">
              <span className="font-sans text-base font-semibold">Donate Now</span>
              <Heart className="w-[18px] h-[18px] group-hover:fill-primary-blue transition-all" />
            </Link>
            <Link to="/volunteer" className="flex items-center justify-center gap-2 w-full lg:w-auto px-9 py-4 bg-transparent border-2 border-white rounded-lg transition-colors hover:bg-white/10 text-white">
              <span className="font-sans text-base font-semibold">Join as Volunteer</span>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
