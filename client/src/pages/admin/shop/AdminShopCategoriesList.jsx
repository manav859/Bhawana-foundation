import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Loader2, FolderOpen, AlertCircle } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader.jsx';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal.jsx';
import { adminShopService } from '@/features/api/services/admin-shop.service.js';

export function AdminShopCategoriesList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', description: '', sortOrder: 0, isActive: true });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await adminShopService.listCategories();
      setCategories(res.data.data || []);
    } catch { } finally { setLoading(false); }
  };

  useEffect(() => { fetchCategories(); }, []);

  const openNew = () => { setEditing(null); setForm({ name: '', description: '', sortOrder: 0, isActive: true }); setError(''); setShowModal(true); };
  const openEdit = (cat) => { setEditing(cat); setForm({ name: cat.name, description: cat.description || '', sortOrder: cat.sortOrder || 0, isActive: cat.isActive !== false }); setError(''); setShowModal(true); };

  const handleSave = async () => {
    if (!form.name.trim()) { setError('Name is required'); return; }
    try {
      setSaving(true); setError('');
      if (editing) {
        await adminShopService.updateCategory(editing._id, form);
      } else {
        await adminShopService.createCategory(form);
      }
      setShowModal(false);
      fetchCategories();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save.');
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this category?')) return;
    try {
      await adminShopService.deleteCategory(id);
      setCategories((c) => c.filter((x) => x._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed. Category may have products assigned.');
    }
  };

  return (
    <div className="space-y-6 animate-in">
      <AdminPageHeader
        title="Shop Categories"
        description="Organize products into categories for easy browsing."
        action={<Button onClick={openNew} className="flex items-center gap-2"><Plus className="w-4 h-4" /> Add Category</Button>}
      />

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary-blue" /></div>
      ) : categories.length === 0 ? (
        <div className="text-center py-12">
          <FolderOpen className="w-16 h-16 text-gray-200 mx-auto mb-4" />
          <h3 className="font-semibold text-text-dark">No categories yet</h3>
          <p className="text-text-secondary text-sm mt-1">Create categories to organize your shop products.</p>
          <Button onClick={openNew} className="mt-4">Create First Category</Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <div key={cat._id} className="bg-white rounded-2xl border border-border-light p-5 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-text-dark">{cat.name}</h3>
                  <p className="text-sm text-text-muted mt-1 line-clamp-2">{cat.description || 'No description'}</p>
                  <div className="flex items-center gap-3 mt-3 text-xs">
                    <span className={`px-2 py-0.5 rounded-full font-medium ${cat.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                      {cat.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <span className="text-text-muted">Order: {cat.sortOrder}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => openEdit(cat)} className="p-2 text-text-secondary hover:text-primary-blue transition-colors"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(cat._id)} className="p-2 text-text-secondary hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <Modal title={editing ? 'Edit Category' : 'New Category'} onClose={() => setShowModal(false)}>
          <div className="space-y-4">
            {error && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-center gap-2"><AlertCircle className="w-4 h-4" />{error}</div>}
            <div className="space-y-1.5"><label className="text-sm font-medium">Name *</label><Input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} /></div>
            <div className="space-y-1.5"><label className="text-sm font-medium">Description</label><Input value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5"><label className="text-sm font-medium">Sort Order</label><Input type="number" value={form.sortOrder} onChange={(e) => setForm((p) => ({ ...p, sortOrder: Number(e.target.value) }))} /></div>
              <div className="flex items-end pb-1"><label className="flex items-center gap-2 cursor-pointer text-sm"><input type="checkbox" checked={form.isActive} onChange={(e) => setForm((p) => ({ ...p, isActive: e.target.checked }))} className="w-4 h-4 rounded" /> Active</label></div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button onClick={handleSave} disabled={saving} className="flex items-center gap-2">
                {saving && <Loader2 className="w-4 h-4 animate-spin" />} {editing ? 'Update' : 'Create'}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
