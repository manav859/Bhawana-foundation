import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HandHeartIcon, UsersIcon, BookOpenIcon, HomeIcon, CalendarIcon, ImageIcon, MessageSquareIcon, MailIcon, TrendingUpIcon } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader.jsx';
import { StatCard } from '@/components/admin/StatCard.jsx';
import { dashboardService } from '@/features/api/services/dashboard.service.js';

export function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await dashboardService.getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to load dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const counts = stats?.counts || {};

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="Dashboard Overview" 
        description="Welcome to the Bhawna Foundation administration panel." 
      />

      {loading ? (
        <div className="animate-pulse space-y-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-32 rounded-2xl bg-slate-200"></div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard title="Total Donations" value={`₹${(counts.donationAmount || 0).toLocaleString()}`} icon={HandHeartIcon} />
          <StatCard title="Donation Records" value={counts.donations ?? 0} icon={TrendingUpIcon} />
          <StatCard title="Active Projects" value={counts.projects ?? 0} icon={HomeIcon} />
          <StatCard title="Active Programs" value={counts.programs ?? 0} icon={CalendarIcon} />
          <StatCard title="Blog Posts" value={counts.blogs ?? 0} icon={BookOpenIcon} />
          <StatCard title="Volunteers" value={counts.volunteers ?? 0} icon={UsersIcon} />
          <StatCard title="Events" value={counts.events ?? 0} icon={CalendarIcon} />
          <StatCard title="Contact Inquiries" value={counts.contacts ?? 0} icon={MessageSquareIcon} />
          <StatCard title="Newsletter Subscribers" value={counts.subscribers ?? 0} icon={MailIcon} />
        </div>
      )}

      {/* Quick Links */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'New Project', to: '/admin/projects/new', color: 'bg-blue-50 text-blue-700 hover:bg-blue-100' },
            { label: 'New Program', to: '/admin/programs/new', color: 'bg-green-50 text-green-700 hover:bg-green-100' },
            { label: 'New Blog Post', to: '/admin/blogs/new', color: 'bg-purple-50 text-purple-700 hover:bg-purple-100' },
            { label: 'Upload to Gallery', to: '/admin/gallery/new', color: 'bg-amber-50 text-amber-700 hover:bg-amber-100' },
          ].map((action) => (
            <Link key={action.to} to={action.to} className={`px-4 py-3 rounded-xl text-sm font-semibold text-center transition-colors ${action.color}`}>
              {action.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      {stats?.recent && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-4">
          {stats.recent.donations?.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Recent Donations</h3>
              <div className="space-y-3">
                {stats.recent.donations.map((d, i) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <span className="text-slate-600 truncate">{d.donorName || 'Anonymous'}</span>
                    <span className="font-semibold text-primary-blue">₹{(d.amount || 0).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {stats.recent.volunteers?.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Recent Volunteers</h3>
              <div className="space-y-3">
                {stats.recent.volunteers.map((v, i) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <span className="text-slate-600 truncate">{v.name}</span>
                    <span className="text-slate-400 text-xs">{new Date(v.createdAt).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {stats.recent.contacts?.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Recent Inquiries</h3>
              <div className="space-y-3">
                {stats.recent.contacts.map((c, i) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <span className="text-slate-600 truncate">{c.name}</span>
                    <span className="text-slate-400 text-xs">{new Date(c.createdAt).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}