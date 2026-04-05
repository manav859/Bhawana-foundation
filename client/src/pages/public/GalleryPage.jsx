import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Image as ImageIcon, Play, ChevronLeft } from 'lucide-react';
import { http } from '@/features/api/http.js';
import { Skeleton } from '@/components/ui/Skeleton.jsx';

export function GalleryPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [activeMonth, setActiveMonth] = useState('All Months');
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await http.get('/gallery?limit=2000');
      setGalleryItems(res.data.data || []);
    } catch (err) {
      setError('Failed to load gallery');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Extract unique categories
  const categories = [...new Set(['All', 'Photos', 'Videos', ...galleryItems.map(item => item.category).filter(Boolean)])];

  // Extract unique months from createdAt
  const months = ['All Months', ...new Set(galleryItems.map(item => {
    if (!item.createdAt) return null;
    const date = new Date(item.createdAt);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  }).filter(Boolean))];

  // Determine type based on image URL extension
  const getType = (item) => {
    if (item.image?.match(/\.(mp4|webm|mov)/i)) return 'video';
    return 'image';
  };

  const getOptimizedUrl = (url) => {
    if (!url) return '';
    // Apply dynamic transformations for ImageKit URLs
    if (url.includes('ik.imagekit.io')) {
      const separator = url.includes('?') ? '&' : '?';
      const isVid = url.match(/\.(mp4|webm|mov|mkv)/i);
      return isVid ? `${url}${separator}tr=f-mp4` : `${url}${separator}tr=w-auto,f-auto`;
    }
    return url;
  };

  const filteredGallery = galleryItems.filter(item => {
    const type = getType(item);
    
    // Category Filter
    let categoryMatch = false;
    if (activeTab === 'All') categoryMatch = true;
    else if (activeTab === 'Photos') categoryMatch = (type === 'image');
    else if (activeTab === 'Videos') categoryMatch = (type === 'video');
    else categoryMatch = (item.category === activeTab);

    // Month Filter
    let monthMatch = true;
    if (activeMonth !== 'All Months') {
       if (!item.createdAt) {
         monthMatch = false;
       } else {
         const itemMonth = new Date(item.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' });
         monthMatch = (itemMonth === activeMonth);
       }
    }

    return categoryMatch && monthMatch;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredGallery.length / itemsPerPage);
  const currentItems = filteredGallery.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, activeMonth]);

  return (
    <main className="flex flex-col w-full bg-bg-light overflow-hidden pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative w-full h-[300px] lg:h-[340px] flex items-center bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/uploads/gallery-hero.JPG" 
            alt="Gallery Hero" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-white opacity-5 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute left-0 bottom-0 w-[300px] h-[300px] bg-accent-blue opacity-10 rounded-full blur-[60px] -ml-10 -mb-10 pointer-events-none" />
        </div>
        
        <div className="relative z-10 w-full px-6 lg:px-[120px] max-w-[1440px] mx-auto flex flex-col items-center text-center gap-4">
          <div className="flex items-center gap-2 font-sans text-[13px] font-medium text-white">
            <Link to="/" className="opacity-70 hover:opacity-100 transition-opacity">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-70" />
            <span className="opacity-100">Gallery</span>
          </div>
          <h1 className="font-display text-[32px] lg:text-[44px] font-bold text-white max-w-[800px] leading-[1.2]">
            Our Impact in Pictures
          </h1>
          <p className="font-sans text-[15px] lg:text-[16px] font-normal text-white opacity-70 max-w-[600px] leading-[1.6]">
            Glimpses of impact captured from our various programs, projects, and events across different communities.
          </p>
        </div>
      </section>

      {/* 2. Main Content */}
      <section className="w-full px-6 lg:px-[120px] max-w-[1440px] mx-auto mt-10 lg:mt-[60px]">
        
        <div className="flex flex-col gap-10">
          
          {/* Filters Area */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Tabs */}
            <div className="flex items-center gap-3 overflow-x-auto pb-4 md:pb-0 scrollbar-hide justify-center md:justify-start w-full">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-6 py-2 rounded-full font-sans text-[14px] font-semibold transition-all whitespace-nowrap border ${
                    activeTab === cat 
                      ? 'bg-primary-blue border-primary-blue text-white shadow-md' 
                      : 'bg-white border-border-light text-text-secondary hover:border-primary-blue/30 hover:text-primary-blue'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Month Filter */}
            {months.length > 1 && (
              <select
                value={activeMonth}
                onChange={(e) => setActiveMonth(e.target.value)}
                className="px-4 py-2 bg-white border border-border-light rounded-xl font-sans text-[14px] text-text-secondary outline-none focus:border-primary-blue transition-colors min-w-[150px]"
              >
                {months.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-3 gap-1 md:gap-2">
              {[...Array(9)].map((_, i) => (
                <Skeleton key={i} className="aspect-square w-full rounded-none" />
              ))}
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-16">
              <p className="text-text-secondary text-lg">{error}</p>
              <button onClick={fetchGallery} className="mt-4 px-6 py-2 bg-primary-blue text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                Retry
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && currentItems.length === 0 && (
            <div className="text-center py-16">
              <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold text-text-dark mb-2">No photos found</h3>
              <p className="text-text-secondary">Try selecting a different category or month.</p>
            </div>
          )}

          {/* Gallery Grid */}
          {!loading && !error && currentItems.length > 0 && (
            <div className="grid grid-cols-3 gap-1 md:gap-2">
              {currentItems.map((item) => {
                const type = getType(item);
                const optimalResourceUrl = getOptimizedUrl(item.image);
                return (
                  <GalleryItem key={item._id} item={item} type={type} optimalUrl={optimalResourceUrl} />
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {!loading && !error && totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-8 flex-wrap">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="flex items-center justify-center p-2 rounded-lg border border-border-light bg-white text-text-secondary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                aria-label="Previous Page"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-1.5 flex-wrap justify-center">
                {[...Array(totalPages)].map((_, idx) => {
                  const p = idx + 1;
                  if (
                    p === 1 || 
                    p === totalPages || 
                    (p >= currentPage - 1 && p <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={p}
                        onClick={() => setCurrentPage(p)}
                        className={`w-9 h-9 flex items-center justify-center rounded-lg font-sans text-sm font-semibold transition-colors ${
                          currentPage === p
                            ? 'bg-primary-blue text-white shadow-sm'
                            : 'bg-white border border-border-light text-text-secondary hover:bg-gray-50'
                        }`}
                      >
                        {p}
                      </button>
                    );
                  }
                  if (p === currentPage - 2 || p === currentPage + 2) {
                    return <span key={p} className="text-text-secondary px-1 tracking-widest">...</span>;
                  }
                  return null;
                })}
              </div>
              
              <button 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center justify-center p-2 rounded-lg border border-border-light bg-white text-text-secondary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                aria-label="Next Page"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

        </div>
      </section>
    </main>
  );
}

// Sub-component to handle per-image skeleton load logic
function GalleryItem({ item, type, optimalUrl }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div 
      className="relative w-full aspect-square rounded-none overflow-hidden group cursor-pointer bg-slate-50 border border-border-light/30"
      onClick={() => window.open(item.image, '_blank')}
      title="Click to view full image"
    >
      {/* Skeletons structure until the photo loads */}
      {!isLoaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100">
          <Skeleton className="w-full h-full" />
        </div>
      )}

      {type === 'video' ? (
        <video 
          src={optimalUrl} 
          className="w-full h-full object-cover" 
          muted 
          loop 
          onMouseEnter={(e) => e.target.play()} 
          onMouseLeave={(e) => { e.target.pause(); e.target.currentTime = 0; }}
          onLoadedData={() => setIsLoaded(true)}
        />
      ) : (
        <img 
          src={optimalUrl} 
          alt={item.altText || item.title || 'Gallery image'} 
          className="w-full h-full object-cover" 
          onLoad={() => setIsLoaded(true)}
        />
      )}
      
      {/* Dark Dim Hover Effect */}
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
      
      {type === 'video' && (
        <div className="absolute top-3 right-3 bg-black/30 backdrop-blur-md p-1.5 rounded-full z-20">
          <Play className="w-4 h-4 text-white" fill="white" />
        </div>
      )}
    </div>
  );
}

