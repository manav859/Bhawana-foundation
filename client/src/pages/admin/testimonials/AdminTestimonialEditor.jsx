import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { FormInput } from '@/components/ui/FormInput.jsx';
import { Button } from '@/components/ui/Button.jsx';
import { adminService } from '@/features/api/services/admin.service.js';

export function AdminTestimonialEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ name: '', role: '', quote: '', isFeatured: false });

  useEffect(() => { if (isEdit) load(); }, [id]);
  const load = async () => {
    try { setLoading(true); const res = await adminService.get('testimonials', id); const d = res.data.data;
      setForm({ name: d.name || '', role: d.role || '', quote: d.quote || '', isFeatured: d.isFeatured || false });
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };
  const handleChange = (e) => { const { name, value, type, checked } = e.target; setForm(p => ({ ...p, [name]: type === 'checkbox' ? checked : value })); };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.quote) return alert('Name and quote are required');
    try { setSaving(true);
      if (isEdit) await adminService.update('testimonials', id, form);
      else await adminService.create('testimonials', form);
      navigate('/admin/testimonials');
    } catch (err) { setError(err.message); } finally { setSaving(false); }
  };

  if (loading) return <div className="flex justify-center items-center h-64"><Loader2 className="w-8 h-8 animate-spin text-primary-blue" /></div>;

  return (
    <div className="max-w-2xl space-y-6 pb-20 animate-in">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/admin/testimonials')} className="p-2 hover:bg-bg-light rounded-full transition-colors text-text-secondary"><ArrowLeft className="w-5 h-5" /></button>
        <h1 className="font-display text-2xl font-bold text-text-dark">{isEdit ? 'Edit Testimonial' : 'Add Testimonial'}</h1>
      </div>
      {error && <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-xl border border-border-light shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput label="Name" name="name" value={form.name} onChange={handleChange} required />
            <FormInput label="Role / Title" name="role" value={form.role} onChange={handleChange} placeholder="E.g., Beneficiary" />
          </div>
          <FormInput label="Quote" name="quote" value={form.quote} onChange={handleChange} type="textarea" required />
          <div className="flex items-center space-x-3">
            <input type="checkbox" id="isFeatured" name="isFeatured" checked={form.isFeatured} onChange={handleChange} className="w-5 h-5 rounded border-gray-300 text-primary-blue focus:ring-primary-blue" />
            <label htmlFor="isFeatured" className="text-sm font-medium text-text-dark cursor-pointer">Featured</label>
          </div>
        </div>
        <div className="flex items-center justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => navigate('/admin/testimonials')} disabled={saving}>Cancel</Button>
          <Button type="submit" disabled={saving} className="flex items-center gap-2 px-8">{saving && <Loader2 className="w-4 h-4 animate-spin" />}<Save className="w-4 h-4" /> {isEdit ? 'Save' : 'Create'}</Button>
        </div>
      </form>
    </div>
  );
}
