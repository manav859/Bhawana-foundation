import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Projects', path: '/projects' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Events', path: '/events' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 flex w-full items-center justify-between bg-white px-6 h-20 lg:h-24 lg:px-20 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
      {/* Logo Area */}
      <Link to="/" className="flex items-center h-full py-2">
        <img 
          src="/uploads/logo.png" 
          alt="Bhawna Foundation" 
          className="h-full w-auto object-contain transition-opacity hover:opacity-90" 
        />
      </Link>

      {/* Desktop Links */}
      <div className="hidden items-center gap-8 lg:flex">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
          return (
            <Link
              key={link.name}
              to={link.path}
              className={`font-sans text-[15px] transition-colors hover:text-primary-blue ${
                isActive ? 'text-primary-blue font-semibold' : 'text-text-dark font-medium'
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>

      {/* Desktop Donation Button */}
      <div className="hidden lg:block">
        <Link
          to="/donate"
          className="flex items-center gap-2 rounded-lg bg-primary-blue px-7 py-3 font-sans text-[15px] font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-md"
        >
          Donate Now
          <Heart className="h-4 w-4" fill="currentColor" strokeWidth={2} />
        </Link>
      </div>

      {/* Mobile Hamburger */}
      <button 
        className="flex h-6 w-6 items-center justify-center text-text-dark lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute left-0 top-16 w-full flex flex-col bg-white px-6 py-6 border-b border-border-light shadow-lg lg:hidden">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`font-sans text-base transition-colors hover:text-primary-blue ${
                    isActive ? 'text-primary-blue font-semibold' : 'text-text-dark font-medium'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="mt-4 pt-4 border-t border-border-light">
               <Link
                to="/donate"
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-blue px-7 py-3 font-sans text-base font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-md"
              >
                Donate Now
                <Heart className="h-4 w-4" fill="currentColor" strokeWidth={2} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
