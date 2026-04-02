import { useEffect, useState } from 'react';
import { DatabaseIcon, Trash2, Eye } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader.jsx';
import { EmptyState } from '@/components/admin/EmptyState.jsx';
import { TableShell } from '@/components/admin/TableShell.jsx';
import { StatusBadge } from '@/components/ui/StatusBadge.jsx';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog.jsx';
import { Modal } from '@/components/ui/Modal.jsx';
import { http } from '@/features/api/http.js';

export function AdminDonationsList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [viewItem, setViewItem] = useState(null);

  useEffect(() => { fetchItems(); }, []);
  const fetchItems = async () => { try { setLoading(true); const res = await http.get('/donations'); setItems(res.data.data || []); } catch {} finally { setLoading(false); } };
  const handleDelete = async () => { if (!deleteTarget) return; try { setDeleting(true); await http.delete(`/donations/${deleteTarget._id}`); setItems(p => p.filter(x => x._id !== deleteTarget._id)); setDeleteTarget(null); } catch (err) { alert(err.message); } finally { setDeleting(false); } };

  return (
    <div className="space-y-6 animate-in">
      <AdminPageHeader title="Donation Submissions" description="View donation intents and payment records." />
      <TableShell headings={['Donor', 'Amount', 'Payment', 'Date', 'Actions']}>
        {loading ? <tr><td colSpan={5} className="p-8 text-center">Loading...</td></tr>
        : items.length === 0 ? <tr><td colSpan={5} className="p-0"><EmptyState icon={DatabaseIcon} title="No donations" message="No donation records yet." /></td></tr>
        : items.map(item => (
          <tr key={item._id} className="border-b border-border-light hover:bg-bg-light/50 transition-colors">
            <td className="px-6 py-4 font-medium text-text-dark text-[14px]">{item.donorName || item.name || 'Anonymous'}</td>
            <td className="px-6 py-4 text-[14px] font-bold text-primary-blue">₹{(item.amount || 0).toLocaleString()}</td>
            <td className="px-6 py-4"><StatusBadge status={item.paymentStatus || 'pending'} /></td>
            <td className="px-6 py-4 text-[13px] text-text-secondary">{new Date(item.createdAt).toLocaleDateString()}</td>
            <td className="px-6 py-4"><div className="flex items-center gap-3">
              <button onClick={() => setViewItem(item)} className="text-brand-secondary hover:text-primary-blue"><Eye className="w-4 h-4" /></button>
              <button onClick={() => setDeleteTarget(item)} className="text-brand-secondary hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
            </div></td>
          </tr>
        ))}
      </TableShell>
      <Modal isOpen={Boolean(viewItem)} onClose={() => setViewItem(null)} title="Donation Detail" size="md">
        {viewItem && <div className="space-y-3 text-sm"><p><strong>Donor:</strong> {viewItem.donorName || 'Anonymous'}</p><p><strong>Email:</strong> {viewItem.email || 'N/A'}</p><p><strong>Amount:</strong> ₹{(viewItem.amount || 0).toLocaleString()}</p><p><strong>Status:</strong> {viewItem.paymentStatus}</p><p><strong>Message:</strong> {viewItem.message || 'N/A'}</p></div>}
      </Modal>
      <ConfirmDialog isOpen={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} loading={deleting} title="Delete Record" message="Delete this donation record?" />
    </div>
  );
}
