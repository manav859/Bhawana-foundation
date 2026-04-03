import { useState, useEffect } from 'react';
import { Quote, MessageCircle, ArrowRight } from 'lucide-react';
import { publicService } from '@/features/api/services/public.service.js';
import { PageIntro } from '@/components/common/PageIntro.jsx';
import { SubmitTestimonialModal } from '@/components/common/SubmitTestimonialModal.jsx';

export function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await publicService.getTestimonials({ limit: 50 }); // Fetch up to 50
      setTestimonials(res.data.data || []);
    } catch (err) {
      console.error("Failed to load testimonials", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col w-full bg-bg-light overflow-hidden">
      <PageIntro 
        title="Testimonials" 
        subtitle="Read the experiences and stories from our community members, volunteers, and beneficiaries."
      />

      <section className="w-full px-6 py-[60px] lg:px-20 lg:py-[80px]">
        <div className="flex flex-col gap-10 max-w-[1440px] mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-4">
             <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-light-blue rounded-full w-fit">
              <MessageCircle className="w-3.5 h-3.5 text-primary-blue shrink-0" />
              <span className="font-sans text-[12px] font-bold tracking-[1px] text-primary-blue uppercase">All Testimonials</span>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2.5 bg-primary-blue text-white rounded-lg font-sans text-[15px] font-semibold hover:bg-primary-blue/90 transition-colors shadow-sm whitespace-nowrap"
            >
              Add Testimonial
            </button>
          </div>

          {loading ? (
             <div className="w-full flex justify-center py-20">
               <div className="w-10 h-10 border-4 border-slate-200 border-t-primary-blue rounded-full animate-spin"></div>
             </div>
          ) : testimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <div key={testimonial._id} className="flex flex-col gap-5 p-8 rounded-xl bg-white border border-border-light relative shadow-sm hover:shadow-md transition-shadow">
                  <Quote className="w-8 h-8 text-primary-blue/20" />
                  <p className="font-sans text-[15px] font-normal text-text-dark leading-[1.7] italic flex-1">
                    “{testimonial.quote}”
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-border-light/50">
                    <div className="flex items-center justify-center w-11 h-11 bg-primary-blue rounded-full text-white font-sans text-base font-semibold uppercase">
                      {testimonial.name[0]}
                    </div>
                    <div className="flex flex-col leading-tight">
                      <span className="font-sans text-[14px] font-semibold text-text-dark">{testimonial.name}</span>
                      {testimonial.role && <span className="font-sans text-[13px] font-normal text-text-secondary">{testimonial.role}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
             <div className="w-full flex flex-col items-center justify-center py-20 text-center gap-4 bg-white rounded-xl border border-border-light">
               <MessageCircle className="w-12 h-12 text-slate-300" />
               <h3 className="font-display text-xl font-semibold text-text-dark">No testimonials yet.</h3>
               <p className="font-sans text-text-secondary">Be the first to share your experience with us!</p>
               <button 
                  onClick={() => setIsModalOpen(true)}
                  className="mt-2 px-6 py-2.5 bg-primary-blue text-white rounded-lg font-sans text-[15px] font-semibold hover:bg-primary-blue/90 transition-colors shadow-sm"
                >
                  Add Testimonial
                </button>
             </div>
          )}
        </div>
      </section>

      <SubmitTestimonialModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </main>
  );
}
