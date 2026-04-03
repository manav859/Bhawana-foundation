import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Loader2, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { RichTextEditor } from '@/components/ui/RichTextEditor.jsx';
import { ImageUploader } from '@/components/ui/ImageUploader.jsx';
import { adminService } from '@/features/api/services/admin.service';

export function AdminProjectEditor() {
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
    category: '',
    location: '',
    beneficiaries: 0,
    status: 'draft',
    isFeatured: false,
    image: '' // We'll store a single image URL here and convert to images[] on submit
  });

  useEffect(() => {
    if (isEditMode) {
      loadProject();
    }
  }, [id]);

  const loadProject = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await adminService.get('projects', id);
      const data = res.data.data;
      
      setFormData({
        title: data.title || '',
        slug: data.slug || '',
        shortDescription: data.shortDescription || '',
        fullDescription: data.fullDescription || '',
        category: data.category || '',
        location: data.location || '',
        beneficiaries: data.beneficiaries || 0,
        status: data.status || 'draft',
        isFeatured: data.isFeatured || false,
        image: data.images && data.images.length > 0 ? data.images[0] : ''
      });
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load project data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value
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

      // Extract URL string from the image (could be object or string)
      const imageUrl = typeof formData.image === 'object' ? formData.image.url : formData.image;

      // Build payload: convert single image to images[] array for the backend schema
      const { image, ...rest } = formData;
      const payload = {
        ...rest,
        images: imageUrl ? [imageUrl] : [],
      };

      if (isEditMode) {
        await adminService.update('projects', id, payload);
      } else {
        await adminService.create('projects', payload);
      }

      navigate('/admin/projects');
    } catch (err) {
      const serverDetails = err.response?.data?.details;
      if (Array.isArray(serverDetails) && serverDetails.length > 0) {
        setError(`Validation Failed: ${serverDetails.map(d => `${d.field}: ${d.message}`).join(' | ')}`);
      } else {
        setError(err.response?.data?.message || err.message || `Failed to ${isEditMode ? 'update' : 'create'} project`);
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
        <button onClick={() => navigate('/admin/projects')} className="p-2 hover:bg-bg-light rounded-full transition-colors text-text-secondary">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="font-display text-2xl font-bold text-text-dark">
            {isEditMode ? 'Edit Project' : 'Create Project'}
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Fill in the details below to add a project into the public portfolio.
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
              <label className="text-sm font-medium text-text-dark">Project Title *</label>
              <Input 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                placeholder="E.g., Women Empowerment Drive" 
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
            <RichTextEditor
              label="Full Description"
              value={formData.fullDescription}
              onChange={(val) => setFormData(prev => ({ ...prev, fullDescription: val }))}
              placeholder="Detailed information about the project impact and activities..."
            />
          </div>
        </div>

        {/* Project Specifics */}
        <div className="bg-white p-6 rounded-xl border border-border-light shadow-sm space-y-6">
          <h2 className="font-display text-lg font-semibold text-text-dark border-b border-border-light pb-2">Details & Impact</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-dark">Category</label>
              <Input name="category" value={formData.category} onChange={handleChange} placeholder="E.g., Education" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-dark">Location</label>
              <Input name="location" value={formData.location} onChange={handleChange} placeholder="E.g., New Delhi" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-dark">Beneficiaries (Number)</label>
              <Input type="number" name="beneficiaries" value={formData.beneficiaries} onChange={handleChange} min={0} />
            </div>
          </div>
        </div>

        {/* Media — now uses ImageUploader with crop */}
        <div className="bg-white p-6 rounded-xl border border-border-light shadow-sm space-y-6">
          <h2 className="font-display text-lg font-semibold text-text-dark border-b border-border-light pb-2">Primary Image</h2>
          <ImageUploader
            value={formData.image}
            onChange={(img) => setFormData(prev => ({ ...prev, image: img ? (img.url || img) : '' }))}
            label="Project Image"
            accept="image/*"
          />
        </div>

        {/* Publishing */}
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
                <option value="published">Published (Visible)</option>
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
                Mark as Featured Theme/Project
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 pt-4">
          <Button type="button" variant="outline" onClick={() => navigate('/admin/projects')} disabled={isSaving}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSaving} className="flex items-center gap-2 px-8">
            {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
            <Save className="w-4 h-4" />
            {isEditMode ? 'Save Changes' : 'Create Project'}
          </Button>
        </div>

      </form>
    </div>
  );
}
