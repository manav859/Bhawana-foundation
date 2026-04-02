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

export function AdminPartnersList() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchItems = async () => {
    try { setLoading(true); const res = await adminService.list('partners', { search: searchTerm, limit: 50 }); setItems(res.data.data || []); }
    catch {} finally { setLoading(false); }
  };
  useEffect(() => { const t = setTimeout(fetchItems, 300); return () => clearTimeout(t); }, [searchTerm]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try { setDeleting(true); await adminService.remove('partners', deleteTarget._id); setItems(p => p.filter(x => x._id !== deleteTarget._id)); setDeleteTarget(null); }
    catch (err) { alert(err.message); } finally { setDeleting(false); }
  };

  return (
    <div className="space-y-6 animate-in">
      <AdminPageHeader title="Manage Partners" description="Manage partner logos and links."
        action={<Button onClick={() => navigate('/admin/partners/new')} className="flex items-center gap-2"><Plus className="w-4 h-4" /> Add Partner</Button>} />
      <div className="relative w-full sm:max-w-xs"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-secondary" /><Input placeholder="Search..." className="pl-9" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
      <TableShell headings={['Logo', 'Name', 'Website', 'Active', 'Actions']}>
        {loading ? <tr><td colSpan={5} className="p-8 text-center text-brand-secondary">Loading...</td></tr>
        : items.length === 0 ? <tr><td colSpan={5} className="p-0"><EmptyState icon={DatabaseIcon} title="No partners" message="Add your first partner." action={<Button onClick={() => navigate('/admin/partners/new')}>Add</Button>} /></td></tr>
        : items.map(item => (
          <tr key={item._id} className="border-b border-border-light hover:bg-bg-light/50 transition-colors">
            <td className="px-6 py-4">{item.logo ? <img src={item.logo} alt="" className="w-10 h-10 rounded object-contain border border-border-light" /> : <div className="w-10 h-10 rounded bg-gray-100 border border-border-light" />}</td>
            <td className="px-6 py-4 font-medium text-text-dark text-[14px]">{item.name}</td>
            <td className="px-6 py-4 text-[13px] text-primary-blue truncate max-w-[200px]">{item.website || '—'}</td>
            <td className="px-6 py-4 text-[13px]">{item.isActive ? '✅' : '❌'}</td>
            <td className="px-6 py-4"><div className="flex items-center gap-3">
              <button onClick={() => navigate(`/admin/partners/${item._id}/edit`)} className="text-brand-secondary hover:text-primary-blue transition-colors"><Edit2 className="w-4 h-4" /></button>
              <button onClick={() => setDeleteTarget(item)} className="text-brand-secondary hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div></td>
          </tr>
        ))}
      </TableShell>
      <ConfirmDialog isOpen={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} loading={deleting} title="Delete Partner" message={`Delete "${deleteTarget?.name}"?`} />
    </div>
  );
}
