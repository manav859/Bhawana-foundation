import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const serverRoot = path.resolve(__dirname, '..', '..');

dotenv.config({ path: path.join(serverRoot, '.env') });

function toNumber(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function toArray(value, fallback = []) {
  if (!value) {
    return fallback;
  }

  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: toNumber(process.env.PORT, 5000),
  MONGODB_URI: process.env.MONGODB_URI?.trim() || 'mongodb://127.0.0.1:27017',
  MONGODB_DB_NAME: process.env.MONGODB_DB_NAME || 'bhawna-foundation',
  CLIENT_URLS: toArray(process.env.CLIENT_URLS, ['http://localhost:5173']),
  JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
  ADMIN_AUTH_MODE: process.env.ADMIN_AUTH_MODE || 'mock',
  UPLOAD_DIR: path.resolve(serverRoot, process.env.UPLOAD_DIR || 'uploads'),
  MAX_FILE_SIZE_MB: toNumber(process.env.MAX_FILE_SIZE_MB, 10),
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME?.trim() || '',
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY?.trim() || '',
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET?.trim() || '',
  IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY?.trim() || '',
  IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY?.trim() || '',
  IMAGEKIT_URL_ENDPOINT: process.env.IMAGEKIT_URL_ENDPOINT?.trim() || '',
};

export const isProduction = env.NODE_ENV === 'production';