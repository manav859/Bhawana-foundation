import { v2 as cloudinary } from 'cloudinary';
import { env } from './env.js';

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

/**
 * Upload a file buffer or path to Cloudinary.
 * @param {string} filePath - Local file path
 * @param {object} options - Cloudinary upload options
 * @returns {Promise<object>} Cloudinary upload result
 */
export async function uploadToCloudinary(filePath, options = {}) {
  const defaults = {
    folder: 'bhawna-foundation',
    resource_type: 'auto',
  };
  return cloudinary.uploader.upload(filePath, { ...defaults, ...options });
}

/**
 * Delete a file from Cloudinary by public_id.
 * @param {string} publicId
 * @param {string} resourceType - 'image' | 'video' | 'raw'
 */
export async function deleteFromCloudinary(publicId, resourceType = 'image') {
  return cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
}

export { cloudinary };
