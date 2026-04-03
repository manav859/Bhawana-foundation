import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa6';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const socialLinks = [
    { icon: FaFacebookF, url: '#' },
    { icon: FaTwitter, url: '#' },
    { icon: FaInstagram, url: '#' },
    { icon: FaLinkedinIn, url: '#' },
    { icon: FaYoutube, url: '#' },
  ];

  return (
    <footer className="w-full bg-[#0F172A] px-6 py-[60px] pb-8 lg:px-20 lg:pt-[60px] lg:pb-8 flex flex-col gap-10">
      
      {/* Top Main Section */}
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-12 w-full justify-between">
        
        {/* Column 1: Brand & Desc */}
        <div className="flex flex-col gap-4 lg:w-[360px]">
          <Link to="/" className="flex items-center">
            <img 
              src="/uploads/logo.png" 
              alt="Bhawna Foundation" 
              className="h-16 lg:h-20 w-auto object-contain transition-opacity hover:opacity-90" 
            />
          </Link>
          <p className="font-sans text-sm font-normal leading-[1.7] text-[#94A3B8] lg:w-[340px]">
            A non-profit organization dedicated to empowering communities through education, healthcare, and sustainable development programs across India.
          </p>
          <div className="flex items-center gap-3 pt-2">
            {socialLinks.map((social, idx) => {
              const Icon = social.icon;
              return (
                <a
                  key={idx}
                  href={social.url}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1E293B] text-[#94A3B8] transition-all duration-300 hover:bg-primary-blue hover:text-white hover:scale-[1.1] active:scale-[0.9] hover:shadow-lg"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col gap-4">
          <h3 className="font-display text-base font-semibold text-white">Quick Links</h3>
          <div className="flex flex-col gap-4">
            {quickLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="font-sans text-sm font-normal text-[#94A3B8] transition-colors hover:text-white"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>



        {/* Column 4: Contact Info */}
        <div className="flex flex-col gap-4">
          <h3 className="font-display text-base font-semibold text-white">Contact Info</h3>
          <div className="flex flex-col gap-4">
            <address className="flex items-center gap-2 not-italic">
              <MapPin className="h-3.5 w-3.5 text-accent-blue" />
              <span className="font-sans text-sm font-normal text-[#94A3B8]">
                Jaipur, Rajasthan, India
              </span>
            </address>
            <a href="tel:+919876543210" className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-accent-blue" />
              <span className="font-sans text-sm font-normal text-[#94A3B8] transition-colors hover:text-white">
                +91 98765 43210
              </span>
            </a>
            <a href="mailto:info@bhawnafoundation.org" className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-accent-blue" />
              <span className="font-sans text-sm font-normal text-[#94A3B8] transition-colors hover:text-white">
                info@bhawnafoundation.org
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-[#1E293B]" />

      {/* Bottom Legal Section */}
      <div className="flex flex-col-reverse gap-4 pb-2 lg:flex-row lg:items-center lg:justify-between lg:pb-0">
        <p className="font-sans text-[13px] font-normal text-[#64748B]">
          © {currentYear} Bhawna Foundation. All rights reserved.
        </p>
        <div className="flex flex-wrap items-center gap-6">
          <Link to="/privacy-policy" className="font-sans text-[13px] font-normal text-[#64748B] transition-colors hover:text-white">
            Privacy Policy
          </Link>
          <Link to="/terms" className="font-sans text-[13px] font-normal text-[#64748B] transition-colors hover:text-white">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
