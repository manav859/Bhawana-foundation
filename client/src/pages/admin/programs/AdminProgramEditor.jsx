import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Loader2, AlertCircle } from 'lucide-react';
import { FormInput } from '@/components/ui/FormInput.jsx';
import { FormSelect } from '@/components/ui/FormSelect.jsx';
import { RichTextEditor } from '@/components/ui/RichTextEditor.jsx';
import { ImageUploader } from '@/components/ui/ImageUploader.jsx';
import { Button } from '@/components/ui/Button.jsx';
import { adminService } from '@/features/api/services/admin.service.js';

export function AdminProgramEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    title: '', slug: '', shortDescription: '', fullDescription: '',
    category: '', image: '', status: 'draft', isFeatured: false,
  });

  useEffect(() => { if (isEdit) loadProgram(); }, [id]);

  const loadProgram = async () => {
    try {
      setLoading(true);
      const res = await adminService.get('programs', id);
      const d = res.data.data;
      setForm({ title: d.title || '', slug: d.slug || '', shortDescription: d.shortDescription || '', fullDescription: d.fullDescription || '', category: d.category || '', image: d.image || '', status: d.status || 'draft', isFeatured: d.isFeatured || false });
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title) return alert('Title is required');
    try {
      setSaving(true); setError(null);
      const payload = { ...form, image: typeof form.image === 'object' ? form.image.url : form.image };
      if (isEdit) await adminService.update('programs', id, payload);
      else await adminService.create('programs', payload);
      navigate('/admin/programs');
    } catch (err) { setError(err.message); window.scrollTo(0, 0); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="flex justify-center items-center h-64"><Loader2 className="w-8 h-8 animate-spin text-primary-blue" /></div>;

  return (
    <div className="max-w-4xl space-y-6 pb-20 animate-in">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/admin/programs')} className="p-2 hover:bg-bg-light rounded-full transition-colors text-text-secondary"><ArrowLeft className="w-5 h-5" /></button>
        <div>
          <h1 className="font-display text-2xl font-bold text-text-dark">{isEdit ? 'Edit Program' : 'Create Program'}</h1>
          <p className="text-sm text-text-secondary mt-1">Fill in the details below.</p>
        </div>
      </div>

      {error && <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm flex items-center gap-2"><AlertCircle className="w-5 h-5 shrink-0" /><p>{error}</p></div>}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-6 rounded-xl border border-border-light shadow-sm space-y-6">
          <h2 className="font-display text-lg font-semibold text-text-dark border-b border-border-light pb-2">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput label="Title" name="title" value={form.title} onChange={handleChange} required placeholder="E.g., Education for All" />
            <FormInput label="URL Slug" name="slug" value={form.slug} onChange={handleChange} placeholder="Leave blank to auto-generate" />
          </div>
          <FormInput label="Short Description" name="shortDescription" value={form.shortDescription} onChange={handleChange} type="textarea" placeholder="Brief summary..." />
          <RichTextEditor label="Full Description" value={form.fullDescription} onChange={(val) => setForm((p) => ({ ...p, fullDescription: val }))} />
        </div>

        <div className="bg-white p-6 rounded-xl border border-border-light shadow-sm space-y-6">
          <h2 className="font-display text-lg font-semibold text-text-dark border-b border-border-light pb-2">Details</h2>
          <FormInput label="Category" name="category" value={form.category} onChange={handleChange} placeholder="E.g., Education" />
        </div>

        <div className="bg-white p-6 rounded-xl border border-border-light shadow-sm space-y-6">
          <h2 className="font-display text-lg font-semibold text-text-dark border-b border-border-light pb-2">Image</h2>
          <ImageUploader value={form.image} onChange={(img) => setForm((p) => ({ ...p, image: img ? (img.url || img) : '' }))} accept="image/*" />
        </div>

        <div className="bg-white p-6 rounded-xl border border-border-light shadow-sm space-y-6">
          <h2 className="font-display text-lg font-semibold text-text-dark border-b border-border-light pb-2">Publishing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormSelect label="Status" name="status" value={form.status} onChange={handleChange} options={[{ value: 'draft', label: 'Draft (Hidden)' }, { value: 'published', label: 'Published (Visible)' }]} />
            <div className="flex items-center space-x-3 pt-8">
              <input type="checkbox" id="isFeatured" name="isFeatured" checked={form.isFeatured} onChange={handleChange} className="w-5 h-5 rounded border-gray-300 text-primary-blue focus:ring-primary-blue" />
              <label htmlFor="isFeatured" className="text-sm font-medium text-text-dark cursor-pointer">Mark as Featured</label>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 pt-4">
          <Button type="button" variant="outline" onClick={() => navigate('/admin/programs')} disabled={saving}>Cancel</Button>
          <Button type="submit" disabled={saving} className="flex items-center gap-2 px-8">
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}<Save className="w-4 h-4" /> {isEdit ? 'Save Changes' : 'Create Program'}
          </Button>
        </div>
      </form>
    </div>
  );
}
