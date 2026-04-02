import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Loader2, AlertCircle } from 'lucide-react';
import { FormInput } from '@/components/ui/FormInput.jsx';
import { FormSelect } from '@/components/ui/FormSelect.jsx';
import { RichTextEditor } from '@/components/ui/RichTextEditor.jsx';
import { ImageUploader } from '@/components/ui/ImageUploader.jsx';
import { Button } from '@/components/ui/Button.jsx';
import { adminService } from '@/features/api/services/admin.service.js';

export function AdminBlogEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ title: '', slug: '', excerpt: '', content: '', featuredImage: '', category: '', tags: '', author: '', status: 'draft', isFeatured: false });

  useEffect(() => { if (isEdit) loadPost(); }, [id]);

  const loadPost = async () => {
    try { setLoading(true); const res = await adminService.get('posts', id); const d = res.data.data;
      setForm({ title: d.title || '', slug: d.slug || '', excerpt: d.excerpt || '', content: d.content || '', featuredImage: d.featuredImage || '', category: d.category || '', tags: (d.tags || []).join(', '), author: d.author || '', status: d.status || 'draft', isFeatured: d.isFeatured || false });
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  const handleChange = (e) => { const { name, value, type, checked } = e.target; setForm(p => ({ ...p, [name]: type === 'checkbox' ? checked : value })); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title) return alert('Title is required');
    try { setSaving(true); setError(null);
      const payload = { ...form, featuredImage: typeof form.featuredImage === 'object' ? form.featuredImage.url : form.featuredImage, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) };
      if (isEdit) await adminService.update('posts', id, payload);
      else await adminService.create('posts', payload);
      navigate('/admin/blogs');
    } catch (err) { setError(err.message); window.scrollTo(0, 0); } finally { setSaving(false); }
  };

  if (loading) return <div className="flex justify-center items-center h-64"><Loader2 className="w-8 h-8 animate-spin text-primary-blue" /></div>;

  return (
    <div className="max-w-4xl space-y-6 pb-20 animate-in">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/admin/blogs')} className="p-2 hover:bg-bg-light rounded-full transition-colors text-text-secondary"><ArrowLeft className="w-5 h-5" /></button>
        <div><h1 className="font-display text-2xl font-bold text-text-dark">{isEdit ? 'Edit Post' : 'Create Post'}</h1></div>
      </div>
      {error && <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm flex items-center gap-2"><AlertCircle className="w-5 h-5 shrink-0" />{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-6 rounded-xl border border-border-light shadow-sm space-y-6">
          <h2 className="font-display text-lg font-semibold text-text-dark border-b border-border-light pb-2">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput label="Title" name="title" value={form.title} onChange={handleChange} required />
            <FormInput label="Slug" name="slug" value={form.slug} onChange={handleChange} placeholder="Auto-generated if empty" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormInput label="Category" name="category" value={form.category} onChange={handleChange} />
            <FormInput label="Author" name="author" value={form.author} onChange={handleChange} />
            <FormInput label="Tags (comma separated)" name="tags" value={form.tags} onChange={handleChange} />
          </div>
          <FormInput label="Excerpt" name="excerpt" value={form.excerpt} onChange={handleChange} type="textarea" placeholder="Brief post summary..." />
          <RichTextEditor label="Content" value={form.content} onChange={(val) => setForm(p => ({ ...p, content: val }))} />
        </div>
        <div className="bg-white p-6 rounded-xl border border-border-light shadow-sm space-y-6">
          <h2 className="font-display text-lg font-semibold text-text-dark border-b border-border-light pb-2">Featured Image</h2>
          <ImageUploader value={form.featuredImage} onChange={(img) => setForm(p => ({ ...p, featuredImage: img ? (img.url || img) : '' }))} accept="image/*" />
        </div>
        <div className="bg-white p-6 rounded-xl border border-border-light shadow-sm space-y-6">
          <h2 className="font-display text-lg font-semibold text-text-dark border-b border-border-light pb-2">Publishing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormSelect label="Status" name="status" value={form.status} onChange={handleChange} options={[{ value: 'draft', label: 'Draft' }, { value: 'published', label: 'Published' }]} />
            <div className="flex items-center space-x-3 pt-8">
              <input type="checkbox" id="isFeatured" name="isFeatured" checked={form.isFeatured} onChange={handleChange} className="w-5 h-5 rounded border-gray-300 text-primary-blue focus:ring-primary-blue" />
              <label htmlFor="isFeatured" className="text-sm font-medium text-text-dark cursor-pointer">Featured Post</label>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-4 pt-4">
          <Button type="button" variant="outline" onClick={() => navigate('/admin/blogs')} disabled={saving}>Cancel</Button>
          <Button type="submit" disabled={saving} className="flex items-center gap-2 px-8">{saving && <Loader2 className="w-4 h-4 animate-spin" />}<Save className="w-4 h-4" /> {isEdit ? 'Save' : 'Create'}</Button>
        </div>
      </form>
    </div>
  );
}
