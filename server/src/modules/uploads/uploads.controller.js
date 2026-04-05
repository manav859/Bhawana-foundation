import convert from 'heic-convert';
import { env } from '../../config/env.js';
import { catchAsync } from '../../utils/catch-async.js';
import { sendResponse } from '../../utils/send-response.js';
import { ApiError } from '../../utils/api-error.js';
import { imagekit } from '../../config/imagekit.js';

/**
 * POST /uploads
 * Upload a single file to ImageKit from memory buffer.
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

  // Determine folder
  const folder = '/bhawna-foundation';

  // Upload buffer to ImageKit
  const result = await imagekit.upload({
    file: req.file.buffer, // required, can be a base64 string, buffer, or absolute URL
    fileName: req.file.originalname, // required
    folder: folder,
  });

  const isVideo = req.file.mimetype.startsWith('video/');

  sendResponse(res, {
    statusCode: 201,
    data: {
      url: result.url,
      publicId: result.fileId,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      width: result.width,
      height: result.height,
      resourceType: isVideo ? 'video' : 'image',
    },
    message: isHeic 
      ? 'HEIC image converted to JPEG and uploaded successfully.' 
      : 'File uploaded successfully.',
  });
});

/**
 * DELETE /uploads
 * Delete a file from ImageKit by fileId (stored as publicId).
 */
export const deleteFile = catchAsync(async (req, res) => {
  const { publicId } = req.body;

  if (!publicId) {
    throw new ApiError(400, 'publicId is required.');
  }

  // ImageKit delete requires fileId, which we returned as publicId in the upload response
  await imagekit.deleteFile(publicId);

  sendResponse(res, {
    data: { deleted: true, publicId },
    message: 'File deleted successfully.',
  });
});