import { Link } from 'react-router-dom';
import { ChevronRight, Heart, Users, Calendar, Target, CheckCircle, ArrowRight } from 'lucide-react';

export function VolunteerPage() {
  return (
    <main className="flex flex-col w-full bg-bg-light overflow-hidden pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative w-full h-[280px] lg:h-[340px] flex items-center bg-primary-blue overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1593113563332-f36e8976b92a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzQ4ODkyNDd8&ixlib=rb-4.1.0&q=80&w=1080" 
            alt="Volunteer Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary-blue/90 mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 w-full px-6 lg:px-[120px] max-w-[1440px] mx-auto flex flex-col gap-4">
          <div className="flex items-center gap-2 text-white/80 font-sans text-[13px] font-medium">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Volunteer</span>
          </div>
          <h1 className="font-display text-[32px] lg:text-[44px] font-bold text-white max-w-[600px] leading-[1.2]">
            Become a Volunteer
          </h1>
          <p className="font-sans text-[15px] lg:text-[16px] font-normal text-white/80 max-w-[500px] leading-[1.6]">
            Join our dedicated community of changemakers. Offer your time and skills to make a tangible impact on the ground.
          </p>
        </div>
      </section>

      {/* 2. Main Layout (Left: Info, Right: Form) */}
      <section className="w-full px-6 lg:px-[120px] max-w-[1440px] mx-auto mt-10 lg:mt-[60px]">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-[60px] items-start">
          
          {/* Left Panel: Info & Impact Areas */}
          <div className="flex flex-col gap-8 w-full lg:w-1/2">
            
            <div className="flex flex-col gap-4">
              <h2 className="font-display text-[28px] lg:text-[36px] font-bold text-text-dark leading-[1.2]">
                Why Volunteer With Us?
              </h2>
              <p className="font-sans text-[16px] text-text-secondary leading-[1.7]">
                Volunteering with Bhawna Foundation allows you to contribute your skills directly where they are needed most. You'll gain hands-on experience in social work, connect with inspiring like-minded individuals, and be the catalyst for real change.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-border-light shadow-sm">
                <div className="w-12 h-12 bg-light-blue rounded-full flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary-blue" />
                </div>
                <h4 className="font-display text-[16px] font-bold text-text-dark">Community Impact</h4>
                <p className="font-sans text-[13px] text-text-secondary mt-1">Directly engage with and uplift underserved communities.</p>
              </div>

              <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-border-light shadow-sm">
                <div className="w-12 h-12 bg-light-blue rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-primary-blue" />
                </div>
                <h4 className="font-display text-[16px] font-bold text-text-dark">Skill Growth</h4>
                <p className="font-sans text-[13px] text-text-secondary mt-1">Develop leadership, communication, and logistical skills.</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-6">
              <h3 className="font-display text-[22px] font-bold text-text-dark">Key Areas of Impact</h3>
              <ul className="flex flex-col gap-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success-green mt-0.5" />
                  <span className="font-sans text-[15px] font-medium text-text-dark">Education & Teaching Assistance</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success-green mt-0.5" />
                  <span className="font-sans text-[15px] font-medium text-text-dark">Health Camp Logistics & Support</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success-green mt-0.5" />
                  <span className="font-sans text-[15px] font-medium text-text-dark">Digital Marketing & Content Creation</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success-green mt-0.5" />
                  <span className="font-sans text-[15px] font-medium text-text-dark">Environmental & Plantation Drives</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Right Panel: Volunteer Registration Form */}
          <div className="w-full lg:w-1/2 bg-white rounded-3xl p-6 lg:p-10 border border-border-light shadow-md lg:-mt-[100px] relative z-20">
            <h3 className="font-display text-[24px] font-bold text-text-dark mb-2">Volunteer Application</h3>
            <p className="font-sans text-[14px] text-text-secondary mb-6">Fill out the form below to start your journey with us.</p>
            
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-[13px] font-bold text-text-dark uppercase tracking-[0.5px]">First Name *</label>
                  <input type="text" placeholder="John" required className="w-full px-4 py-3 bg-bg-light border border-transparent rounded-lg font-sans text-[15px] focus:outline-none focus:bg-white focus:border-primary-blue transition-all" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-[13px] font-bold text-text-dark uppercase tracking-[0.5px]">Last Name *</label>
                  <input type="text" placeholder="Doe" required className="w-full px-4 py-3 bg-bg-light border border-transparent rounded-lg font-sans text-[15px] focus:outline-none focus:bg-white focus:border-primary-blue transition-all" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-[13px] font-bold text-text-dark uppercase tracking-[0.5px]">Email Address *</label>
                <input type="email" placeholder="john@example.com" required className="w-full px-4 py-3 bg-bg-light border border-transparent rounded-lg font-sans text-[15px] focus:outline-none focus:bg-white focus:border-primary-blue transition-all" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-[13px] font-bold text-text-dark uppercase tracking-[0.5px]">Phone Number *</label>
                <input type="tel" placeholder="+91 98765 43210" required className="w-full px-4 py-3 bg-bg-light border border-transparent rounded-lg font-sans text-[15px] focus:outline-none focus:bg-white focus:border-primary-blue transition-all" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-[13px] font-bold text-text-dark uppercase tracking-[0.5px]">Profession / Occupation *</label>
                <input type="text" placeholder="e.g. Student, Software Engineer, Teacher" required className="w-full px-4 py-3 bg-bg-light border border-transparent rounded-lg font-sans text-[15px] focus:outline-none focus:bg-white focus:border-primary-blue transition-all" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-[13px] font-bold text-text-dark uppercase tracking-[0.5px]">Area of Interest *</label>
                <select required className="w-full px-4 py-3 bg-bg-light border border-transparent rounded-lg font-sans text-[15px] text-text-dark focus:outline-none focus:bg-white focus:border-primary-blue transition-all cursor-pointer">
                  <option value="" disabled selected>Select an area</option>
                  <option value="education">Education & Teaching</option>
                  <option value="healthcare">Healthcare Campaigns</option>
                  <option value="fundraising">Fundraising & Events</option>
                  <option value="marketing">Digital Marketing / Social Media</option>
                  <option value="logistics">Operations & Logistics</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-[13px] font-bold text-text-dark uppercase tracking-[0.5px]">Why do you want to join us?</label>
                <textarea rows="3" placeholder="Tell us briefly about your motivation..." className="w-full px-4 py-3 bg-bg-light border border-transparent rounded-lg font-sans text-[15px] focus:outline-none focus:bg-white focus:border-primary-blue transition-all resize-none"></textarea>
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-primary-blue text-white font-sans text-[15px] font-bold rounded-lg hover:bg-primary-blue/90 shadow-md hover:-translate-y-0.5 transition-all mt-4 flex items-center justify-center gap-2"
              >
                Submit Application
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>

        </div>
      </section>

    </main>
  );
}
