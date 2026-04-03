import { NavLink } from 'react-router-dom';
import { BrandMark } from '@/components/common/BrandMark.jsx';
import { Container } from '@/components/common/Container.jsx';
import { policyNavigation, publicNavigation } from '@/config/navigation.js';
import { siteConfig } from '@/config/site.js';

export function PublicFooter() {
  return (
    <footer className="border-t border-brand-border bg-slate-950 text-white">
      <Container className="grid gap-10 py-12 lg:grid-cols-[1.4fr_1fr_1fr] lg:py-16">
        <div className="space-y-4">
          <BrandMark theme="dark" />
          <p className="max-w-md text-sm leading-7 text-slate-300">
            Responsive public website scaffold aligned for later content, forms, CMS-driven pages, and donation workflows.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold">Explore</h3>
          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            {publicNavigation.map((item) => (
              <NavLink key={item.to} to={item.to} className="hover:text-white">
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold">Contact</h3>
          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            <p>{siteConfig.location}</p>
            <a href={`mailto:${siteConfig.contactEmail}`} className="hover:text-white">
              {siteConfig.contactEmail}
            </a>
            <a href={`tel:${siteConfig.contactPhone.replace(/\s+/g, '')}`} className="hover:text-white">
              {siteConfig.contactPhone}
            </a>
          </div>
        </div>
      </Container>
      <div className="border-t border-slate-800">
        <Container className="flex flex-col gap-4 py-5 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright 2026 {siteConfig.name}. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            {policyNavigation.map((item) => (
              <NavLink key={item.to} to={item.to} className="hover:text-white">
                {item.label}
              </NavLink>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  );
}
