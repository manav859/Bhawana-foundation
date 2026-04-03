import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Calendar, User, ChevronRight, Share2, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { publicService } from '@/features/api/services/public.service.js';
import { formatDate } from '@/utils/format';

export function BlogDetailsPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await publicService.getPost(slug);
      setPost(res.data.data);
    } catch (err) {
      console.error('Error fetching post:', err);
      setError(err.response?.status === 404 ? "Post not found" : "Failed to load post. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="flex flex-col w-full bg-bg-light min-h-screen pt-[120px] pb-20 items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary-blue animate-spin mb-4" />
        <p className="text-text-secondary font-medium">Loading article details...</p>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="flex flex-col w-full bg-bg-light min-h-screen pt-[120px] pb-20 items-center justify-center px-6">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-border-light text-center flex flex-col items-center gap-4 shadow-sm">
          <AlertCircle className="w-12 h-12 text-red-500" />
          <h3 className="font-display text-xl font-bold text-text-dark">{error || "Post Not Found"}</h3>
          <p className="font-sans text-text-secondary">
            {error === "Post not found" ? "The article you are looking for doesn't exist or has been moved." : "We couldn't retrieve the article information."}
          </p>
          <Link to="/blog" className="mt-4 px-8 py-3 bg-primary-blue text-white rounded-lg font-bold">
            Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col w-full bg-bg-light overflow-hidden pt-[80px] pb-20">
      
      {/* 1. Header Section */}
      <section className="relative w-full px-6 lg:px-[120px] max-w-[1000px] mx-auto flex flex-col gap-6 mt-10">
        <div className="flex items-center gap-2 text-text-secondary font-sans text-[13px] font-medium flex-wrap">
          <Link to="/" className="hover:text-primary-blue transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/blog" className="hover:text-primary-blue transition-colors">Blog</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-text-dark">{post.category || 'News'}</span>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-primary-blue/10 text-primary-blue font-sans text-[12px] font-bold rounded-full uppercase tracking-[0.5px]">
            {post.category || 'Foundation News'}
          </span>
        </div>

        <h1 className="font-display text-[32px] lg:text-[48px] font-bold text-text-dark leading-[1.15]">
          {post.title}
        </h1>

        <div className="flex items-center gap-6 text-text-secondary mt-2 pb-8 border-b border-border-light">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-primary-blue" />
            <span className="font-sans text-[14px] font-medium text-text-dark">{post.author || 'Foundation Team'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary-blue" />
            <span className="font-sans text-[14px] font-medium">{formatDate(post.createdAt || post.date)}</span>
          </div>
        </div>
      </section>

      {/* 2. Featured Image */}
      <section className="w-full px-6 lg:px-[120px] max-w-[1200px] mx-auto mt-8">
        <div className="w-full h-[300px] lg:h-[500px] rounded-2xl overflow-hidden shadow-sm bg-slate-50 cursor-pointer group relative" onClick={() => window.open(post.featuredImage || "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=1200", '_blank')}>
          <img 
            src={post.featuredImage || "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=1200"} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
             <span className="text-white opacity-0 group-hover:opacity-100 font-sans text-sm font-semibold bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">View Full Image</span>
          </div>
        </div>
      </section>

      {/* 3. Post Content */}
      <section className="w-full px-6 lg:px-[120px] max-w-[900px] mx-auto mt-12 bg-white p-8 lg:p-12 rounded-2xl border border-border-light shadow-sm flex flex-col gap-8">
        
        <div className="prose prose-lg prose-blue max-w-none font-sans text-text-secondary leading-[1.8] text-[16px] lg:text-[18px]">
          {/* If the post has a short description, emphasize it */}
          {post.shortDescription && (
            <p className="font-medium text-text-dark text-[18px] lg:text-[20px] leading-[1.6]">
              {post.shortDescription}
            </p>
          )}

          {/* Render the full content. For non-HTML plain text, simple pre-wrap is used */}
          <div className="whitespace-pre-wrap mt-6">
            {post.fullDescription || post.content}
          </div>
        </div>

        {/* Share & Tags */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-border-light mt-4">
          <div className="flex items-center gap-2">
            <span className="font-sans text-[14px] font-bold text-text-dark">Tags:</span>
            <div className="flex gap-2 flex-wrap">
              {(post.tags || ['General', 'Foundation']).map((tag, tIndex) => (
                <span key={tIndex} className="px-3 py-1 bg-bg-light text-text-secondary font-sans text-[12px] font-medium rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-sans text-[14px] font-bold text-text-dark">Share:</span>
            <button 
              onClick={() => {
                navigator.share?.({ title: post.title, url: window.location.href });
              }}
              className="w-10 h-10 rounded-full bg-bg-light flex items-center justify-center hover:bg-primary-blue hover:text-white transition-colors text-text-secondary"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

      </section>

      {/* 4. Back Link */}
      <section className="w-full px-6 lg:px-[120px] max-w-[900px] mx-auto mt-10 flex justify-center">
        <Link to="/blog" className="flex items-center gap-2 px-6 py-3 rounded-full border border-border-light bg-white text-text-dark font-sans text-[15px] font-semibold hover:bg-bg-light transition-colors shadow-sm">
          <ArrowLeft className="w-4 h-4" />
          Back to all articles
        </Link>
      </section>

    </main>
  );
}
