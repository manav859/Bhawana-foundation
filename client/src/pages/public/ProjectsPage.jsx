import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Loader2, AlertCircle } from 'lucide-react';
import { publicService } from '@/features/api/services/public.service.js';

const categories = ["All Projects", "Education", "Healthcare", "Women Empowerment"];

const STATIC_PROJECTS = [
  {
    id: 1,
    slug: "school-reconstruction",
    category: "Education",
    categoryColor: "bg-[#3B82F6]",
    location: "Sirohi, Rajasthan",
    title: "School Reconstruction Project",
    desc: "Rebuilding a primary school destroyed in the floods to get 300 children back into classrooms.",
    raised: "₹2,50,000",
    goal: "₹5,00,000",
    percent: "50%",
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=600"
  },
  {
    id: 2,
    slug: "rural-mobile-clinic",
    category: "Healthcare",
    categoryColor: "bg-[#38BDF8]",
    location: "Bhilwara, Rajasthan",
    title: "Rural Mobile Clinic",
    desc: "Providing weekly free medical checkups and essential medicines to 5 remote villages.",
    raised: "₹1,20,000",
    goal: "₹2,00,000",
    percent: "60%",
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=600"
  },
  {
    id: 3,
    slug: "womens-sewing-center",
    category: "Women Empowerment",
    badgeText: "Empowerment",
    categoryColor: "bg-[#10B981]",
    location: "Udaipur, Rajasthan",
    title: "Women's Sewing Center",
    desc: "Setting up a vocational training center with 20 sewing machines for local women to become financially independent.",
    raised: "₹40,000",
    goal: "₹1,50,000",
    percent: "26%",
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=600"
  },
  {
    id: 4,
    slug: "clean-drinking-water",
    category: "Community",
    categoryColor: "bg-[#F59E0B]",
    location: "Jodhpur, Rajasthan",
    title: "Clean Drinking Water",
    desc: "Installation of a solar-powered water RO plant to supply clean water to 500 families.",
    raised: "₹3,00,000",
    goal: "₹3,00,000",
    percent: "100%",
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=600"
  },
  {
    id: 5,
    slug: "adult-literacy-campaign",
    category: "Education",
    categoryColor: "bg-[#3B82F6]",
    location: "Jaipur Slums",
    title: "Adult Literacy Campaign",
    desc: "Three-month intensive literacy campaign targeting 100 adult men and women to teach them basic reading and math.",
    raised: "₹15,000",
    goal: "₹50,000",
    percent: "30%",
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=600"
  },
  {
    id: 6,
    slug: "sanitation-drives",
    category: "Healthcare",
    categoryColor: "bg-[#38BDF8]",
    location: "Alwar, Rajasthan",
    title: "Sanitation Drives",
    desc: "Constructing 20 public toilets to improve sanitation and reduce disease outbreaks.",
    raised: "₹80,000",
    goal: "₹4,00,000",
    percent: "20%",
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=600"
  }
];

