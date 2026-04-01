import { NavLink } from 'react-router-dom';
import { X, Heart, Home, Info, BookOpen, Layers, Calendar, Image, FileText, Phone, User } from 'lucide-react';
import { Container } from '@/components/common/Container.jsx';
import { BrandMark } from '@/components/common/BrandMark.jsx';
import { Button } from '@/components/ui/Button.jsx';
import { publicNavigation } from '@/config/navigation.js';
import { cn } from '@/utils/cn.js';

const navIcons = {
  Home: Home,
  About: Info,
  Programs: BookOpen,
  Projects: Layers,
  Events: Calendar,
  Gallery: Image,
  Blog: FileText,
  Contact: Phone,
};

export function MobileMenu({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[60] bg-brand-dark/20 backdrop-blur-md transition-all duration-300 animate-in fade-in fill-mode-both"
      onClick={onClose}
    >
      <Container className="flex h-full items-center justify-end px-4">
        <aside 
          className="relative h-[calc(100vh-2rem)] w-full max-w-sm rounded-[2.5rem] bg-white p-8 shadow-2xl animate-in slide-in-from-right-8 duration-500 fill-mode-both"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-8 border-b border-brand-border/40">
            <BrandMark compact />
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-light text-brand-dark transition-colors hover:bg-brand-border/40"
              onClick={onClose}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="my-10 h-[calc(100%-16rem)] overflow-y-auto pr-2 custom-scrollbar">
            <div className="grid gap-2">
              {publicNavigation.map((item) => {
                const Icon = navIcons[item.label] || Home;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-4 rounded-2xl px-6 py-4 text-base font-bold tracking-tight transition-all duration-200',
                        isActive 
                          ? 'bg-brand-blue/10 text-brand-blue shadow-sm' 
                          : 'text-brand-secondary hover:bg-brand-light hover:text-brand-dark'
                      )
                    }
                  >
                    <Icon size={20} className={({ isActive }) => cn(isActive ? 'text-brand-blue' : 'text-brand-muted')} />
                    {item.label}
                  </NavLink>
                );
              })}
            </div>
          </nav>

          {/* Footer Actions */}
          <div className="absolute bottom-10 inset-x-8 space-y-4 pt-8 border-t border-brand-border/40">
             <Button to="/admin/login" variant="ghost" className="w-full justify-start px-6 gap-3" onClick={onClose}>
                <User size={18} />
                Admin Panel
             </Button>
             <Button to="/donate" variant="primary" className="w-full gap-3 py-4 text-base shadow-lg shadow-blue-200" onClick={onClose}>
                <Heart size={20} fill="currentColor" />
                Support Us Now
             </Button>
          </div>
        </aside>
      </Container>
    </div>
  );
}
