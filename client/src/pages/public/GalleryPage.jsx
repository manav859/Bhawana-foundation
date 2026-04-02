import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Image as ImageIcon } from 'lucide-react';

const galleryData = [
  { id: 1, category: "Education", src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzQ4OTc2MDZ8&ixlib=rb-4.1.0&q=80&w=800", title: "Rural Primary Schooling", span: "square" },
  { id: 2, category: "Healthcare", src: "https://images.unsplash.com/photo-1576089172869-4f5f6f315620?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzQ4OTc3OTN8&ixlib=rb-4.1.0&q=80&w=800", title: "Community Healthcare Center", span: "square" },
  { id: 3, category: "Events", src: "https://images.unsplash.com/photo-1582213713374-132b9ef1825b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzQ4OTc4MDJ8&ixlib=rb-4.1.0&q=80&w=800", title: "Women's Vocational Training", span: "square" },
  { id: 4, category: "Healthcare", src: "https://images.unsplash.com/photo-1593113563332-f36e8976b92a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzQ4ODkyNDZ8&ixlib=rb-4.1.0&q=80&w=800", title: "Village Wellness Awareness", span: "square" },
  { id: 5, category: "Healthcare", src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzQ4ODkyNDd8&ixlib=rb-4.1.0&q=80&w=800", title: "Support for the Elderly", span: "square" },
  { id: 6, category: "Education", src: "https://images.unsplash.com/photo-1588072432836-e10032774350?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzQ4ODgxMTN8&ixlib=rb-4.1.0&q=80&w=800", title: "Literacy Empowerment Program", span: "square" },
];

const categories = ["All Photos", "Education", "Healthcare", "Events"];

export function GalleryPage() {
  const [activeTab, setActiveTab] = useState("All Photos");

  const filteredGallery = activeTab === "All Photos" 
    ? galleryData 
    : galleryData.filter(item => item.category === activeTab);

  return (
    <main className="flex flex-col w-full bg-bg-light overflow-hidden pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative w-full h-[300px] lg:h-[340px] flex items-center bg-gray-900 overflow-hidden">
        {/* Hero Background Image with Neutral Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?q=80&w=1200" 
            alt="Gallery Hero" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-black/40" />
          {/* Abstract Background Shapes */}
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
          
          {/* Tabs - Updated to Capsule Style */}
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

          {/* Gallery Grid (Uniform 3-Column Square Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item) => (
              <div 
                key={item.id} 
                className="relative w-full aspect-square rounded-[24px] overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <img src={item.src} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                  <span className="font-sans text-[12px] font-bold text-white/80 uppercase tracking-[1px] mb-1">{item.category}</span>
                  <h4 className="font-display text-[20px] font-bold text-white leading-tight">{item.title}</h4>
                </div>
                
                <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ImageIcon className="w-5 h-5 text-white" />
                </div>
              </div>
            ))}
          </div>

          {/* Load More - Outlined Style */}
          {filteredGallery.length > 0 && (
            <div className="flex justify-center mt-6">
              <button className="px-10 py-3 bg-white border border-primary-blue rounded-xl font-sans text-[15px] font-bold text-primary-blue hover:bg-primary-blue hover:text-white transition-all duration-300 shadow-sm">
                Load More Photos
              </button>
            </div>
          )}

        </div>
      </section>

    </main>
  );
}
