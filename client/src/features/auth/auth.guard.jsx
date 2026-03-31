import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/features/auth/auth.context.jsx';

export function RequireAdminAuth() {
  const { bootstrapping, isAuthenticated } = useAuth();
  const location = useLocation();

  if (bootstrapping) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-light px-4 text-brand-secondary">
        Loading admin shell...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}