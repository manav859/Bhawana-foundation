import { v2 as cloudinary } from 'cloudinary';
import convert from 'heic-convert';
import { env } from '../../config/env.js';
import { catchAsync } from '../../utils/catch-async.js';
import { sendResponse } from '../../utils/send-response.js';
import { ApiError } from '../../utils/api-error.js';

// Ensure cloudinary is configured
cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

/**
 * POST /uploads
 * Upload a single file to Cloudinary from memory buffer.
 * Automatically converts HEIC/HEIF to JPEG.
 */
export const uploadFile = catchAsync(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, 'No file provided.');
  }

  // Handle HEIC/HEIF conversion
  const isHeic = req.file.mimetype === 'image/heic' || 
                 req.file.mimetype === 'image/heif' ||
                 req.file.originalname.toLowerCase().endsWith('.heic') ||
                 req.file.originalname.toLowerCase().endsWith('.heif');

  if (isHeic) {
    try {
      const outputBuffer = await convert({
        buffer: req.file.buffer,
        format: 'JPEG',
        quality: 0.9,
      });
      
      // Update file object with converted data
      req.file.buffer = Buffer.from(outputBuffer);
      req.file.mimetype = 'image/jpeg';
      req.file.originalname = req.file.originalname.replace(/\.(heic|heif)$/i, '.jpg');
      req.file.size = req.file.buffer.length;
    } catch (error) {
      console.error('HEIC conversion failed:', error);
      throw new ApiError(500, 'Failed to convert HEIC image.');
    }
  }

  // Determine resource type
  const isVideo = req.file.mimetype.startsWith('video/');
  const resourceType = isVideo ? 'video' : 'image';

  // Upload buffer to Cloudinary via stream
  const result = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'bhawna-foundation',
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      },
    );

    stream.end(req.file.buffer);
  });

  sendResponse(res, {
    statusCode: 201,
    data: {
      url: result.secure_url,
      publicId: result.public_id,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      width: result.width,
      height: result.height,
      resourceType: result.resource_type,
    },
    message: isHeic 
      ? 'HEIC image converted to JPEG and uploaded successfully.' 
      : 'File uploaded to Cloudinary successfully.',
  });
});

/**
 * DELETE /uploads
 * Delete a file from Cloudinary by public_id.
 */
export const deleteFile = catchAsync(async (req, res) => {
  const { publicId, resourceType } = req.body;

  if (!publicId) {
    throw new ApiError(400, 'publicId is required.');
  }

  await cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType || 'image',
  });

  sendResponse(res, {
    data: { deleted: true, publicId },
    message: 'File deleted from Cloudinary successfully.',
  });
});