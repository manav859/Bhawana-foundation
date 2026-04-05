import { useState, useEffect } from 'react';
import { TrendingUp, Package, ShoppingCart, DollarSign, AlertTriangle, Heart, Loader2, BarChart3 } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader.jsx';
import { StatCard } from '@/components/admin/StatCard.jsx';
import { adminShopService } from '@/features/api/services/admin-shop.service.js';

export function AdminShopAnalytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await adminShopService.getAnalytics();
        setData(res.data.data);
      } catch { } finally { setLoading(false); }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <AdminPageHeader title="Shop Analytics" description="Revenue, orders, and product performance at a glance." />
        <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-primary-blue" /></div>
      </div>
    );
  }

  if (!data) return <div className="text-center py-20 text-text-secondary">Failed to load analytics.</div>;

  return (
    <div className="space-y-8 animate-in">
      <AdminPageHeader title="Shop Analytics" description="Revenue, orders, and product performance at a glance." />

      {/* Stat Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Revenue" value={`₹${(data.totalRevenue || 0).toLocaleString()}`} icon={DollarSign} />
        <StatCard title="Paid Orders" value={data.paidOrders || 0} icon={ShoppingCart} />
        <StatCard title="Avg. Order Value" value={`₹${(data.avgOrderValue || 0).toLocaleString()}`} icon={TrendingUp} />
        <StatCard title="Extra Donations" value={`₹${(data.totalDonations || 0).toLocaleString()}`} icon={Heart} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Total Products" value={data.totalProducts || 0} icon={Package} />
        <StatCard title="Published Products" value={data.publishedProducts || 0} icon={BarChart3} />
        <StatCard title="Total Orders" value={data.totalOrders || 0} icon={ShoppingCart} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Top Products */}
        <div className="bg-white rounded-2xl border border-border-light p-6 shadow-sm">
          <h3 className="font-display text-lg font-semibold text-text-dark mb-4">🏆 Top Selling Products</h3>
          {data.topProducts?.length > 0 ? (
            <div className="space-y-3">
              {data.topProducts.map((p, i) => (
                <div key={p._id} className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-primary-blue/10 text-primary-blue text-xs font-bold flex items-center justify-center">{i + 1}</span>
                  {p.images?.[0] ? <img src={p.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover" /> : <div className="w-10 h-10 rounded-lg bg-gray-100" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-dark line-clamp-1">{p.title}</p>
                    <p className="text-xs text-text-muted">₹{p.price?.toLocaleString()}</p>
                  </div>
                  <span className="text-sm font-bold text-primary-blue">{p.salesCount} sold</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-text-muted">No sales yet.</p>
          )}
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white rounded-2xl border border-border-light p-6 shadow-sm">
          <h3 className="font-display text-lg font-semibold text-text-dark mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-warm-orange" /> Low Stock Alerts
          </h3>
          {data.lowStockProducts?.length > 0 ? (
            <div className="space-y-3">
              {data.lowStockProducts.map((p) => (
                <div key={p._id} className="flex items-center gap-3 bg-red-50/50 rounded-lg p-3">
                  {p.images?.[0] ? <img src={p.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover" /> : <div className="w-10 h-10 rounded-lg bg-gray-100" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-dark line-clamp-1">{p.title}</p>
                    <p className="text-xs text-text-muted">Threshold: {p.lowStockThreshold}</p>
                  </div>
                  <span className="text-sm font-bold text-coral-red">{p.stock} left</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-text-muted text-center py-4">✅ All products are well-stocked!</p>
          )}
        </div>
      </div>

      {/* Recent Orders */}
      {data.recentOrders?.length > 0 && (
        <div className="bg-white rounded-2xl border border-border-light p-6 shadow-sm">
          <h3 className="font-display text-lg font-semibold text-text-dark mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {data.recentOrders.map((o) => (
              <div key={o._id} className="flex items-center justify-between text-sm border-b border-border-light pb-3 last:border-0">
                <div>
                  <span className="font-mono font-semibold text-primary-blue">{o.orderNumber}</span>
                  <span className="text-text-muted ml-3">{o.buyer?.name || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold">₹{o.total?.toLocaleString()}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold capitalize ${o.status === 'paid' ? 'bg-blue-100 text-blue-800' : o.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{o.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
