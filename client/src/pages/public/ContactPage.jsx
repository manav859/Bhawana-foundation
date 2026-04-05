import { Link } from 'react-router-dom';
import { ChevronRight, MapPin, Mail, Phone, Clock, Send } from 'lucide-react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa6';

export function ContactPage() {
  return (
    <main className="flex flex-col w-full bg-bg-light overflow-hidden pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative w-full h-[340px] lg:h-[420px] flex items-center bg-gray-900 overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/uploads/contact-hero.jpg" 
            alt="Contact Hero" 
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-black/40" />
          {/* Abstract Background Shapes */}
          <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-white opacity-5 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute left-0 bottom-0 w-[300px] h-[300px] bg-accent-blue opacity-10 rounded-full blur-[60px] -ml-10 -mb-10 pointer-events-none" />
        </div>
        
        <div className="relative z-10 w-full px-6 lg:px-[120px] max-w-[1440px] mx-auto flex flex-col gap-4">
          <div className="flex items-center gap-2 font-sans text-[13px] font-medium text-white/70">
            <Link to="/" className="hover:text-white transition-opacity">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Contact Us</span>
          </div>
          <h1 className="font-display text-[32px] lg:text-[44px] font-bold text-white max-w-[600px] leading-[1.2]">
            Get In Touch
          </h1>
          <p className="font-sans text-[15px] lg:text-[16px] font-normal text-white/70 max-w-[500px] leading-[1.6]">
            Whether you have a question about our work, want to volunteer, or are looking to partner with us, we’d love to hear from you.
          </p>
        </div>
      </section>

      {/* 2. Main Layout (Left: Info, Right: Form) */}
      <section className="w-full px-6 lg:px-[120px] max-w-[1440px] mx-auto mt-10 lg:mt-[-60px] relative z-20">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-[60px] items-start">
          
          {/* Left Panel: Contact Info */}
          <div className="flex flex-col gap-8 w-full lg:w-[45%] lg:pt-[80px]">
            <div className="flex flex-col gap-2">
              <h2 className="font-display text-[28px] lg:text-[36px] font-bold text-text-dark leading-[1.2]">
                Contact Information
              </h2>
              <p className="font-sans text-[16px] text-text-secondary leading-[1.7]">
                Reach out to us directly through the information below or use the form to send us a message.
              </p>
            </div>

            <div className="flex flex-col gap-6 mt-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-light-blue rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary-blue" />
                </div>
                <div className="flex flex-col gap-1 pt-1">
                  <h4 className="font-display text-[16px] font-semibold text-text-dark">Foundation Headquarters</h4>
                  <p className="font-sans text-[14px] text-text-secondary leading-[1.6]">
                    Bhawna Foundation Complex,<br />
                    Sector 4, Malviya Nagar,<br />
                    Jaipur - 302017, Rajasthan, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-light-blue rounded-full flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary-blue" />
                </div>
                <div className="flex flex-col gap-1 pt-1">
                  <h4 className="font-display text-[16px] font-semibold text-text-dark">Call Us</h4>
                  <p className="font-sans text-[14px] text-text-secondary leading-[1.6]">+91 141 25X XXXX</p>
                  <p className="font-sans text-[14px] text-text-secondary leading-[1.6]">+91 98XXX XXXXX (Toll Free)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-light-blue rounded-full flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary-blue" />
                </div>
                <div className="flex flex-col gap-1 pt-1">
                  <h4 className="font-display text-[16px] font-semibold text-text-dark">Email Us</h4>
                  <p className="font-sans text-[14px] text-text-secondary leading-[1.6]">contact@bhawnafoundation.org</p>
                  <p className="font-sans text-[14px] text-text-secondary leading-[1.6]">support@bhawnafoundation.org</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-light-blue rounded-full flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-primary-blue" />
                </div>
                <div className="flex flex-col gap-1 pt-1">
                  <h4 className="font-display text-[16px] font-semibold text-text-dark">Working Hours</h4>
                  <p className="font-sans text-[14px] text-text-secondary leading-[1.6]">Monday - Saturday</p>
                  <p className="font-sans text-[14px] text-text-secondary leading-[1.6]">09:00 AM - 06:00 PM</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-6">
              <h4 className="font-display text-[18px] font-semibold text-text-dark">Follow Our Work</h4>
              <div className="flex items-center gap-4">
                <a href="#" className="w-10 h-10 bg-white border border-border-light rounded-full flex items-center justify-center text-text-secondary hover:bg-primary-blue hover:text-white hover:border-primary-blue transition-all">
                  <FaFacebookF className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 bg-white border border-border-light rounded-full flex items-center justify-center text-text-secondary hover:bg-primary-blue hover:text-white hover:border-primary-blue transition-all">
                  <FaTwitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 bg-white border border-border-light rounded-full flex items-center justify-center text-text-secondary hover:bg-primary-blue hover:text-white hover:border-primary-blue transition-all">
                  <FaInstagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 bg-white border border-border-light rounded-full flex items-center justify-center text-text-secondary hover:bg-primary-blue hover:text-white hover:border-primary-blue transition-all">
                  <FaLinkedinIn className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Panel: Contact Form */}
          <div className="w-full lg:w-[55%] bg-white rounded-3xl p-6 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-border-light">
            <h3 className="font-display text-[24px] font-bold text-text-dark mb-6">Send Us A Message</h3>
            
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-sans text-[13px] font-bold text-text-dark tracking-[0.5px]">First Name <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Your first name" required className="w-full px-4 py-3.5 bg-bg-light border border-transparent rounded-lg font-sans text-[15px] focus:outline-none focus:bg-white focus:border-primary-blue transition-all" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-sans text-[13px] font-bold text-text-dark tracking-[0.5px]">Last Name <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Your last name" required className="w-full px-4 py-3.5 bg-bg-light border border-transparent rounded-lg font-sans text-[15px] focus:outline-none focus:bg-white focus:border-primary-blue transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-sans text-[13px] font-bold text-text-dark tracking-[0.5px]">Email Address <span className="text-red-500">*</span></label>
                  <input type="email" placeholder="youremail@example.com" required className="w-full px-4 py-3.5 bg-bg-light border border-transparent rounded-lg font-sans text-[15px] focus:outline-none focus:bg-white focus:border-primary-blue transition-all" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-sans text-[13px] font-bold text-text-dark tracking-[0.5px]">Phone Number</label>
                  <input type="tel" placeholder="+91 XXXXX XXXXX" className="w-full px-4 py-3.5 bg-bg-light border border-transparent rounded-lg font-sans text-[15px] focus:outline-none focus:bg-white focus:border-primary-blue transition-all" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-sans text-[13px] font-bold text-text-dark tracking-[0.5px]">Subject <span className="text-red-500">*</span></label>
                <select required className="w-full px-4 py-3.5 bg-bg-light border border-transparent rounded-lg font-sans text-[15px] text-text-dark focus:outline-none focus:bg-white focus:border-primary-blue transition-all cursor-pointer">
                  <option value="" disabled selected>Select an inquiry type</option>
                  <option value="donation">Donation Queries</option>
                  <option value="partnership">Corporate Partnership / CSR</option>
                  <option value="volunteer">Volunteer Information</option>
                  <option value="media">Media & Press</option>
                  <option value="other">Other Inquiry</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-sans text-[13px] font-bold text-text-dark tracking-[0.5px]">Your Message <span className="text-red-500">*</span></label>
                <textarea rows="5" placeholder="How can we help you?" required className="w-full px-4 py-3.5 bg-bg-light border border-transparent rounded-lg font-sans text-[15px] focus:outline-none focus:bg-white focus:border-primary-blue transition-all resize-none"></textarea>
              </div>

              <button 
                type="submit"
                className="w-[200px] py-4 bg-primary-blue text-white font-sans text-[15px] font-bold rounded-lg shadow-md hover:bg-primary-blue/90 hover:shadow-lg hover:-translate-y-0.5 transition-all mt-2 flex items-center justify-center gap-2"
              >
                Send Message
                <Send className="w-4 h-4 ml-1" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
