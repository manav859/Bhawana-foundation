import { useEffect, useState } from 'react';
import { ShieldCheckIcon, HandHeartIcon, UsersIcon, BookOpenIcon, HomeIcon, CalendarIcon } from 'lucide-react';
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

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="Dashboard Overview" 
        description="Welcome to the Bhawna Foundation administration panel. Here are the latest metrics." 
      />

      {loading ? (
        <div className="animate-pulse space-y-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-32 rounded-2xl bg-slate-200"></div>
            ))}
          </div>
        </div>
      ) : stats ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard title="Total Donations" value={stats.donations ?? 0} icon={HandHeartIcon} />
          <StatCard title="Volunteer Applications" value={stats.volunteers ?? 0} icon={UsersIcon} />
          <StatCard title="Published Blog Posts" value={stats.blogPosts ?? 0} icon={BookOpenIcon} />
          <StatCard title="Active Projects" value={stats.activeProjects ?? 0} icon={HomeIcon} />
          <StatCard title="Active Programs" value={stats.activePrograms ?? 0} icon={ShieldCheckIcon} />
          <StatCard title="Upcoming Events" value={stats.openEvents ?? 0} icon={CalendarIcon} />
        </div>
      ) : (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-600">
          Failed to load dashboard statistics.
        </div>
      )}

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Recent Activity</h2>
        <p className="mt-2 text-sm text-slate-500">
          The recent activity feed will be populated in Phase 4 when the core event streaming infrastructure is implemented.
        </p>
      </div>
    </div>
  );
}