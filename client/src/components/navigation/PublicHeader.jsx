import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BrandMark } from '@/components/common/BrandMark.jsx';
import { Container } from '@/components/common/Container.jsx';
import { Button } from '@/components/ui/Button.jsx';
import { publicNavigation } from '@/config/navigation.js';
import { cn } from '@/utils/cn.js';

export function PublicHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-brand-border/70 bg-white/95 backdrop-blur">
      <Container className="flex h-20 items-center justify-between gap-6">
        <NavLink to="/" aria-label="Go to home">
          <BrandMark />
        </NavLink>

        <nav className="hidden items-center gap-6 lg:flex">
          {publicNavigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'text-sm font-medium text-brand-secondary hover:text-brand-blue',
                  isActive && 'text-brand-blue',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button to="/admin/login" variant="secondary">
            Admin Login
          </Button>
          <Button to="/donate" variant="warm">
            Donate Now
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex rounded-2xl border border-brand-border px-4 py-2 text-sm font-semibold text-brand-dark lg:hidden"
          onClick={() => setMenuOpen((current) => !current)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
        >
          Menu
        </button>
      </Container>

      {menuOpen && (
        <div className="border-t border-brand-border bg-white lg:hidden">
          <Container className="space-y-3 py-4">
            {publicNavigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="block rounded-2xl px-4 py-3 text-sm font-medium text-brand-secondary hover:bg-slate-100 hover:text-brand-blue"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Button to="/admin/login" variant="secondary" className="w-full" onClick={() => setMenuOpen(false)}>
                Admin Login
              </Button>
              <Button to="/donate" variant="warm" className="w-full" onClick={() => setMenuOpen(false)}>
                Donate Now
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}