import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Edit2, Trash2, Plus, AlertCircle, Search, AlertTriangle } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader.jsx';
import { EmptyState } from '@/components/admin/EmptyState.jsx';
import { TableShell } from '@/components/admin/TableShell.jsx';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { adminShopService } from '@/features/api/services/admin-shop.service.js';

export function AdminShopProductsList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await adminShopService.listProducts({ search: searchTerm, limit: 50 });
      setProducts(res.data.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const t = setTimeout(fetchProducts, 300);
    return () => clearTimeout(t);
  }, [searchTerm]);

  const handleDelete = async (id) => {
    if (!confirm('Delete this product? This cannot be undone.')) return;
    try {
      setDeletingId(id);
      await adminShopService.deleteProduct(id);
      setProducts((p) => p.filter((x) => x._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6 animate-in">
      <AdminPageHeader
        title="Shop Products"
        description="Manage marketplace products — kids' artwork, crafts, and more."
        action={
          <Button onClick={() => navigate('/admin/shop/products/new')} className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Product
          </Button>
        }
      />

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pb-2">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <Input placeholder="Search products..." className="pl-9" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>

      <TableShell headings={['Product', 'Category', 'Price', 'Stock', 'Status', 'Actions']}>
        {loading && products.length === 0 ? (
          <tr><td colSpan={6} className="p-8 text-center text-text-secondary">
            <div className="flex justify-center items-center gap-2">
              <div className="w-5 h-5 border-2 border-primary-blue border-t-transparent rounded-full animate-spin" />
              Loading...
            </div>
          </td></tr>
        ) : error ? (
          <tr><td colSpan={6} className="p-8">
            <div className="flex flex-col items-center text-red-500 gap-2">
              <AlertCircle className="w-8 h-8" /><p>{error}</p>
              <Button variant="outline" onClick={fetchProducts}>Try Again</Button>
            </div>
          </td></tr>
        ) : products.length === 0 ? (
          <tr><td colSpan={6} className="p-0">
            <EmptyState icon={Package} title="No products yet" message="Add your first marketplace product." action={<Button onClick={() => navigate('/admin/shop/products/new')}>Add Product</Button>} />
          </td></tr>
        ) : products.map((p) => (
          <tr key={p._id} className="border-b border-border-light hover:bg-bg-light/50 transition-colors">
            <td className="px-6 py-4">
              <div className="flex items-center gap-3">
                {p.images?.[0] ? (
                  <img src={p.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover border border-border-light hidden sm:block" />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-gray-100 border border-border-light hidden sm:block" />
                )}
                <div>
                  <span className="font-medium text-text-dark text-[14px] line-clamp-1">{p.title}</span>
                  <span className="text-[12px] text-text-secondary block">{p.slug}</span>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 text-[14px] text-text-secondary">{p.category?.name || 'Uncategorized'}</td>
            <td className="px-6 py-4 text-[14px] font-semibold text-text-dark">₹{p.price?.toLocaleString()}</td>
            <td className="px-6 py-4">
              <span className={`inline-flex items-center gap-1 text-[14px] font-medium ${p.stock <= p.lowStockThreshold ? 'text-coral-red' : 'text-text-dark'}`}>
                {p.stock <= p.lowStockThreshold && <AlertTriangle className="w-3.5 h-3.5" />}
                {p.stock}
              </span>
            </td>
            <td className="px-6 py-4">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${p.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{p.status}</span>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-3">
                <button onClick={() => navigate(`/admin/shop/products/${p._id}/edit`)} className="text-text-secondary hover:text-primary-blue transition-colors"><Edit2 className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(p._id)} disabled={deletingId === p._id} className="text-text-secondary hover:text-red-500 transition-colors disabled:opacity-50"><Trash2 className="w-4 h-4" /></button>
              </div>
            </td>
          </tr>
        ))}
      </TableShell>
    </div>
  );
}
