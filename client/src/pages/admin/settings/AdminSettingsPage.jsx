import { useState, useEffect } from 'react';
import { Save, Loader2, AlertCircle } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader.jsx';
import { FormInput } from '@/components/ui/FormInput.jsx';
import { ImageUploader } from '@/components/ui/ImageUploader.jsx';
import { Button } from '@/components/ui/Button.jsx';
import { http } from '@/features/api/http.js';

export function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({
    siteName: '', logo: '', contactEmail: '', phone: '', address: '', footerText: '',
    socialLinks: { facebook: '', twitter: '', instagram: '', youtube: '', linkedin: '' },
  });

  useEffect(() => { load(); }, []);

  const load = async () => {
    try { setLoading(true); const res = await http.get('/settings'); const d = res.data.data;
      setForm({ siteName: d.siteName || '', logo: d.logo || '', contactEmail: d.contactEmail || '', phone: d.phone || '', address: d.address || '', footerText: d.footerText || '',
        socialLinks: { facebook: d.socialLinks?.facebook || '', twitter: d.socialLinks?.twitter || '', instagram: d.socialLinks?.instagram || '', youtube: d.socialLinks?.youtube || '', linkedin: d.socialLinks?.linkedin || '' } });
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleSocialChange = (e) => setForm(p => ({ ...p, socialLinks: { ...p.socialLinks, [e.target.name]: e.target.value } }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { setSaving(true); setError(null); setSuccess('');
      const payload = { ...form, logo: typeof form.logo === 'object' ? form.logo.url : form.logo };
      await http.patch('/settings', payload);
      setSuccess('Settings saved successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) { setError(err.message); } finally { setSaving(false); }
  };

  if (loading) return <div className="flex justify-center items-center h-64"><Loader2 className="w-8 h-8 animate-spin text-primary-blue" /></div>;

  return (
    <div className="max-w-4xl space-y-6 pb-20 animate-in">
      <AdminPageHeader title="Website Settings" description="Manage your organization profile, contact info, and social links." />
      {error && <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm flex items-center gap-2"><AlertCircle className="w-5 h-5" />{error}</div>}
      {success && <div className="p-4 bg-green-50 text-green-700 border border-green-200 rounded-lg text-sm">{success}</div>}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-6 rounded-xl border border-border-light shadow-sm space-y-6">
          <h2 className="font-display text-lg font-semibold text-text-dark border-b border-border-light pb-2">Organization</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput label="Site Name" name="siteName" value={form.siteName} onChange={handleChange} />
            <FormInput label="Contact Email" name="contactEmail" value={form.contactEmail} onChange={handleChange} type="email" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput label="Phone" name="phone" value={form.phone} onChange={handleChange} />
            <FormInput label="Address" name="address" value={form.address} onChange={handleChange} />
          </div>
          <FormInput label="Footer Text" name="footerText" value={form.footerText} onChange={handleChange} type="textarea" />
          <ImageUploader value={form.logo} onChange={(img) => setForm(p => ({ ...p, logo: img ? (img.url || img) : '' }))} label="Logo" accept="image/*" />
        </div>
        <div className="bg-white p-6 rounded-xl border border-border-light shadow-sm space-y-6">
          <h2 className="font-display text-lg font-semibold text-text-dark border-b border-border-light pb-2">Social Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput label="Facebook" name="facebook" value={form.socialLinks.facebook} onChange={handleSocialChange} placeholder="https://facebook.com/..." />
            <FormInput label="Twitter / X" name="twitter" value={form.socialLinks.twitter} onChange={handleSocialChange} placeholder="https://x.com/..." />
            <FormInput label="Instagram" name="instagram" value={form.socialLinks.instagram} onChange={handleSocialChange} placeholder="https://instagram.com/..." />
            <FormInput label="YouTube" name="youtube" value={form.socialLinks.youtube} onChange={handleSocialChange} placeholder="https://youtube.com/..." />
            <FormInput label="LinkedIn" name="linkedin" value={form.socialLinks.linkedin} onChange={handleSocialChange} placeholder="https://linkedin.com/..." />
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={saving} className="flex items-center gap-2 px-8">{saving && <Loader2 className="w-4 h-4 animate-spin" />}<Save className="w-4 h-4" /> Save Settings</Button>
        </div>
      </form>
    </div>
  );
}
