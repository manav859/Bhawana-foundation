import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Search, Download, Eye, Loader2 } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader.jsx';
import { TableShell } from '@/components/admin/TableShell.jsx';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { adminShopService } from '@/features/api/services/admin-shop.service.js';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800', paid: 'bg-blue-100 text-blue-800',
  processing: 'bg-indigo-100 text-indigo-800', shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800', cancelled: 'bg-red-100 text-red-800',
};

export function AdminShopOrdersList() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const params = { limit: 50 };
      if (searchTerm) params.search = searchTerm;
      if (statusFilter) params.status = statusFilter;
      const res = await adminShopService.listOrders(params);
      setOrders(res.data.data || []);
    } catch { } finally { setLoading(false); }
  };

  useEffect(() => { const t = setTimeout(fetchOrders, 300); return () => clearTimeout(t); }, [searchTerm, statusFilter]);

  const handleExport = async () => {
    try {
      const res = await adminShopService.exportOrdersCsv({ status: statusFilter });
      const url = URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement('a'); a.href = url; a.download = `orders-${Date.now()}.csv`; a.click();
      URL.revokeObjectURL(url);
    } catch { alert('Export failed'); }
  };

  return (
    <div className="space-y-6 animate-in">
      <AdminPageHeader
        title="Shop Orders"
        description="View and manage all marketplace orders."
        action={<Button onClick={handleExport} variant="outline" className="flex items-center gap-2"><Download className="w-4 h-4" /> Export CSV</Button>}
      />

      <div className="flex flex-col sm:flex-row gap-4 items-center pb-2">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <Input placeholder="Search by order # or name..." className="pl-9" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2.5 rounded-lg border border-border-light text-sm bg-white">
          <option value="">All Statuses</option>
          {Object.keys(statusColors).map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
      </div>

      <TableShell headings={['Order #', 'Customer', 'Items', 'Total', 'Status', 'Date', '']}>
        {loading ? (
          <tr><td colSpan={7} className="p-8 text-center"><Loader2 className="w-5 h-5 animate-spin mx-auto text-primary-blue" /></td></tr>
        ) : orders.length === 0 ? (
          <tr><td colSpan={7} className="p-12 text-center text-text-secondary">No orders found.</td></tr>
        ) : orders.map((o) => (
          <tr key={o._id} className="border-b border-border-light hover:bg-bg-light/50 transition-colors">
            <td className="px-6 py-4 font-mono font-semibold text-primary-blue text-[14px]">{o.orderNumber}</td>
            <td className="px-6 py-4 text-[14px]">{o.buyer?.name || o.shippingAddress?.name || 'N/A'}</td>
            <td className="px-6 py-4 text-[14px] text-text-secondary">{o.items?.length || 0}</td>
            <td className="px-6 py-4 text-[14px] font-semibold">₹{o.total?.toLocaleString()}</td>
            <td className="px-6 py-4">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${statusColors[o.status] || 'bg-gray-100'}`}>{o.status}</span>
            </td>
            <td className="px-6 py-4 text-[14px] text-text-muted">{new Date(o.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</td>
            <td className="px-6 py-4">
              <button onClick={() => navigate(`/admin/shop/orders/${o._id}`)} className="text-text-secondary hover:text-primary-blue transition-colors"><Eye className="w-4 h-4" /></button>
            </td>
          </tr>
        ))}
      </TableShell>
    </div>
  );
}
