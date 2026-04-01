import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, User, Calendar as CalendarIcon, Loader2, AlertCircle } from 'lucide-react';
import { publicService } from '@/features/api/services/public.service.js';
import { formatDate } from '@/utils/format';

export function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await publicService.getPosts();
      setPosts(res.data.data || []);
    } catch (err) {
      console.error('Error fetching blog posts:', err);
      setError("Failed to load blog posts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

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
            <span className="text-white">Blog</span>
          </div>
          <h1 className="font-display text-[32px] lg:text-[44px] font-bold text-white max-w-[600px] leading-[1.2]">
            Insights & Updates
          </h1>
          <p className="font-sans text-[15px] lg:text-[16px] font-normal text-white/80 max-w-[500px] leading-[1.6]">
            Read the latest news, stories of change, and thoughts from our leadership team.
          </p>
        </div>
      </section>

      {/* 2. Main Content Gallery */}
      <section className="w-full px-6 lg:px-[120px] max-w-[1440px] mx-auto mt-10 lg:mt-[60px]">
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-primary-blue animate-spin mb-4" />
            <p className="text-text-secondary font-medium">Loading articles...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 px-6">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-border-light text-center flex flex-col items-center gap-4">
              <AlertCircle className="w-12 h-12 text-red-500" />
              <h3 className="font-display text-xl font-bold text-text-dark">Unable to load blog</h3>
              <p className="font-sans text-text-secondary">{error}</p>
              <button 
                onClick={fetchPosts}
                className="mt-4 px-8 py-3 bg-primary-blue text-white rounded-lg font-bold"
              >
                Retry
              </button>
            </div>
          </div>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h3 className="font-display text-[24px] font-bold text-text-dark mb-2">No articles found</h3>
            <p className="text-text-secondary font-sans">We're working on new stories. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div key={post._id} className="flex flex-col bg-white rounded-2xl overflow-hidden border border-border-light shadow-sm hover:shadow-md transition-shadow group flex-1">
                <div className="relative w-full h-[220px] overflow-hidden shrink-0">
                  <img src={post.image || "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600"} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary-blue font-sans text-[12px] font-bold rounded-full shadow-sm uppercase tracking-[0.5px]">
                      {post.category || 'News'}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col p-6 flex-1">
                  <div className="flex items-center gap-4 text-text-secondary mb-3">
                    <div className="flex items-center gap-1.5">
                      <CalendarIcon className="w-3.5 h-3.5" />
                      <span className="font-sans text-[12px] font-medium">{formatDate(post.createdAt || post.date)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      <span className="font-sans text-[12px] font-medium">{post.author || 'Foundation Team'}</span>
                    </div>
                  </div>
                  
                  <h3 className="font-display text-[20px] lg:text-[22px] font-bold text-text-dark leading-tight group-hover:text-primary-blue transition-colors mb-3">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  
                  <p className="font-sans text-[15px] font-normal text-text-secondary leading-[1.6] line-clamp-3 mb-4">
                    {post.shortDescription || post.excerpt}
                  </p>
                  
                  <div className="mt-auto">
                    <Link to={`/blog/${post.slug}`} className="flex items-center gap-2 text-primary-blue font-sans text-[14px] font-bold hover:gap-3 transition-all w-fit">
                      Read Article
                      <ArrowRight className="w-4 h-4" />
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
