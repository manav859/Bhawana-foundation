import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  Package, 
  ShoppingCart, 
  LogOut, 
  ChevronRight, 
  Mail, 
  ShoppingBag,
  Settings,
  Heart
} from 'lucide-react';
import { useBuyerAuth } from '@/features/buyer-auth/BuyerAuthContext.jsx';
import { useCart } from '@/features/cart/CartContext.jsx';

export function AccountPage() {
  const { buyer, logout } = useBuyerAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/shop/login');
  };

  const accountOptions = [
    {
      title: 'My Orders',
      description: 'View and track your previous purchases',
      icon: <Package className="w-6 h-6 text-primary-blue" />,
      link: '/my-orders',
      count: null
    },
    {
      title: 'My Cart',
      description: 'Check out the items you saved for later',
      icon: <ShoppingCart className="w-6 h-6 text-warm-orange" />,
      link: '/cart',
      count: cartCount > 0 ? cartCount : null
    },
    {
      title: 'Continue Shopping',
      description: 'Explore our latest products and support our cause',
      icon: <ShoppingBag className="w-6 h-6 text-green-600" />,
      link: '/shop',
      count: null
    }
  ];

  return (
    <div className="min-h-screen bg-bg-light/30 pb-20">
      {/* Hero Header */}
      <div className="bg-white border-b border-border-light pt-10 pb-12">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 bg-primary-blue/10 rounded-2xl flex items-center justify-center text-primary-blue border-2 border-primary-blue/5">
                <User className="w-10 h-10" />
              </div>
              <div>
                <h1 className="font-display text-3xl font-bold text-text-dark">
                   Namaste, {buyer?.name || 'User'}
                </h1>
                <div className="flex items-center gap-2 mt-1 text-text-secondary">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm font-medium">{buyer?.email}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 px-6 py-3 border border-red-100 text-red-600 rounded-xl font-semibold hover:bg-red-50 transition-all duration-300"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-text-dark flex items-center gap-2 px-1">
              Account Overview
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {accountOptions.map((option) => (
                <Link
                  key={option.title}
                  to={option.link}
                  className="group block bg-white p-6 rounded-2xl border border-border-light shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden"
                >
                  <div className="flex items-start justify-between relative z-10">
                    <div className="flex flex-col gap-4">
                      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        {option.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-text-dark text-lg group-hover:text-primary-blue transition-colors">
                          {option.title}
                        </h3>
                        <p className="text-sm text-text-secondary mt-1 leading-relaxed">
                          {option.description}
                        </p>
                      </div>
                    </div>
                    
                    {option.count !== null && (
                      <span className="bg-warm-orange text-white text-xs font-bold px-2 py-1 rounded-full">
                        {option.count}
                      </span>
                    )}
                    
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-primary-blue transition-all group-hover:translate-x-1" />
                  </div>
                  
                  {/* Subtle hover background effect */}
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary-blue/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
              ))}
            </div>

            {/* Profile Info Card */}
            <div className="bg-white rounded-2xl border border-border-light shadow-sm overflow-hidden">
               <div className="p-6 border-b border-border-light flex justify-between items-center bg-gray-50/50">
                  <h3 className="font-bold text-text-dark">Profile Details</h3>
                  <button className="text-sm text-primary-blue font-semibold hover:underline flex items-center gap-1">
                    <Settings className="w-4 h-4" /> Edit Profile
                  </button>
               </div>
               <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-y-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-text-muted mb-1">Full Name</p>
                    <p className="text-text-dark font-medium">{buyer?.name || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-text-muted mb-1">Email Address</p>
                    <p className="text-text-dark font-medium">{buyer?.email}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-text-muted mb-1">Member Since</p>
                    <p className="text-text-dark font-medium">
                      {buyer?.createdAt ? new Date(buyer.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : 'Recently joined'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-text-muted mb-1">Account Type</p>
                    <p className="text-text-dark font-medium flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span> Verified Buyer
                    </p>
                  </div>
               </div>
            </div>
          </div>

          {/* Sidebar / Impact Area */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-primary-blue to-blue-700 rounded-3xl p-8 text-white shadow-lg overflow-hidden relative">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12 blur-xl" />
              
              <div className="relative z-10">
                <h3 className="text-xl font-display font-bold mb-3">Your Impact</h3>
                <p className="text-blue-50 text-sm leading-relaxed mb-6">
                  Every purchase you make from our foundation shop directly supports our ongoing social projects and initiatives.
                </p>
                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <Heart className="w-5 h-5" fill="currentColor" />
                    </div>
                    <div>
                      <p className="text-xs text-blue-100 font-medium">Helping Lives</p>
                      <p className="text-lg font-bold">Foundation Member</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-warm-orange/5 border border-warm-orange/20 rounded-2xl p-6">
              <h4 className="text-warm-orange font-bold mb-2 flex items-center gap-2 text-sm italic">
                Support the Foundation
              </h4>
              <p className="text-text-secondary text-sm mb-4 leading-relaxed">
                Consider making a direct contribution to help us reach more people in need across our communities.
              </p>
              <Link
                to="/donate"
                className="block text-center w-full py-3 bg-warm-orange text-white rounded-xl font-bold text-sm hover:bg-orange-600 transition-colors shadow-sm"
              >
                Donate Directly
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
