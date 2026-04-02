import { useEffect, useState } from 'react';
import { DatabaseIcon, Trash2 } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader.jsx';
import { EmptyState } from '@/components/admin/EmptyState.jsx';
import { TableShell } from '@/components/admin/TableShell.jsx';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog.jsx';
import { http } from '@/features/api/http.js';

export function AdminNewsletterList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => { fetchItems(); }, []);
  const fetchItems = async () => { try { setLoading(true); const res = await http.get('/newsletter'); setItems(res.data.data || []); } catch {} finally { setLoading(false); } };
  const handleDelete = async () => { if (!deleteTarget) return; try { setDeleting(true); await http.delete(`/newsletter/${deleteTarget._id}`); setItems(p => p.filter(x => x._id !== deleteTarget._id)); setDeleteTarget(null); } catch (err) { alert(err.message); } finally { setDeleting(false); } };

  return (
    <div className="space-y-6 animate-in">
      <AdminPageHeader title="Newsletter Subscribers" description={`${items.length} total subscribers`} />
      <TableShell headings={['Email', 'Subscribed', 'Active', 'Actions']}>
        {loading ? <tr><td colSpan={4} className="p-8 text-center">Loading...</td></tr>
        : items.length === 0 ? <tr><td colSpan={4} className="p-0"><EmptyState icon={DatabaseIcon} title="No subscribers" message="No newsletter subscribers yet." /></td></tr>
        : items.map(item => (
          <tr key={item._id} className="border-b border-border-light hover:bg-bg-light/50 transition-colors">
            <td className="px-6 py-4 font-medium text-text-dark text-[14px]">{item.email}</td>
            <td className="px-6 py-4 text-[13px] text-text-secondary">{new Date(item.createdAt).toLocaleDateString()}</td>
            <td className="px-6 py-4 text-[13px]">{item.isActive !== false ? '✅' : '❌'}</td>
            <td className="px-6 py-4">
              <button onClick={() => setDeleteTarget(item)} className="text-brand-secondary hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
            </td>
          </tr>
        ))}
      </TableShell>
      <ConfirmDialog isOpen={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} loading={deleting} title="Remove Subscriber" message={`Remove "${deleteTarget?.email}" from the newsletter?`} />
    </div>
  );
}
