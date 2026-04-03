import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, Users, CheckCircle, ArrowRight, Layers, Target, 
  MessageCircle, Send, BookOpen, HeartPulse, Sparkles, Home,
  Landmark, Globe, Building, Shield, Quote, Calendar, MapPin, Loader2,
  GraduationCap, Briefcase
} from 'lucide-react';
import { publicService } from '@/features/api/services/public.service.js';
import { formatDate } from '@/utils/format.js';
import { CardSkeleton, Skeleton } from '@/components/ui/Skeleton.jsx';
import { SubmitTestimonialModal } from '@/components/common/SubmitTestimonialModal.jsx';

export function HomePage() {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [recentEvents, setRecentEvents] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      setLoading(true);
      const [projectsRes, eventsRes, testimonialsRes, postsRes] = await Promise.all([
        publicService.getProjects({ limit: 3 }),
        publicService.getEvents({ limit: 3 }),
        publicService.getTestimonials({ featured: true, limit: 3 }),
        publicService.getPosts({ status: 'published', limit: 3 })
      ]);
      setFeaturedProjects(projectsRes.data.data || []);
      setRecentEvents(eventsRes.data.data || []);
      setRecentPosts(postsRes.data.data || []);
      
      // If we don't have featured testimonials, fallback to getting newest
      if (testimonialsRes.data.data && testimonialsRes.data.data.length > 0) {
         setTestimonials(testimonialsRes.data.data);
      } else {
         const latestRes = await publicService.getTestimonials({ limit: 3 });
         setTestimonials(latestRes.data.data || []);
      }
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

        <div className="relative z-10 w-full px-6 lg:px-20 max-w-[1440px] mx-auto flex flex-col items-start gap-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-[#ffffff22] rounded-full w-fit">
            <div className="w-2 h-2 rounded-full bg-success-green" />
            <span className="font-sans text-[13px] font-medium text-[#ffffffcc]">
              Making a Difference Since 2015
            </span>
          </div>

          <h1 className="font-display text-[32px] lg:text-[64px] font-bold text-white leading-[1.1] max-w-[800px] text-left">
            Together We Can Change Lives
          </h1>
          
          <p className="font-sans text-[15px] lg:text-[18px] font-normal text-white leading-[1.6] max-w-[600px] text-left">
            Bhawna Foundation works to improve education, healthcare, and community welfare across India. Join us in building a brighter future for those who need it most.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2 w-full sm:w-auto">
            <Link to="/donate" className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-white rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg group">
              <span className="font-sans text-base font-semibold text-primary-blue">Donate Now</span>
              <Heart className="w-[18px] h-[18px] text-primary-blue group-hover:fill-primary-blue transition-all" />
            </Link>
            <Link to="/volunteer" className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:bg-white/10 hover:shadow-md">
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
          <div className="w-full lg:w-[560px] aspect-[16/10] shrink-0 rounded-2xl overflow-hidden shadow-lg bg-slate-50">
            <img 
              src="https://images.unsplash.com/photo-1590874023110-f82d4c63b599?crop=entropy&cs=tinysrgb&fit=max&fm=jpg" 
              alt="About Us"
              className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
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
              [...Array(3)].map((_, i) => (
                <CardSkeleton key={i} />
              ))
            ) : featuredProjects.length === 0 ? (
              <div className="col-span-full py-12 flex flex-col items-center justify-center bg-white rounded-xl border border-border-light text-center">
                <Target className="w-10 h-10 text-slate-300 mb-3" />
                <h3 className="font-display text-lg font-semibold text-text-dark">No Projects Available</h3>
                <p className="font-sans text-text-secondary">Explore our active projects on our projects page.</p>
              </div>
            ) : (
              featuredProjects.map((project, idx) => (
                <div key={project._id || idx} className="flex flex-col rounded-xl overflow-hidden bg-white shadow-sm border border-slate-100 group hover:shadow-md transition-all duration-300">
                  <Link to={`/projects/${project.slug}`} className="w-full aspect-video overflow-hidden bg-slate-50 block">
                    <img 
                      src={project.image || (project.images && project.images[0]) || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80"} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-500" 
                    />
                  </Link>
                  <div className="flex flex-col p-8 gap-4 flex-1">
                    <span className={`font-sans text-[13px] font-semibold ${project.categoryColor || 'text-primary-blue'}`}>
                      {project.category || 'Initiative'}
                    </span>
                    <h3 className="font-display text-[22px] font-bold text-[#1f2937] leading-[1.3] group-hover:text-primary-blue transition-colors">
                      <Link to={`/projects/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h3>
                    <p className="font-sans text-[15px] font-normal text-[#6b7280] leading-[1.6]">
                      {project.desc || project.shortDescription}
                    </p>
                    <div className="mt-auto pt-4 flex flex-col gap-4">
                      <div className="flex items-center gap-5 text-[#6b7280] font-sans text-[13px] font-semibold">
                        {(project.stats || [
                          { icon: Landmark, label: "Direct Impact" },
                          { icon: Heart, label: "Community Led" }
                        ]).map((stat, sIdx) => {
                          const Icon = stat.icon;
                          return (
                            <div key={sIdx} className="flex items-center gap-2">
                              <Icon className="w-4 h-4" />
                              <span>{stat.label}</span>
                            </div>
                          );
                        })}
                      </div>
                      <Link 
                        to={`/projects/${project.slug}`}
                        className="flex items-center justify-center w-full py-3 bg-primary-blue text-white rounded-lg font-sans text-[14px] font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-md"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>


      {/* 6. Testimonials */}
      <section className="w-full bg-white px-6 py-[60px] lg:px-20 lg:py-[80px] border-t border-border-light">
        <div className="flex flex-col gap-10 lg:gap-12 max-w-[1440px] mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex flex-col gap-3 lg:w-[600px] items-center lg:items-start text-center lg:text-left">
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-light-blue rounded-full w-fit">
                <MessageCircle className="w-3.5 h-3.5 text-primary-blue shrink-0" />
                <span className="font-sans text-[12px] font-bold tracking-[1px] text-primary-blue uppercase">Testimonials</span>
              </div>
              <h2 className="font-display text-[26px] lg:text-[36px] font-bold text-text-dark leading-[1.2]">
                What People Say About Us
              </h2>
            </div>
            <div className="flex items-center gap-4">
               <button 
                onClick={() => setIsTestimonialModalOpen(true)}
                className="px-5 py-2.5 bg-primary-blue text-white rounded-lg font-sans text-[14px] font-semibold hover:bg-primary-blue/90 transition-colors shadow-sm"
              >
                Add Testimonial
              </button>
              <Link to="/testimonials" className="flex items-center gap-1.5 px-6 py-2.5 border-[1.5px] border-primary-blue rounded-lg group hover:bg-primary-blue transition-colors text-primary-blue">
                <span className="font-sans text-[14px] font-semibold group-hover:text-white">View All</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:text-white" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {loading ? (
               [...Array(3)].map((_, i) => (
                 <div key={i} className="flex flex-col gap-5 p-8 rounded-xl bg-bg-light border border-border-light relative animate-pulse">
                   <div className="w-8 h-8 bg-slate-200 rounded-md mb-4" />
                   <div className="h-4 bg-slate-200 rounded w-full mb-2" />
                   <div className="h-4 bg-slate-200 rounded w-5/6 mb-2" />
                   <div className="h-4 bg-slate-200 rounded w-4/6 mb-6" />
                   <div className="flex items-center gap-3 pt-2 mt-auto">
                     <div className="w-11 h-11 bg-slate-200 rounded-full" />
                     <div className="flex flex-col gap-2">
                       <div className="h-4 bg-slate-200 rounded w-24" />
                       <div className="h-3 bg-slate-200 rounded w-16" />
                     </div>
                   </div>
                 </div>
               ))
             ) : testimonials.length > 0 ? (
               testimonials.map((testimonial, idx) => {
                  const colors = [
                    { text: 'text-primary-blue', bg: 'bg-primary-blue' },
                    { text: 'text-accent-blue', bg: 'bg-accent-blue' },
                    { text: 'text-success-green', bg: 'bg-success-green' }
                  ];
                  const color = colors[idx % colors.length];
                  return (
                    <div key={testimonial._id} className="flex flex-col gap-5 p-8 rounded-xl bg-bg-light border border-border-light relative">
                      <Quote className={`w-8 h-8 ${color.text}/30`} />
                      <p className="font-sans text-[15px] font-normal text-text-dark leading-[1.7] italic flex-1">
                        “{testimonial.quote}”
                      </p>
                      <div className="flex items-center gap-3 pt-2">
                        <div className={`flex items-center justify-center w-11 h-11 ${color.bg} rounded-full text-white font-sans text-base font-semibold uppercase`}>
                          {testimonial.name[0]}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-sans text-[14px] font-semibold text-text-dark">{testimonial.name}</span>
                          {testimonial.role && <span className="font-sans text-[13px] font-normal text-text-secondary">{testimonial.role}</span>}
                        </div>
                      </div>
                    </div>
                  );
               })
             ) : (
                <div className="col-span-1 md:col-span-3 flex flex-col items-center justify-center py-16 text-center bg-bg-light rounded-xl border border-border-light">
                  <MessageCircle className="w-10 h-10 text-slate-300 mb-3" />
                  <h3 className="font-display text-lg font-semibold text-text-dark">No Testimonials Yet</h3>
                  <p className="font-sans text-text-secondary">Be the first to share your experience with us!</p>
                </div>
             )}
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
            {loading ? (
              [...Array(3)].map((_, i) => (
                <CardSkeleton key={i} />
              ))
            ) : recentPosts.length > 0 ? (
              recentPosts.map((post) => (
                <div key={post._id} className="flex flex-col rounded-xl overflow-hidden border border-border-light bg-white group hover:shadow-lg transition-shadow">
                  <Link to={`/blog/${post.slug}`} className="w-full aspect-video overflow-hidden bg-slate-50 block">
                    <img 
                      src={post.featuredImage || "https://images.unsplash.com/photo-1692269725911-87697c558be1?q=80&w=600"} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform" 
                    />
                  </Link>
                  <div className="flex flex-col gap-2.5 p-6 w-full">
                    <span className="font-sans text-[12px] font-medium text-text-muted">
                      {formatDate(post.createdAt)}
                    </span>
                    <h3 className="font-display text-[18px] font-semibold text-text-dark leading-[1.3] group-hover:text-primary-blue transition-colors">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="font-sans text-[14px] font-normal text-text-secondary leading-[1.6] line-clamp-3">
                      {post.excerpt || (post.content ? post.content.substring(0, 120) + '...' : '')}
                    </p>
                    <Link to={`/blog/${post.slug}`} className="font-sans text-[14px] font-semibold text-primary-blue mt-1">Read More &rarr;</Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-1 md:col-span-3 py-12 flex flex-col items-center justify-center bg-bg-light rounded-xl border border-border-light text-center">
                <BookOpen className="w-10 h-10 text-slate-300 mb-3" />
                <h3 className="font-display text-lg font-semibold text-text-dark">No articles found</h3>
                <p className="font-sans text-text-secondary">We're working on new stories. Check back soon!</p>
              </div>
            )}
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
          <p className="font-sans text-[16px] font-normal text-white leading-[1.6] text-center lg:w-[560px]">
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

      {/* Modals */}
      <SubmitTestimonialModal 
        isOpen={isTestimonialModalOpen} 
        onClose={() => setIsTestimonialModalOpen(false)} 
      />
    </main>
  );
}
