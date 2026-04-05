import { useState, useRef } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { uploadService } from '@/features/api/services/upload.service.js';
import { ImageCropModal } from './ImageCropModal.jsx';

export function ImageUploader({
  value,
  onChange,
  label = 'Upload Image',
  accept = 'image/*,video/*,.heic,.heif',
  className = '',
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [cropSrc, setCropSrc] = useState(null);
  const [pendingFileName, setPendingFileName] = useState('');
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate size (500MB)
    if (file.size > 500 * 1024 * 1024) {
      setError('File size should not exceed 500MB');
      return;
    }

    setError('');

    // If it's a video or HEIC/HEIF, skip crop and upload directly
    // Browser <img> tags cannot render HEIC natively on non-Safari environments.
    const isHeic = file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif');
    if (file.type.startsWith('video/') || isHeic) {
      uploadFile(file);
      return;
    }

    // For images, show the crop modal
    const reader = new FileReader();
    reader.onload = () => {
      setCropSrc(reader.result);
      setPendingFileName(file.name);
    };
    reader.readAsDataURL(file);

    // Reset file input so the same file can be re-selected
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleCropComplete = async (croppedBlob) => {
    setCropSrc(null);
    const file = new File([croppedBlob], pendingFileName || 'cropped.jpg', { type: 'image/jpeg' });
    await uploadFile(file);
  };

  const handleCropCancel = () => {
    setCropSrc(null);
    setPendingFileName('');
  };

  const uploadFile = async (file) => {
    try {
      setUploading(true);
      setError('');

      const formData = new FormData();
      formData.append('file', file);

      const res = await uploadService.upload(formData);
      const data = res.data.data;

      onChange?.({
        url: data.url,
        publicId: data.publicId,
        originalName: data.originalName,
        resourceType: data.resourceType,
      });
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Upload failed');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const handleRemove = () => {
    onChange?.(null);
    setError('');
  };

  const currentUrl = typeof value === 'string' ? value : value?.url;
  const isVideo = currentUrl?.match(/\.(mp4|webm|mov|mkv)/i) || value?.resourceType === 'video';

  // Make sure admin preview leverages ImageKit's auto-format engine perfectly
  const getPreviewUrl = () => {
    if (!currentUrl || !currentUrl.includes('ik.imagekit.io')) return currentUrl;
    const separator = currentUrl.includes('?') ? '&' : '?';
    return isVideo ? `${currentUrl}${separator}tr=f-mp4` : `${currentUrl}${separator}tr=f-auto`;
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && <label className="block text-sm font-medium text-text-dark">{label}</label>}

      {currentUrl ? (
        <div className="relative w-full h-[240px] rounded-lg overflow-hidden border border-border-light group bg-gray-50">
          {isVideo ? (
            <video src={getPreviewUrl()} className="w-full h-full object-contain" controls />
          ) : (
            <img src={getPreviewUrl()} alt="Preview" className="w-full h-full object-contain" />
          )}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              type="button"
              onClick={handleRemove}
              className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-md"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-[240px] border-2 border-dashed border-border-light rounded-lg cursor-pointer bg-bg-light hover:bg-gray-50 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploading ? (
              <Loader2 className="w-8 h-8 text-primary-blue mb-3 animate-spin" />
            ) : (
              <Upload className="w-8 h-8 text-brand-secondary mb-3" />
            )}
            <p className="mb-2 text-sm text-text-secondary">
              <span className="font-semibold text-primary-blue">
                {uploading ? 'Uploading...' : 'Click to upload'}
              </span>
              {!uploading && ' or drag and drop'}
            </p>
            <p className="text-xs text-text-secondary">PNG, JPG, WEBP, HEIC, MP4, MOV (Max: 500MB)</p>
          </div>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept={accept}
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
      )}

      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

      {/* Crop Modal */}
      {cropSrc && (
        <ImageCropModal
          imageSrc={cropSrc}
          onCancel={handleCropCancel}
          onCropComplete={handleCropComplete}
        />
      )}
    </div>
  );
}
