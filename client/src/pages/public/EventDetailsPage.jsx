import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, ChevronRight, Share2, Loader2, AlertCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/Skeleton.jsx';
import { publicService } from '@/features/api/services/public.service.js';
import { formatDateLong } from '@/utils/format.js';

export function EventDetailsPage() {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvent();
  }, [slug]);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await publicService.getEvent(slug);
      setEvent(res.data.data);
    } catch (err) {
      setError(err.response?.status === 404 ? "Event not found" : "Failed to load event details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="flex flex-col w-full bg-bg-light overflow-hidden pb-20">
        <section className="relative w-full h-[340px] bg-slate-200 animate-pulse flex items-center" />
        <div className="px-6 lg:px-[120px] max-w-[1440px] mx-auto mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 flex flex-col gap-8">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-64 w-full" />
            <div className="flex flex-col gap-4">
               <Skeleton className="h-6 w-full" />
               <Skeleton className="h-6 w-5/6" />
               <Skeleton className="h-6 w-4/6" />
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <Skeleton className="h-64 w-full rounded-2xl" />
            <Skeleton className="h-32 w-full rounded-2xl" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !event) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-bg-light px-6">
        <div className="p-4 bg-white rounded-2xl border border-border-light shadow-sm flex flex-col items-center gap-4 max-w-md w-full text-center">
          <AlertCircle className="w-12 h-12 text-red-500" />
          <h2 className="font-display text-2xl font-bold text-text-dark">{error || "Event Not Found"}</h2>
          <p className="font-sans text-text-secondary">The event you are looking for might have been removed or is currently unavailable.</p>
          <Link to="/events" className="mt-4 px-8 py-3 bg-primary-blue text-white rounded-lg font-bold">Back to Events</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="flex flex-col w-full bg-bg-light overflow-hidden pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative w-full h-[340px] overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src={event.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1080"} 
            alt={event.title} 
            className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
            title="Click to view full image"
            onClick={() => window.open(event.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1080", '_blank')}

          />
          <div className="absolute inset-0 bg-black/65" />
        </div>
        <div className="relative z-10 w-full px-6 lg:px-[120px] max-w-[1440px] mx-auto flex flex-col gap-4">
          <div className="flex items-center gap-2 text-white/80 font-sans text-[13px] font-medium flex-wrap">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/events" className="hover:text-white transition-colors">Events</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white line-clamp-1">{event.title}</span>
          </div>
          {event.category && (
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white font-sans text-[12px] font-bold rounded-full uppercase">
                {event.category}
              </span>
            </div>
          )}
          <h1 className="font-display text-[32px] lg:text-[44px] font-bold text-white max-w-[800px] leading-[1.2]">
            {event.title}
          </h1>
        </div>
      </section>

      {/* 2. Main Content & Sidebar */}
      <section className="w-full px-6 lg:px-[120px] max-w-[1440px] mx-auto mt-10 lg:mt-[60px]">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start">
          
          {/* Main Content (Left) */}
          <div className="flex flex-col gap-8 w-full lg:w-[65%] bg-white p-6 lg:p-10 rounded-2xl border border-border-light shadow-sm">
            
            <div className="flex flex-col gap-4">
              <h2 className="font-display text-[24px] lg:text-[28px] font-bold text-text-dark">About The Event</h2>
              {event.shortDescription && (
                 <p className="font-sans text-[16px] lg:text-[18px] font-semibold text-text-dark leading-[1.6]">
                  {event.shortDescription}
                </p>
              )}
              <div className="font-sans text-[15px] lg:text-[16px] font-normal text-text-secondary leading-[1.8] whitespace-pre-wrap">
                {event.fullDescription || "Details about this event will be updated soon."}
              </div>
            </div>

            {/* Event Media Gallery could go here in future */}
              <div 
                className="w-full rounded-xl overflow-hidden mt-4 bg-slate-50 cursor-pointer group relative"
                onClick={() => window.open(event.image, '_blank')}
              >
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-auto object-cover max-h-[500px] group-hover:scale-[1.02] transition-transform duration-500"

                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                   <span className="text-white opacity-0 group-hover:opacity-100 font-sans text-sm font-semibold bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">View Full Image</span>
                </div>
              </div>

            <div className="flex items-center gap-4 pt-6 border-t border-border-light mt-4">
              <span className="font-sans text-[14px] font-semibold text-text-dark">Share this event:</span>
              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-bg-light hover:bg-border-light transition-colors">
                <Share2 className="w-4 h-4 text-primary-blue" />
                <span className="font-sans text-[13px] font-medium text-text-dark">Share</span>
              </button>
            </div>

          </div>

          {/* Sidebar (Right) */}
          <div className="flex flex-col gap-6 w-full lg:w-[35%] sticky top-24">
            
            {/* Event Details Card */}
            <div className="flex flex-col gap-5 p-6 rounded-2xl bg-white border border-border-light shadow-lg">
              <h3 className="font-display text-[20px] font-bold text-text-dark border-b border-border-light pb-4">Event Logistics</h3>
              
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-bg-light flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-primary-blue" />
                  </div>
                  <div className="flex flex-col pt-1">
                    <span className="font-sans text-[12px] text-text-secondary uppercase">Date</span>
                    <span className="font-sans text-[15px] font-semibold text-text-dark">
                      {formatDateLong(event.date)}
                    </span>
                  </div>
                </div>

                {event.time && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded bg-bg-light flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-primary-blue" />
                    </div>
                    <div className="flex flex-col pt-1">
                      <span className="font-sans text-[12px] text-text-secondary uppercase">Time</span>
                      <span className="font-sans text-[15px] font-semibold text-text-dark">{event.time}</span>
                    </div>
                  </div>
                )}

                {event.location && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded bg-bg-light flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-primary-blue" />
                    </div>
                    <div className="flex flex-col pt-1">
                      <span className="font-sans text-[12px] text-text-secondary uppercase">Location</span>
                      <span className="font-sans text-[15px] font-semibold text-text-dark leading-snug">{event.location}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="w-full h-px bg-border-light my-2" />
              
              <div className="flex flex-col gap-2">
                <span className="font-sans text-[14px] text-text-secondary italic">
                  Status: {event.status === 'upcoming' ? 'Reservations Open' : 'Event Concluded'}
                </span>
                {event.status === 'upcoming' && (
                  <Link to="/contact" className="flex items-center justify-center w-full py-4 bg-primary-blue text-white font-sans text-[15px] font-bold rounded-lg hover:bg-primary-blue/90 shadow-md transition-colors mt-2">
                    Inquire / Register
                  </Link>
                )}
              </div>
            </div>

            {/* Organizer Info */}
            <div className="flex flex-col p-6 rounded-2xl bg-white border border-border-light shadow-sm">
              <h3 className="font-display text-[16px] font-bold text-text-dark mb-4">Organization</h3>
              <div className="flex items-center gap-3">
                <div className="w-20 h-20 rounded-full overflow-hidden shrink-0 border border-border-light flex items-center justify-center bg-white p-2">
                   <img src="/uploads/logo.png" alt="Bhawna Foundation" className="max-w-full max-h-full object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-[14px] font-bold text-text-dark">Bhawna Foundation</span>
                  <Link to="/contact" className="font-sans text-[13px] font-medium text-primary-blue hover:underline">Contact Us</Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
