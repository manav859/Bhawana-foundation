import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { FormInput } from '@/components/ui/FormInput.jsx';
import { ImageUploader } from '@/components/ui/ImageUploader.jsx';
import { Button } from '@/components/ui/Button.jsx';
import { adminService } from '@/features/api/services/admin.service.js';

export function AdminGalleryEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ title: '', image: '', category: '', altText: '' });

  useEffect(() => { if (isEdit) load(); }, [id]);

  const load = async () => {
    try { setLoading(true); const res = await adminService.get('gallery', id); const d = res.data.data;
      setForm({ title: d.title || '', image: d.image || '', category: d.category || '', altText: d.altText || '' });
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageUrl = typeof form.image === 'object' ? form.image.url : form.image;
    if (!imageUrl) return alert('Image is required');
    try { setSaving(true);
      const payload = { ...form, image: imageUrl };
      if (isEdit) await adminService.update('gallery', id, payload);
      else await adminService.create('gallery', payload);
      navigate('/admin/gallery');
    } catch (err) { setError(err.message); } finally { setSaving(false); }
  };

  if (loading) return <div className="flex justify-center items-center h-64"><Loader2 className="w-8 h-8 animate-spin text-primary-blue" /></div>;

  return (
    <div className="max-w-2xl space-y-6 pb-20 animate-in">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/admin/gallery')} className="p-2 hover:bg-bg-light rounded-full transition-colors text-text-secondary"><ArrowLeft className="w-5 h-5" /></button>
        <h1 className="font-display text-2xl font-bold text-text-dark">{isEdit ? 'Edit Item' : 'Upload to Gallery'}</h1>
      </div>
      {error && <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-xl border border-border-light shadow-sm space-y-6">
          <ImageUploader value={form.image} onChange={(img) => setForm(p => ({ ...p, image: img ? (img.url || img) : '' }))} label="Image / Video" />
          <FormInput label="Title (optional)" name="title" value={form.title} onChange={handleChange} />
          <FormInput label="Category" name="category" value={form.category} onChange={handleChange} placeholder="E.g., Events, Projects" />
          <FormInput label="Alt Text" name="altText" value={form.altText} onChange={handleChange} placeholder="Describe the image for accessibility" />
        </div>
        <div className="flex items-center justify-end gap-4 pt-4">
          <Button type="button" variant="outline" onClick={() => navigate('/admin/gallery')} disabled={saving}>Cancel</Button>
          <Button type="submit" disabled={saving} className="flex items-center gap-2 px-8">{saving && <Loader2 className="w-4 h-4 animate-spin" />}<Save className="w-4 h-4" /> {isEdit ? 'Save' : 'Upload'}</Button>
        </div>
      </form>
    </div>
  );
}
