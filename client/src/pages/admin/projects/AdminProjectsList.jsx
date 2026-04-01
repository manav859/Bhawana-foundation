import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DatabaseIcon, Edit2, Trash2, Plus, AlertCircle, Search } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader.jsx';
import { EmptyState } from '@/components/admin/EmptyState.jsx';
import { TableShell } from '@/components/admin/TableShell.jsx';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { adminService } from '@/features/api/services/admin.service';

export function AdminProjectsList() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await adminService.list('projects', { search: searchTerm, limit: 50 });
      setProjects(res.data.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load projects. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchProjects();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      return;
    }
    try {
      setDeletingId(id);
      await adminService.remove('projects', id);
      setProjects(projects.filter(project => project._id !== id));
    } catch (err) {
      alert(err.message || 'Failed to delete project');
    } finally {
      setDeletingId(null);
    }
  };

  const statusColors = {
    draft: 'bg-gray-100 text-gray-800',
    published: 'bg-green-100 text-green-800',
  };

  return (
    <div className="space-y-6 animate-in">
      <AdminPageHeader
        title="Manage Projects"
        description="Create, update, and publish successful projects & initiatives."
        action={
          <Button onClick={() => navigate('/admin/projects/new')} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Project
          </Button>
        }
      />

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pb-2">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-secondary" />
          <Input 
            placeholder="Search projects..." 
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <TableShell headings={['Title', 'Category', 'Location', 'Beneficiaries', 'Status', 'Actions']}>
        {loading && projects.length === 0 ? (
          <tr>
            <td colSpan={6} className="p-8 text-center text-brand-secondary">
              <div className="flex justify-center items-center gap-2">
                <div className="w-5 h-5 border-2 border-primary-blue border-t-transparent rounded-full animate-spin" />
                Loading projects...
              </div>
            </td>
          </tr>
        ) : error ? (
          <tr>
            <td colSpan={6} className="p-8">
              <div className="flex flex-col items-center justify-center text-red-500 gap-2">
                <AlertCircle className="w-8 h-8" />
                <p>{error}</p>
                <Button variant="outline" onClick={fetchProjects} className="mt-2">Try Again</Button>
              </div>
            </td>
          </tr>
        ) : projects.length === 0 ? (
          <tr>
            <td colSpan={6} className="p-0">
              <EmptyState
                icon={DatabaseIcon}
                title="No projects found"
                message={searchTerm ? "Try adjusting your search query." : "Upload your first success story or project."}
                action={!searchTerm && <Button onClick={() => navigate('/admin/projects/new')}>Create First Project</Button>}
              />
            </td>
          </tr>
        ) : (
          projects.map((project) => (
            <tr key={project._id} className="border-b border-border-light hover:bg-bg-light/50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  {project.images?.length > 0 ? (
                    <img src={project.images[0]} alt={project.title} className="w-10 h-10 rounded-md object-cover border border-border-light hidden sm:block" />
                  ) : (
                    <div className="w-10 h-10 rounded-md bg-gray-100 border border-border-light hidden sm:block" />
                  )}
                  <div className="flex flex-col">
                    <span className="font-medium text-text-dark text-[14px] line-clamp-1">{project.title}</span>
                    <span className="text-[12px] text-text-secondary">{project.slug}</span>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-[14px] text-text-secondary uppercase">
                {project.category || 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-[14px] text-text-secondary">
                {project.location || 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-[14px] font-medium text-text-dark">
                {project.beneficiaries ? project.beneficiaries.toLocaleString() : '0'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[project.status] || 'bg-gray-100'}`}>
                  {project.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => navigate(`/admin/projects/${project._id}/edit`)}
                    className="text-brand-secondary hover:text-primary-blue transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(project._id)}
                    disabled={deletingId === project._id}
                    className="text-brand-secondary hover:text-red-500 transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))
        )}
      </TableShell>
    </div>
  );
}
