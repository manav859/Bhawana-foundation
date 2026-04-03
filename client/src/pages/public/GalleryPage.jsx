import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Image as ImageIcon, Play, Loader2 } from 'lucide-react';
import { http } from '@/features/api/http.js';
import { Skeleton } from '@/components/ui/Skeleton.jsx';

export function GalleryPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await http.get('/gallery');
      setGalleryItems(res.data.data || []);
    } catch (err) {
      setError('Failed to load gallery');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Derive categories from fetched data
  const dataCategories = [...new Set(galleryItems.map(item => item.category).filter(Boolean))];
  const categories = ['All', 'Photos', 'Videos', ...dataCategories];

  // Determine type based on image URL extension
  const getType = (item) => {
    if (item.image?.match(/\.(mp4|webm|mov)/i)) return 'video';
    return 'image';
  };

  const filteredGallery = galleryItems.filter(item => {
    const type = getType(item);
    if (activeTab === 'All') return true;
    if (activeTab === 'Photos') return type === 'image';
    if (activeTab === 'Videos') return type === 'video';
    return item.category === activeTab;
  });

  return (
    <main className="flex flex-col w-full bg-bg-light overflow-hidden pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative w-full h-[300px] lg:h-[340px] flex items-center bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?q=80&w=1200" 
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
          
          {/* Tabs */}
          <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide justify-center">
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

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-[24px]" />
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
          {!loading && !error && filteredGallery.length === 0 && (
            <div className="text-center py-16">
              <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold text-text-dark mb-2">No photos found</h3>
              <p className="text-text-secondary">We'll be adding new photos soon. Check back later!</p>
            </div>
          )}

          {/* Gallery Grid */}
          {!loading && !error && filteredGallery.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGallery.map((item) => {
                const type = getType(item);
                return (
                  <div 
                    key={item._id} 
                    className="relative w-full aspect-square rounded-[24px] overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 bg-slate-50"
                    onClick={() => window.open(item.image, '_blank')}
                    title="Click to view full image"
                  >
                    {type === 'video' ? (
                      <video 
                        src={item.image} 
                        className="w-full h-full object-cover transition-transform duration-700" 
                        muted 
                        loop 
                        onMouseEnter={(e) => e.target.play()} 
                        onMouseLeave={(e) => { e.target.pause(); e.target.currentTime = 0; }}
                      />
                    ) : (
                      <img src={item.image} alt={item.altText || item.title || 'Gallery image'} className="w-full h-full object-cover transition-transform duration-700" />
                    )}
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                      {item.category && <span className="font-sans text-[12px] font-bold text-white/80 uppercase tracking-[1px] mb-1">{item.category}</span>}
                      {item.title && <h4 className="font-display text-[20px] font-bold text-white leading-tight">{item.title}</h4>}
                    </div>
                    
                    <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {type === 'video' ? (
                        <Play className="w-5 h-5 text-white" fill="white" />
                      ) : (
                        <ImageIcon className="w-5 h-5 text-white" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>

    </main>
  );
}
