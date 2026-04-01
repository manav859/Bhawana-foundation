import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Calendar as CalendarIcon, MapPin, Clock, ArrowRight, Loader2 } from 'lucide-react';
import { publicService } from '@/features/api/services/public.service.js';
import { formatEventDate } from '@/utils/format.js';

const categories = ["All", "Upcoming", "Past"];

export function EventsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, [activeTab]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {};
      if (activeTab !== "All") {
        params.status = activeTab.toLowerCase();
      }
      
      const res = await publicService.getEvents(params);
      setEvents(res.data.data || []);
    } catch (err) {
      setError(err.message || "Failed to load events. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Status mapping for filter display if API doesn't support status param directly yet
  // but our API does support query params.
  const filteredEvents = activeTab === "All" 
    ? events 
    : events.filter(event => event.status.toLowerCase() === activeTab.toLowerCase());

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
            <span className="text-white">Events</span>
          </div>
          <h1 className="font-display text-[32px] lg:text-[44px] font-bold text-white max-w-[600px] leading-[1.2]">
            Join Our Events
          </h1>
          <p className="font-sans text-[15px] lg:text-[16px] font-normal text-white/80 max-w-[500px] leading-[1.6]">
            Participate in our upcoming workshops, fundraisers, and community drives to make a direct impact on the ground.
          </p>
        </div>
      </section>

      {/* 2. Main Content */}
      <section className="w-full px-6 lg:px-[120px] max-w-[1440px] mx-auto mt-10 lg:mt-[60px]">
        
        <div className="flex flex-col gap-10">
          
          {/* Tabs */}
          <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide border-b border-border-light">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-1 pb-3 font-sans text-[15px] font-bold transition-all whitespace-nowrap border-b-2 -mb-[17px] ${
                  activeTab === cat 
                    ? 'border-primary-blue text-primary-blue' 
                    : 'border-transparent text-text-secondary hover:text-text-dark'
                }`}
              >
                {cat} Events
              </button>
            ))}
          </div>

          {/* Events List */}
          <div className="flex flex-col gap-6 min-h-[400px]">
            {loading ? (
               <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-border-light">
                <Loader2 className="w-10 h-10 text-primary-blue animate-spin mb-4" />
                <p className="text-text-secondary font-medium">Loading events...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-red-100">
                <div className="p-3 bg-red-50 rounded-full mb-4">
                  <CalendarIcon className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="font-display text-[20px] font-bold text-text-dark">Unable to load events</h3>
                <p className="font-sans text-[15px] text-text-secondary mt-2 max-w-sm text-center">{error}</p>
                <button onClick={fetchEvents} className="mt-6 px-6 py-2 bg-primary-blue text-white rounded-lg font-bold text-sm">Retry</button>
              </div>
            ) : filteredEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-border-light">
                <CalendarIcon className="w-12 h-12 text-border-dark mb-4" />
                <h3 className="font-display text-[20px] font-bold text-text-dark">No Events Found</h3>
                <p className="font-sans text-[15px] text-text-secondary mt-2">There are currently no {activeTab === "All" ? "" : activeTab.toLowerCase()} events to display.</p>
              </div>
            ) : (
              filteredEvents.map((event) => {
                const { month, day } = formatEventDate(event.date);
                return (
                  <div key={event._id} className="flex flex-col lg:flex-row bg-white rounded-2xl border border-border-light shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
                    
                    {/* Image & Date Badge */}
                    <div className="relative w-full lg:w-[320px] h-[200px] lg:h-auto shrink-0 overflow-hidden">
                      <img src={event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600'} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      
                      {/* Date Badge */}
                      <div className="absolute top-4 left-4 flex flex-col items-center justify-center bg-white rounded-xl shadow-md px-4 py-2 min-w-[64px]">
                        <span className="font-sans text-[12px] font-bold text-primary-blue uppercase tracking-[1px]">{month}</span>
                        <span className="font-display text-[24px] font-bold text-text-dark leading-none">{day}</span>
                      </div>
                      
                      {event.category && (
                        <div className="absolute top-4 right-4 flex gap-2">
                          <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white font-sans text-[12px] font-bold rounded-full">
                            {event.category}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col p-6 lg:p-8 justify-center flex-1 gap-4">
                      <h3 className="font-display text-[22px] lg:text-[26px] font-bold text-text-dark leading-tight group-hover:text-primary-blue transition-colors">
                        <Link to={`/events/${event.slug}`}>{event.title}</Link>
                      </h3>
                      
                      <p className="font-sans text-[15px] lg:text-[16px] font-normal text-text-secondary leading-[1.6] line-clamp-2">
                        {event.shortDescription || event.fullDescription?.substring(0, 150) + "..."}
                      </p>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 mt-2">
                        {event.time && (
                          <div className="flex items-center gap-2 text-text-secondary">
                            <Clock className="w-4 h-4 shrink-0" />
                            <span className="font-sans text-[14px] font-medium">{event.time}</span>
                          </div>
                        )}
                        {event.location && (
                          <div className="flex items-center gap-2 text-text-secondary">
                            <MapPin className="w-4 h-4 shrink-0" />
                            <span className="font-sans text-[14px] font-medium">{event.location}</span>
                          </div>
                        )}
                      </div>

                      <div className="w-full h-px bg-border-light my-2" />

                      <div className="flex items-center justify-between">
                        <span className={`font-sans text-[13px] font-bold px-3 py-1 rounded-full capitalize ${event.status === 'upcoming' ? 'bg-success-green/10 text-success-green' : 'bg-gray-100 text-text-secondary'}`}>
                          {event.status}
                        </span>
                        
                        <Link to={`/events/${event.slug}`} className="flex items-center gap-2 text-primary-blue font-sans text-[15px] font-bold hover:gap-3 transition-all">
                          {event.status === 'upcoming' ? 'Register Now' : 'View Details'}
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>

                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

    </main>
  );
}
