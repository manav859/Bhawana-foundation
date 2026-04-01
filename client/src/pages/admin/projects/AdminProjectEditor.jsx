import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Upload, X, Loader2, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { adminService } from '@/features/api/services/admin.service';
import { uploadService } from '@/features/api/services/upload.service';

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
    images: [] // Storing as array to map to Mongoose schema
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

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
        images: data.images || []
      });
      setImagePreview(data.images && data.images.length > 0 ? data.images[0] : '');
    } catch (err) {
      setError(err.message || 'Failed to load project data');
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
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
    setFormData(prev => ({ ...prev, images: [] }));
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
      
      let finalImagesArr = [...formData.images];

      // Handle custom file upload if there's a new file
      if (imageFile) {
        const uploadData = new FormData();
        uploadData.append('file', imageFile);
        const uploadRes = await uploadService.upload(uploadData);
        finalImagesArr = [uploadRes.data.url]; // For simplicity in Phase 5, we keep one primary image in the array
      }

      const payload = { ...formData, images: finalImagesArr };

      if (isEditMode) {
        await adminService.update('projects', id, payload);
      } else {
        await adminService.create('projects', payload);
      }

      navigate('/admin/projects');
    } catch (err) {
      setError(err.message || `Failed to ${isEditMode ? 'update' : 'create'} project`);
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
            <label className="text-sm font-medium text-text-dark">Full Description</label>
            <textarea
              name="fullDescription"
              value={formData.fullDescription}
              onChange={handleChange}
              rows={8}
              className="w-full px-4 py-3 rounded-lg border border-border-light bg-bg-light focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue/20 transition-all font-sans text-[15px] resize-y"
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
              <Input 
                name="category" 
                value={formData.category} 
                onChange={handleChange} 
                placeholder="E.g., Education"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-dark">Location</label>
              <Input 
                name="location" 
                value={formData.location} 
                onChange={handleChange} 
                placeholder="E.g., New Delhi"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-dark">Beneficiaries (Number)</label>
              <Input 
                type="number"
                name="beneficiaries" 
                value={formData.beneficiaries} 
                onChange={handleChange} 
                min={0}
              />
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="bg-white p-6 rounded-xl border border-border-light shadow-sm space-y-6">
          <h2 className="font-display text-lg font-semibold text-text-dark border-b border-border-light pb-2">Primary Image</h2>
          
          <div className="space-y-2">
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
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate('/admin/projects')}
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
            {isEditMode ? 'Save Changes' : 'Create Project'}
          </Button>
        </div>

      </form>
    </div>
  );
}
