import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Loader2, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ImageUploader } from '@/components/ui/ImageUploader.jsx';
import { adminService } from '@/features/api/services/admin.service';

export function AdminEventEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [isLoading, setIsLoading] = useState(isEditMode);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    shortDescription: '',
    fullDescription: '',
    date: '',
    time: '',
    location: '',
    category: '',
    status: 'draft',
    isFeatured: false,
    image: ''
  });

  useEffect(() => {
    if (isEditMode) {
      loadEvent();
    }
  }, [id]);

  const loadEvent = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await adminService.get('events', id);
      const data = res.data.data;
      
      setFormData({
        title: data.title || '',
        slug: data.slug || '',
        shortDescription: data.shortDescription || '',
        fullDescription: data.fullDescription || '',
        date: data.date ? new Date(data.date).toISOString().split('T')[0] : '',
        time: data.time || '',
        location: data.location || '',
        category: data.category || '',
        status: data.status || 'draft',
        isFeatured: data.isFeatured || false,
        image: data.image || ''
      });
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load event data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title) {
      alert('Title is required');
      return;
    }

    try {
      setIsSaving(true);
      setError(null);

      const imageUrl = typeof formData.image === 'object' ? formData.image.url : formData.image;
      const payload = { ...formData, image: imageUrl };

      if (isEditMode) {
        await adminService.update('events', id, payload);
      } else {
        await adminService.create('events', payload);
      }

      navigate('/admin/events');
    } catch (err) {
      const serverDetails = err.response?.data?.details;
      if (Array.isArray(serverDetails) && serverDetails.length > 0) {
        setError(`Validation Failed: ${serverDetails.map(d => `${d.field}: ${d.message}`).join(' | ')}`);
      } else {
        setError(err.response?.data?.message || err.message || `Failed to ${isEditMode ? 'update' : 'create'} event`);
      }
      window.scrollTo(0, 0);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 text-brand-secondary">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6 pb-20 animate-in">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/admin/events')} className="p-2 hover:bg-bg-light rounded-full transition-colors text-text-secondary">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="font-display text-2xl font-bold text-text-dark">
            {isEditMode ? 'Edit Event' : 'Create Event'}
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Fill in the details below to publish an event on the public portal.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Core Info */}
        <div className="bg-white p-6 rounded-xl border border-border-light shadow-sm space-y-6">
          <h2 className="font-display text-lg font-semibold text-text-dark border-b border-border-light pb-2">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-dark">Event Title *</label>
              <Input 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                placeholder="E.g., Annual Charity Gala" 
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-dark">URL Slug</label>
              <Input 
                name="slug" 
                value={formData.slug} 
                onChange={handleChange} 
                placeholder="Leave blank to auto-generate" 
              />
              <p className="text-xs text-text-secondary">Will be derived from title if empty.</p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-dark">Short Description</label>
            <Input 
              name="shortDescription" 
              value={formData.shortDescription} 
              onChange={handleChange} 
              maxLength={300}
              placeholder="Brief summary for list views..." 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-dark">Full Description</label>
            <textarea
              name="fullDescription"
              value={formData.fullDescription}
              onChange={handleChange}
              rows={8}
              className="w-full px-4 py-3 rounded-lg border border-border-light bg-bg-light focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue/20 transition-all font-sans text-[15px] resize-y"
              placeholder="Detailed information about the event..."
            />
          </div>
        </div>

        {/* Schedule & Logistics */}
        <div className="bg-white p-6 rounded-xl border border-border-light shadow-sm space-y-6">
          <h2 className="font-display text-lg font-semibold text-text-dark border-b border-border-light pb-2">Logistics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-dark">Date</label>
              <Input type="date" name="date" value={formData.date} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-dark">Time</label>
              <Input name="time" value={formData.time} onChange={handleChange} placeholder="E.g., 06:00 PM - 10:00 PM" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-dark">Category</label>
              <Input name="category" value={formData.category} onChange={handleChange} placeholder="E.g., Fundraiser" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-dark">Location</label>
            <Input name="location" value={formData.location} onChange={handleChange} placeholder="E.g., Grand Palace Hotel, Jaipur" />
          </div>
        </div>

        {/* Media — now uses ImageUploader with crop */}
        <div className="bg-white p-6 rounded-xl border border-border-light shadow-sm space-y-6">
          <h2 className="font-display text-lg font-semibold text-text-dark border-b border-border-light pb-2">Media & Banner</h2>
          <ImageUploader
            value={formData.image}
            onChange={(img) => setFormData(prev => ({ ...prev, image: img ? (img.url || img) : '' }))}
            label="Hero Image"
            accept="image/*"
          />
        </div>

        {/* Publishing & Settings */}
        <div className="bg-white p-6 rounded-xl border border-border-light shadow-sm space-y-6">
          <h2 className="font-display text-lg font-semibold text-text-dark border-b border-border-light pb-2">Publishing</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-dark">Status</label>
              <select 
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-border-light bg-bg-light focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue/20 transition-all font-sans text-[15px]"
              >
                <option value="draft">Draft (Hidden)</option>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-3 pt-8">
              <input
                type="checkbox"
                id="isFeatured"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="w-5 h-5 rounded border-gray-300 text-primary-blue focus:ring-primary-blue"
              />
              <label htmlFor="isFeatured" className="text-sm font-medium text-text-dark cursor-pointer">
                Mark as Featured Event
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 pt-4">
          <Button type="button" variant="outline" onClick={() => navigate('/admin/events')} disabled={isSaving}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSaving} className="flex items-center gap-2 px-8">
            {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
            <Save className="w-4 h-4" />
            {isEditMode ? 'Save Changes' : 'Create Event'}
          </Button>
        </div>

      </form>
    </div>
  );
}
