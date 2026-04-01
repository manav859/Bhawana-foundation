import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Upload, X, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { adminService } from '@/features/api/services/admin.service';
import { uploadService } from '@/features/api/services/upload.service';

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

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

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
        // Make sure date is formatted correctly for date input type
        date: data.date ? new Date(data.date).toISOString().split('T')[0] : '',
        time: data.time || '',
        location: data.location || '',
        category: data.category || '',
        status: data.status || 'draft',
        isFeatured: data.isFeatured || false,
        image: data.image || ''
      });
      setImagePreview(data.image || '');
    } catch (err) {
      setError(err.message || 'Failed to load event data');
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Quick validation
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('File size should not exceed 5MB');
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
    setFormData(prev => ({ ...prev, image: '' }));
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
      
      let finalImageUrl = formData.image;

      // Handle file upload if there's a new file
      if (imageFile) {
        const uploadData = new FormData();
        uploadData.append('file', imageFile);
        const uploadRes = await uploadService.upload(uploadData);
        finalImageUrl = uploadRes.data.url;
      }

      const payload = { ...formData, image: finalImageUrl };

      if (isEditMode) {
        await adminService.update('events', id, payload);
      } else {
        await adminService.create('events', payload);
      }

      navigate('/admin/events');
    } catch (err) {
      setError(err.message || `Failed to ${isEditMode ? 'update' : 'create'} event`);
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
              <Input 
                type="date"
                name="date" 
                value={formData.date} 
                onChange={handleChange} 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-dark">Time</label>
              <Input 
                name="time" 
                value={formData.time} 
                onChange={handleChange} 
                placeholder="E.g., 06:00 PM - 10:00 PM"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-dark">Category</label>
              <Input 
                name="category" 
                value={formData.category} 
                onChange={handleChange} 
                placeholder="E.g., Fundraiser"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-dark">Location</label>
            <Input 
              name="location" 
              value={formData.location} 
              onChange={handleChange} 
              placeholder="E.g., Grand Palace Hotel, Jaipur"
            />
          </div>
        </div>

        {/* Media */}
        <div className="bg-white p-6 rounded-xl border border-border-light shadow-sm space-y-6">
          <h2 className="font-display text-lg font-semibold text-text-dark border-b border-border-light pb-2">Media & Banner</h2>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-dark">Hero Image</label>
            
            {imagePreview ? (
              <div className="relative w-full h-[240px] rounded-lg overflow-hidden border border-border-light group">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    type="button" 
                    onClick={removeImage}
                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-md"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-[240px] border-2 border-dashed border-border-light rounded-lg cursor-pointer bg-bg-light hover:bg-gray-50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 text-brand-secondary mb-3" />
                  <p className="mb-2 text-sm text-text-secondary"><span className="font-semibold text-primary-blue">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-text-secondary">PNG, JPG, WEBP (Max: 5MB)</p>
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
              </label>
            )}
          </div>
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
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate('/admin/events')}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSaving}
            className="flex items-center gap-2 px-8"
          >
            {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
            <Save className="w-4 h-4" />
            {isEditMode ? 'Save Changes' : 'Create Event'}
          </Button>
        </div>

      </form>
    </div>
  );
}
