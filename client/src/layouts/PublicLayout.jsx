import { Outlet } from 'react-router-dom';
import { PublicFooter } from '@/components/navigation/PublicFooter.jsx';
import { PublicHeader } from '@/components/navigation/PublicHeader.jsx';

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-brand-light text-brand-dark">
      <PublicHeader />
      <main>
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
}