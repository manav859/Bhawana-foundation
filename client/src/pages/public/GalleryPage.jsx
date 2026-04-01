import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Image as ImageIcon } from 'lucide-react';

const galleryData = [
  { id: 1, category: "Education", src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzQ4OTc2MDZ8&ixlib=rb-4.1.0&q=80&w=800", title: "School Renovation - Jaipur", span: "col-span-1 md:col-span-2 row-span-2" },
  { id: 2, category: "Healthcare", src: "https://images.unsplash.com/photo-1576089172869-4f5f6f315620?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzQ4OTc3OTN8&ixlib=rb-4.1.0&q=80&w=800", title: "Medical Camp - Alwar", span: "col-span-1 md:col-span-1 row-span-1" },
  { id: 3, category: "Livelihood", src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzQ4OTc4MDJ8&ixlib=rb-4.1.0&q=80&w=800", title: "Women's Skill Session", span: "col-span-1 md:col-span-1 row-span-1" },
  { id: 4, category: "Environment", src: "https://images.unsplash.com/photo-1593113563332-f36e8976b92a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzQ4ODkyNDd8&ixlib=rb-4.1.0&q=80&w=800", title: "Tree Plantation", span: "col-span-1 md:col-span-1 row-span-1" },
  { id: 5, category: "Education", src: "https://images.unsplash.com/photo-1588072432836-e10032774350?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzQ4ODkyNDd8&ixlib=rb-4.1.0&q=80&w=800", title: "Digital Literacy Drive", span: "col-span-1 md:col-span-2 row-span-1" },
  { id: 6, category: "Healthcare", src: "https://images.unsplash.com/photo-1653508310086-bd5f097286ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzQ4ODgxMTN8&ixlib=rb-4.1.0&q=80&w=800", title: "Maternal Health Clinic", span: "col-span-1 md:col-span-1 row-span-1" },
];

const categories = ["All Photos", "Education", "Healthcare", "Livelihood", "Environment"];

export function GalleryPage() {
  const [activeTab, setActiveTab] = useState("All Photos");

  const filteredGallery = activeTab === "All Photos" 
    ? galleryData 
    : galleryData.filter(item => item.category === activeTab);

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
            <span className="text-white">Gallery</span>
          </div>
          <h1 className="font-display text-[32px] lg:text-[44px] font-bold text-white max-w-[600px] leading-[1.2]">
            Our Gallery
          </h1>
          <p className="font-sans text-[15px] lg:text-[16px] font-normal text-white/80 max-w-[500px] leading-[1.6]">
            Glimpses of impact captured from our various programs, projects, and events across different communities.
          </p>
        </div>
      </section>

      {/* 2. Main Content */}
      <section className="w-full px-6 lg:px-[120px] max-w-[1440px] mx-auto mt-10 lg:mt-[60px]">
        
        <div className="flex flex-col gap-10">
          
          {/* Tabs */}
          <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide border-b border-border-light justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 pb-3 font-sans text-[15px] font-bold transition-all whitespace-nowrap border-b-2 -mb-[17px] ${
                  activeTab === cat 
                    ? 'border-primary-blue text-primary-blue' 
                    : 'border-transparent text-text-secondary hover:text-text-dark'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Grid (Bento/Masonry style approach) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 auto-rows-[240px]">
            {filteredGallery.map((item) => (
              <div 
                key={item.id} 
                className={`relative w-full h-full rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-lg transition-shadow ${
                  activeTab === 'All Photos' ? item.span : 'col-span-1 row-span-1'
                }`}
              >
                <img src={item.src} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="font-sans text-[12px] font-bold text-white/80 uppercase tracking-[1px] mb-1">{item.category}</span>
                  <h4 className="font-display text-[18px] lg:text-[20px] font-bold text-white">{item.title}</h4>
                </div>
                
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ImageIcon className="w-5 h-5 text-white" />
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          {filteredGallery.length > 0 && (
            <div className="flex justify-center mt-6">
              <button className="px-8 py-3.5 bg-white border border-border-light rounded-lg font-sans text-[15px] font-semibold text-text-dark hover:bg-bg-light transition-colors">
                Load More Photos
              </button>
            </div>
          )}

        </div>
      </section>

    </main>
  );
}
