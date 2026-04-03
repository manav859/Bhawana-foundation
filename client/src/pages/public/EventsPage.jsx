import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Calendar as CalendarIcon, MapPin, Clock } from 'lucide-react';
import { publicService } from '@/features/api/services/public.service.js';

const categories = ["Upcoming", "Past"];

export function EventsPage() {
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        setIsLoading(true);
        const res = await publicService.getEvents();
        setEvents(res.data?.data || []);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(e => {
    if (activeTab === "Upcoming") return e.status === "upcoming";
    if (activeTab === "Past") return e.status === "past";
    return true;
  });

  if (isLoading) {
    return (
      <main className="flex flex-col w-full bg-bg-light min-h-screen py-20 items-center justify-center">
        <div className="text-text-secondary text-lg">Loading events...</div>
      </main>
    );
  }

  return (
    <main className="flex flex-col w-full bg-bg-light overflow-hidden pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative w-full h-[300px] lg:h-[340px] flex items-center bg-gray-900 overflow-hidden">
        {/* Hero Background Image with Neutral Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200" 
            alt="Events Hero" 
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
            <span className="opacity-100">Events</span>
          </div>
          <h1 className="font-display text-[32px] lg:text-[44px] font-bold text-white max-w-[800px] leading-[1.2]">
            Upcoming Events & Campaigns
          </h1>
          <p className="font-sans text-[15px] lg:text-[16px] font-normal text-white opacity-70 max-w-[600px] leading-[1.6]">
            Participate in our upcoming workshops, fundraisers, and community drives to make a direct impact on the ground.
          </p>
        </div>
      </section>

      {/* 2. Main Content */}
      <section className="w-full px-6 lg:px-[120px] max-w-[1440px] mx-auto mt-10 lg:mt-[60px]">
        
        <div className="flex flex-col gap-10">
          
          {/* Custom Tabs */}
          <div className="flex items-center gap-8 border-b border-border-light">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`pb-4 font-sans text-[16px] font-bold transition-all whitespace-nowrap border-b-2 -mb-px ${
                  activeTab === cat 
                    ? 'border-primary-blue text-primary-blue' 
                    : 'border-transparent text-text-secondary hover:text-text-dark'
                }`}
              >
                {cat} Events
              </button>
            ))}
          </div>

          {/* Events List - Modern Horizontal Cards */}
          <div className="flex flex-col gap-6 min-h-[400px]">
            {filteredEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-border-light">
                <CalendarIcon className="w-12 h-12 text-border-dark mb-4" />
                <h3 className="font-display text-[20px] font-bold text-text-dark">No Events Found</h3>
                <p className="font-sans text-[15px] text-text-secondary mt-2">There are currently no {activeTab.toLowerCase()} events to display.</p>
              </div>
            ) : (
              filteredEvents.map((event) => (
                <div 
                  key={event.id || event._id} 
                  className="flex flex-col md:flex-row items-center bg-white rounded-[24px] p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow border border-border-light/50 gap-6 lg:gap-10"
                >
                  {/* Image Container */}
                  <div className="w-full md:w-[240px] aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden bg-slate-50 shrink-0">
                    <img 
                      src={event.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600"} 
                      alt={event.title} 
                      className="w-full h-full object-cover transition-transform duration-500" 
                    />
                  </div>

                  {/* Date Display */}
                  <div className="flex flex-col items-center justify-center min-w-[80px] shrink-0 border-b md:border-b-0 md:border-r border-border-light pb-4 md:pb-0 md:pr-8">
                    <span className="font-sans text-[14px] font-bold text-primary-blue uppercase tracking-wider">
                      {event.date ? new Date(event.date).toLocaleString('en-US', { month: 'short' }).toUpperCase() : 'TBA'}
                    </span>
                    <span className="font-display text-[36px] font-bold text-text-dark leading-none mt-1">
                      {event.date ? new Date(event.date).getDate().toString().padStart(2, '0') : '--'}
                    </span>
                  </div>

                  {/* Info Section */}
                  <div className="flex flex-col flex-1 gap-3">
                    <div className="flex items-center">
                      <span className="px-4 py-1.5 bg-blue-50 text-primary-blue font-sans text-[12px] font-bold rounded-full border border-blue-100">
                        {event.category || 'General'}
                      </span>
                    </div>
                    <h3 className="font-display text-[22px] lg:text-[28px] font-bold text-text-dark leading-tight">
                      {event.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-1">
                      <div className="flex items-center gap-2 text-text-secondary">
                        <Clock className="w-4 h-4 opacity-70" />
                        <span className="font-sans text-[14px] font-medium">{event.time || 'TBA'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-text-secondary">
                        <MapPin className="w-4 h-4 opacity-70" />
                        <span className="font-sans text-[14px] font-medium">{event.location || 'TBA'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Section */}
                  <div className="shrink-0 w-full md:w-auto mt-4 md:mt-0">
                    <button className={`w-full md:w-[150px] py-3 rounded-xl font-sans text-[15px] font-bold transition-all duration-300 ${
                      (event.buttonStyle || (activeTab === 'Upcoming' ? 'filled' : 'outlined')) === 'filled'
                        ? 'bg-primary-blue text-white hover:bg-blue-700 shadow-md'
                        : 'border border-primary-blue text-primary-blue hover:bg-primary-blue/5'
                    }`}>
                      {event.buttonText || (activeTab === 'Upcoming' ? 'Register' : 'Learn More')}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

    </main>
  );
}
