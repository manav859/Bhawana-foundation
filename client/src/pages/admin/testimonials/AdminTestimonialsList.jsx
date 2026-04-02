import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DatabaseIcon, Edit2, Trash2, Plus, Search } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader.jsx';
import { EmptyState } from '@/components/admin/EmptyState.jsx';
import { TableShell } from '@/components/admin/TableShell.jsx';
import { Button } from '@/components/ui/Button.jsx';
import { Input } from '@/components/ui/Input.jsx';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog.jsx';
import { adminService } from '@/features/api/services/admin.service.js';

export function AdminTestimonialsList() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchItems = async () => {
    try { setLoading(true); const res = await adminService.list('testimonials', { limit: 50 }); setItems(res.data.data || []); }
    catch {} finally { setLoading(false); }
  };
  useEffect(() => { fetchItems(); }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try { setDeleting(true); await adminService.remove('testimonials', deleteTarget._id); setItems(p => p.filter(x => x._id !== deleteTarget._id)); setDeleteTarget(null); }
    catch (err) { alert(err.message); } finally { setDeleting(false); }
  };

  const filtered = searchTerm ? items.filter(i => i.name?.toLowerCase().includes(searchTerm.toLowerCase())) : items;

  return (
    <div className="space-y-6 animate-in">
      <AdminPageHeader title="Manage Testimonials" description="Curate beneficiary and volunteer testimonials."
        action={<Button onClick={() => navigate('/admin/testimonials/new')} className="flex items-center gap-2"><Plus className="w-4 h-4" /> Add</Button>} />
      <div className="relative w-full sm:max-w-xs"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-secondary" /><Input placeholder="Search..." className="pl-9" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
      <TableShell headings={['Name', 'Role', 'Quote', 'Featured', 'Actions']}>
        {loading ? <tr><td colSpan={5} className="p-8 text-center text-brand-secondary">Loading...</td></tr>
        : filtered.length === 0 ? <tr><td colSpan={5} className="p-0"><EmptyState icon={DatabaseIcon} title="No testimonials" message="Add your first testimonial." action={<Button onClick={() => navigate('/admin/testimonials/new')}>Add</Button>} /></td></tr>
        : filtered.map(item => (
          <tr key={item._id} className="border-b border-border-light hover:bg-bg-light/50 transition-colors">
            <td className="px-6 py-4 font-medium text-text-dark text-[14px]">{item.name}</td>
            <td className="px-6 py-4 text-[14px] text-text-secondary">{item.role || 'N/A'}</td>
            <td className="px-6 py-4 text-[13px] text-text-secondary max-w-xs truncate">{item.quote}</td>
            <td className="px-6 py-4 text-[13px]">{item.isFeatured ? '⭐' : '—'}</td>
            <td className="px-6 py-4"><div className="flex items-center gap-3">
              <button onClick={() => navigate(`/admin/testimonials/${item._id}/edit`)} className="text-brand-secondary hover:text-primary-blue transition-colors"><Edit2 className="w-4 h-4" /></button>
              <button onClick={() => setDeleteTarget(item)} className="text-brand-secondary hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div></td>
          </tr>
        ))}
      </TableShell>
      <ConfirmDialog isOpen={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} loading={deleting} title="Delete Testimonial" message={`Delete testimonial from "${deleteTarget?.name}"?`} />
    </div>
  );
}
