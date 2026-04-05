import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useBuyerAuth } from './BuyerAuthContext.jsx';

export function RequireBuyerAuth() {
  const { isAuthenticated, loading } = useBuyerAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-3 border-primary-blue border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/shop/login" state={{ from: location.pathname }} replace />;
  }

  return <Outlet />;
}