export function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All Projects");

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await publicService.getProjects();
      const fetchedProjects = res.data.data;
      
      // If there are no projects in the database, fallback to STATIC_PROJECTS for design demonstration
      if (!fetchedProjects || fetchedProjects.length === 0) {
        setProjects(STATIC_PROJECTS);
      } else {
        setProjects(fetchedProjects);
      }
    } catch (err) {
      console.error("Failed to load projects", err);
      setError("Failed to load active projects. Please try again later.");
      // Even on error, show static projects so the page isn't empty
      setProjects(STATIC_PROJECTS);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = activeCategory === "All Projects" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <main className="flex flex-col w-full bg-bg-light overflow-hidden pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative w-full h-[340px] overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1593113563332-f36e8976b92a?q=80&w=1080&auto=format&fit=crop" 
            alt="Projects Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/65" />
        </div>
        
        <div className="relative z-10 w-full px-6 lg:px-[120px] max-w-[1440px] mx-auto flex flex-col items-center justify-center text-center">
          <div className="flex items-center justify-center gap-1.5 font-sans text-[13px] mb-3">
            <Link to="/" className="text-white opacity-70 font-medium hover:opacity-100 transition-opacity">Home</Link>
            <span className="text-white opacity-70 font-medium">/</span>
            <span className="text-white font-bold tracking-wide">Projects</span>
          </div>
          <h1 className="font-display text-[40px] lg:text-[64px] font-bold text-white max-w-[800px] leading-[1.1] mb-5 tracking-tight">
            Our Active Projects
          </h1>
          <p className="font-sans text-[15px] lg:text-[17px] font-normal text-white opacity-80 max-w-[650px] leading-[1.6]">
            Explore our on-the-ground initiatives creating tangible, lasting impact across<br className="hidden sm:block" />
            communities.
          </p>
        </div>
      </section>

      {/* 2. Filters & Projects Grid */}
      <section className="w-full px-6 lg:px-[120px] py-[60px] lg:py-[80px] max-w-[1440px] mx-auto flex flex-col gap-14">
        
        {/* Categories / Tabs - Centered like image */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-sans text-[14px] font-medium transition-all shadow-sm ${
                activeCategory === cat 
                  ? 'bg-primary-blue text-white border border-primary-blue' 
                  : 'bg-white border border-primary-blue/20 text-text-secondary hover:text-text-dark hover:border-border-dark'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="w-12 h-12 text-primary-blue animate-spin mb-4" />
            <p className="text-text-secondary font-medium">Loading projects...</p>
          </div>
        ) : error && projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
            <p className="text-text-secondary font-medium">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-10">
            {filteredProjects.map((project) => (
              <div key={project._id || project.id} className="flex flex-col bg-white rounded-[16px] overflow-hidden border border-border-light shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                
                {/* Card Image */}
                <Link to={`/projects/${project.slug}`} className="relative w-full aspect-video overflow-hidden bg-slate-50 block">
                  <img 
                    src={project.image || (project.images && project.images[0]) || "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=600"} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500" 
                  />
                  <div className={`absolute top-4 left-4 px-3 py-1 text-white font-sans text-[11px] font-semibold rounded-md shadow-sm opacity-90 ${project.categoryColor || 'bg-primary-blue'}`}>
                    {project.badgeText || project.category}
                  </div>
                </Link>
                
                {/* Card Content */}
                <div className="flex flex-col p-6 flex-1 gap-3">
                  <div className="flex items-center gap-1.5 text-text-secondary">
                    <MapPin className="w-[14px] h-[14px]" />
                    <span className="font-sans text-[12px] font-medium">{project.location}</span>
                  </div>
                  
                  <h3 className="font-display text-[18px] font-bold text-text-dark leading-tight group-hover:text-primary-blue transition-colors">
                    <Link to={`/projects/${project.slug}`}>
                      {project.title}
                    </Link>
                  </h3>
                  
                  <p className="font-sans text-[13px] font-normal text-text-secondary leading-[1.6]">
                    {project.desc || project.shortDescription}
                  </p>
                  
                  <div className="flex flex-col gap-2 mt-auto pt-4">
                    <div className="w-full h-[6px] bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary-blue rounded-full" style={{ width: project.percent || '0%' }}></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-text-secondary font-medium tracking-wide">Raised</span>
                        <span className="text-[14px] font-bold text-primary-blue">{project.raised || `₹${project.raisedAmount || 0}`}</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] text-text-secondary font-medium tracking-wide">Goal</span>
                        <span className="text-[14px] font-bold text-text-dark">{project.goal || `₹${project.targetAmount || 0}`}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 mt-2 border-t border-border-light">
                    <button className="text-primary-blue font-sans text-[13px] font-bold hover:opacity-80 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
                      Donate Now
                    </button>
                    <Link 
                      to={`/projects/${project.slug}`}
                      className="flex items-center gap-1 text-text-dark font-sans text-[13px] font-bold transition-all duration-300 hover:text-primary-blue hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Details <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </section>

    </main>
  );
}
