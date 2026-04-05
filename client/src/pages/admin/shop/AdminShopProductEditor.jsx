import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Loader2, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { RichTextEditor } from '@/components/ui/RichTextEditor.jsx';
import { ImageUploader } from '@/components/ui/ImageUploader.jsx';
import { adminShopService } from '@/features/api/services/admin-shop.service.js';

export function AdminShopProductEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [isLoading, setIsLoading] = useState(isEditMode);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    title: '', slug: '', shortDescription: '', description: '',
    price: '', compareAtPrice: '', stock: 0, lowStockThreshold: 5,
    category: '', sku: '', tags: '',
    isFeatured: false, isDonationOnly: false, impactMessage: '',
    status: 'draft', image: '',
    childStoryName: '', childStoryAge: '', childStoryStory: '', childStoryPhoto: '',
  });

  useEffect(() => {
    adminShopService.listCategories().then((r) => setCategories(r.data.data || [])).catch(() => {});
    if (isEditMode) loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setIsLoading(true);
      const res = await adminShopService.getProduct(id);
      const d = res.data.data;
      setFormData({
        title: d.title || '', slug: d.slug || '',
        shortDescription: d.shortDescription || '', description: d.description || '',
        price: d.price ?? '', compareAtPrice: d.compareAtPrice ?? '',
        stock: d.stock ?? 0, lowStockThreshold: d.lowStockThreshold ?? 5,
        category: d.category?._id || d.category || '', sku: d.sku || '',
        tags: (d.tags || []).join(', '),
        isFeatured: d.isFeatured || false, isDonationOnly: d.isDonationOnly || false,
        impactMessage: d.impactMessage || '', status: d.status || 'draft',
        image: d.images?.[0] || '',
        childStoryName: d.childStory?.name || '', childStoryAge: d.childStory?.age || '',
        childStoryStory: d.childStory?.story || '', childStoryPhoto: d.childStory?.photo || '',
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load product.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((p) => ({ ...p, [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || formData.price === '') { alert('Title and Price are required.'); return; }

    try {
      setIsSaving(true); setError(null);
      const imageUrl = typeof formData.image === 'object' ? formData.image.url : formData.image;

      const payload = {
        title: formData.title, slug: formData.slug,
        shortDescription: formData.shortDescription, description: formData.description,
        price: Number(formData.price), stock: Number(formData.stock),
        lowStockThreshold: Number(formData.lowStockThreshold),
        category: formData.category || null, sku: formData.sku,
        tags: formData.tags ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
        isFeatured: formData.isFeatured, isDonationOnly: formData.isDonationOnly,
        impactMessage: formData.impactMessage, status: formData.status,
        images: imageUrl ? [imageUrl] : [],
        childStory: {
          name: formData.childStoryName, age: formData.childStoryAge ? Number(formData.childStoryAge) : undefined,
          story: formData.childStoryStory, photo: formData.childStoryPhoto,
        },
      };
      if (formData.compareAtPrice) payload.compareAtPrice = Number(formData.compareAtPrice);

      if (isEditMode) {
        await adminShopService.updateProduct(id, payload);
      } else {
        await adminShopService.createProduct(payload);
      }
      navigate('/admin/shop/products');
    } catch (err) {
      setError(err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'create'} product.`);
      window.scrollTo(0, 0);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="flex justify-center items-center h-64"><Loader2 className="w-8 h-8 animate-spin text-primary-blue" /></div>;

  return (
    <div className="max-w-4xl space-y-6 pb-20 animate-in">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/admin/shop/products')} className="p-2 hover:bg-bg-light rounded-full transition-colors text-text-secondary"><ArrowLeft className="w-5 h-5" /></button>
        <div>
          <h1 className="font-display text-2xl font-bold text-text-dark">{isEditMode ? 'Edit Product' : 'Add Product'}</h1>
          <p className="text-sm text-text-secondary mt-1">Fill in product details for the marketplace.</p>
        </div>
      </div>

      {error && <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm flex items-center gap-2"><AlertCircle className="w-5 h-5 shrink-0" /><p>{error}</p></div>}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="bg-white p-6 rounded-xl border border-border-light shadow-sm space-y-6">
          <h2 className="font-display text-lg font-semibold text-text-dark border-b border-border-light pb-2">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2"><label className="text-sm font-medium text-text-dark">Title *</label><Input name="title" value={formData.title} onChange={handleChange} required /></div>
            <div className="space-y-2"><label className="text-sm font-medium text-text-dark">Slug</label><Input name="slug" value={formData.slug} onChange={handleChange} placeholder="Auto-generated" /></div>
          </div>
          <div className="space-y-2"><label className="text-sm font-medium text-text-dark">Short Description</label><Input name="shortDescription" value={formData.shortDescription} onChange={handleChange} maxLength={300} /></div>
          <div className="space-y-2"><RichTextEditor label="Full Description" value={formData.description} onChange={(val) => setFormData((p) => ({ ...p, description: val }))} /></div>
        </div>

        {/* Pricing & Inventory */}
        <div className="bg-white p-6 rounded-xl border border-border-light shadow-sm space-y-6">
          <h2 className="font-display text-lg font-semibold text-text-dark border-b border-border-light pb-2">Pricing & Inventory</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2"><label className="text-sm font-medium text-text-dark">Price (₹) *</label><Input type="number" name="price" value={formData.price} onChange={handleChange} min="0" required /></div>
            <div className="space-y-2"><label className="text-sm font-medium text-text-dark">Compare Price (₹)</label><Input type="number" name="compareAtPrice" value={formData.compareAtPrice} onChange={handleChange} min="0" placeholder="Original price" /></div>
            <div className="space-y-2"><label className="text-sm font-medium text-text-dark">SKU</label><Input name="sku" value={formData.sku} onChange={handleChange} /></div>
            <div className="space-y-2"><label className="text-sm font-medium text-text-dark">Stock</label><Input type="number" name="stock" value={formData.stock} onChange={handleChange} min="0" /></div>
            <div className="space-y-2"><label className="text-sm font-medium text-text-dark">Low Stock Alert At</label><Input type="number" name="lowStockThreshold" value={formData.lowStockThreshold} onChange={handleChange} min="0" /></div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-dark">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-border-light bg-bg-light focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue/20 transition-all text-[15px]">
                <option value="">Select Category</option>
                {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
            </div>
          </div>
          <div className="space-y-2"><label className="text-sm font-medium text-text-dark">Tags (comma-separated)</label><Input name="tags" value={formData.tags} onChange={handleChange} placeholder="painting, craft, handmade" /></div>
        </div>

        {/* Child Story */}
        <div className="bg-white p-6 rounded-xl border border-border-light shadow-sm space-y-6">
          <h2 className="font-display text-lg font-semibold text-text-dark border-b border-border-light pb-2">Child's Story ❤️</h2>
          <p className="text-sm text-text-muted">Share the story of the child behind this artwork. This adds emotional value.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2"><label className="text-sm font-medium text-text-dark">Child's Name</label><Input name="childStoryName" value={formData.childStoryName} onChange={handleChange} /></div>
            <div className="space-y-2"><label className="text-sm font-medium text-text-dark">Age</label><Input type="number" name="childStoryAge" value={formData.childStoryAge} onChange={handleChange} min="0" max="25" /></div>
            <div className="md:col-span-2 space-y-2"><label className="text-sm font-medium text-text-dark">Their Story</label><textarea name="childStoryStory" value={formData.childStoryStory} onChange={handleChange} rows={4} className="w-full px-4 py-3 rounded-lg border border-border-light bg-bg-light focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue/20 transition-all text-[15px]" /></div>
            <div className="space-y-2"><label className="text-sm font-medium text-text-dark">Child's Photo URL</label><Input name="childStoryPhoto" value={formData.childStoryPhoto} onChange={handleChange} placeholder="Upload via Uploads then paste URL" /></div>
          </div>
        </div>

        {/* Impact & Media */}
        <div className="bg-white p-6 rounded-xl border border-border-light shadow-sm space-y-6">
          <h2 className="font-display text-lg font-semibold text-text-dark border-b border-border-light pb-2">Impact & Media</h2>
          <div className="space-y-2"><label className="text-sm font-medium text-text-dark">Impact Message</label><Input name="impactMessage" value={formData.impactMessage} onChange={handleChange} placeholder="e.g. This purchase supports education for 3 days" /></div>
          <ImageUploader value={formData.image} onChange={(img) => setFormData((p) => ({ ...p, image: img ? (img.url || img) : '' }))} label="Product Image" accept="image/*" />
        </div>

        {/* Publishing */}
        <div className="bg-white p-6 rounded-xl border border-border-light shadow-sm space-y-6">
          <h2 className="font-display text-lg font-semibold text-text-dark border-b border-border-light pb-2">Publishing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-dark">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-border-light bg-bg-light focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue/20 transition-all text-[15px]">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div className="flex flex-col gap-4 pt-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="w-5 h-5 rounded border-gray-300 text-primary-blue" />
                <span className="text-sm font-medium text-text-dark">Featured Product</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" name="isDonationOnly" checked={formData.isDonationOnly} onChange={handleChange} className="w-5 h-5 rounded border-gray-300 text-primary-blue" />
                <span className="text-sm font-medium text-text-dark">Donation-Only (no stock tracking)</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 pt-4">
          <Button type="button" variant="outline" onClick={() => navigate('/admin/shop/products')} disabled={isSaving}>Cancel</Button>
          <Button type="submit" disabled={isSaving} className="flex items-center gap-2 px-8">
            {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}<Save className="w-4 h-4" />
            {isEditMode ? 'Save Changes' : 'Create Product'}
          </Button>
        </div>
      </form>
    </div>
  );
}
