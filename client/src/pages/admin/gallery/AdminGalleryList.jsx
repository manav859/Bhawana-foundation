import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DatabaseIcon, Edit2, Trash2, Plus, Search } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader.jsx';
import { EmptyState } from '@/components/admin/EmptyState.jsx';
import { Button } from '@/components/ui/Button.jsx';
import { Input } from '@/components/ui/Input.jsx';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog.jsx';
import { adminService } from '@/features/api/services/admin.service.js';

export function AdminGalleryList() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetch = async () => {
    try { setLoading(true); const res = await adminService.list('gallery', { limit: 50 }); setItems(res.data.data || []); }
    catch {} finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try { setDeleting(true); await adminService.remove('gallery', deleteTarget._id); setItems(p => p.filter(x => x._id !== deleteTarget._id)); setDeleteTarget(null); }
    catch (err) { alert(err.message); } finally { setDeleting(false); }
  };

  const filtered = searchTerm ? items.filter(i => (i.title || '').toLowerCase().includes(searchTerm.toLowerCase())) : items;

  return (
    <div className="space-y-6 animate-in">
      <AdminPageHeader title="Manage Gallery" description="Upload and manage photos & videos."
        action={<Button onClick={() => navigate('/admin/gallery/new')} className="flex items-center gap-2"><Plus className="w-4 h-4" /> Add Item</Button>} />
      <div className="relative w-full sm:max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-secondary" />
        <Input placeholder="Search gallery..." className="pl-9" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-primary-blue border-t-transparent rounded-full animate-spin" /></div>
      ) : filtered.length === 0 ? (
        <EmptyState icon={DatabaseIcon} title="No gallery items" message="Upload your first photo or video." action={<Button onClick={() => navigate('/admin/gallery/new')}>Upload</Button>} />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <div key={item._id} className="relative group rounded-xl overflow-hidden border border-border-light shadow-sm aspect-square">
              <img src={item.image} alt={item.title || ''} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button onClick={() => navigate(`/admin/gallery/${item._id}/edit`)} className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"><Edit2 className="w-4 h-4 text-text-dark" /></button>
                <button onClick={() => setDeleteTarget(item)} className="p-2 bg-red-500 rounded-full shadow-md hover:bg-red-600"><Trash2 className="w-4 h-4 text-white" /></button>
              </div>
              {item.title && <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3"><p className="text-white text-xs font-medium truncate">{item.title}</p></div>}
            </div>
          ))}
        </div>
      )}
      <ConfirmDialog isOpen={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} loading={deleting} title="Delete Item" message="Delete this gallery item?" />
    </div>
  );
}
