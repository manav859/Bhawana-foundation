import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DatabaseIcon, Edit2, Trash2, Plus, AlertCircle, Search } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader.jsx';
import { EmptyState } from '@/components/admin/EmptyState.jsx';
import { TableShell } from '@/components/admin/TableShell.jsx';
import { Button } from '@/components/ui/Button.jsx';
import { Input } from '@/components/ui/Input.jsx';
import { StatusBadge } from '@/components/ui/StatusBadge.jsx';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog.jsx';
import { adminService } from '@/features/api/services/admin.service.js';

export function AdminProgramsList() {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await adminService.list('programs', { search: searchTerm, limit: 50 });
      setPrograms(res.data.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load programs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const t = setTimeout(fetchPrograms, 300);
    return () => clearTimeout(t);
  }, [searchTerm]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      setDeleting(true);
      await adminService.remove('programs', deleteTarget._id);
      setPrograms((prev) => prev.filter((p) => p._id !== deleteTarget._id));
      setDeleteTarget(null);
    } catch (err) {
      alert(err.message || 'Failed to delete program');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6 animate-in">
      <AdminPageHeader
        title="Manage Programs"
        description="Create, update, and publish programs & initiatives."
        action={
          <Button onClick={() => navigate('/admin/programs/new')} className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Program
          </Button>
        }
      />

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pb-2">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-secondary" />
          <Input placeholder="Search programs..." className="pl-9" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>

      <TableShell headings={['Title', 'Category', 'Status', 'Created', 'Actions']}>
        {loading && programs.length === 0 ? (
          <tr><td colSpan={5} className="p-8 text-center text-brand-secondary">
            <div className="flex justify-center items-center gap-2">
              <div className="w-5 h-5 border-2 border-primary-blue border-t-transparent rounded-full animate-spin" /> Loading...
            </div>
          </td></tr>
        ) : error ? (
          <tr><td colSpan={5} className="p-8">
            <div className="flex flex-col items-center justify-center text-red-500 gap-2">
              <AlertCircle className="w-8 h-8" /><p>{error}</p>
              <Button variant="outline" onClick={fetchPrograms}>Try Again</Button>
            </div>
          </td></tr>
        ) : programs.length === 0 ? (
          <tr><td colSpan={5} className="p-0">
            <EmptyState icon={DatabaseIcon} title="No programs found" message={searchTerm ? 'Try adjusting your search.' : 'Create your first program.'} action={!searchTerm && <Button onClick={() => navigate('/admin/programs/new')}>Create Program</Button>} />
          </td></tr>
        ) : programs.map((program) => (
          <tr key={program._id} className="border-b border-border-light hover:bg-bg-light/50 transition-colors">
            <td className="px-6 py-4">
              <div className="flex items-center gap-3">
                {program.image ? <img src={program.image} alt="" className="w-10 h-10 rounded-md object-cover border border-border-light hidden sm:block" /> : <div className="w-10 h-10 rounded-md bg-gray-100 border border-border-light hidden sm:block" />}
                <div><span className="font-medium text-text-dark text-[14px] line-clamp-1">{program.title}</span><br /><span className="text-[12px] text-text-secondary">{program.slug}</span></div>
              </div>
            </td>
            <td className="px-6 py-4 text-[14px] text-text-secondary">{program.category || 'N/A'}</td>
            <td className="px-6 py-4"><StatusBadge status={program.status} /></td>
            <td className="px-6 py-4 text-[13px] text-text-secondary">{new Date(program.createdAt).toLocaleDateString()}</td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-3">
                <button onClick={() => navigate(`/admin/programs/${program._id}/edit`)} className="text-brand-secondary hover:text-primary-blue transition-colors"><Edit2 className="w-4 h-4" /></button>
                <button onClick={() => setDeleteTarget(program)} className="text-brand-secondary hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </td>
          </tr>
        ))}
      </TableShell>

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete Program"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
      />
    </div>
  );
}
