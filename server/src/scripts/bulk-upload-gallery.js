import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import mongoose from 'mongoose';
import convert from 'heic-convert';
import { connectDatabase } from '../config/database.js';
import { imagekit } from '../config/imagekit.js';
import GalleryItem from '../models/GalleryItem.js';
import { env } from '../config/env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Bulk Upload Gallery Script
 * Usage: node src/scripts/bulk-upload-gallery.js --dir="C:\Photos" --category="Event Name"
 */

async function run() {
  const args = process.argv.slice(2);
  const dirArg = args.find(a => a.startsWith('--dir='));
  const categoryArg = args.find(a => a.startsWith('--category='));

  if (!dirArg) {
    console.error('Error: Please provide a directory path using --dir="PATH"');
    process.exit(1);
  }

  const sourceDir = dirArg.split('=')[1].replace(/"/g, '');
  const category = categoryArg ? categoryArg.split('=')[1].replace(/"/g, '') : ''; // Default to no category

  console.log(`\n🚀 Starting Bulk Upload to ImageKit...`);
  console.log(`📁 Source Directory: ${sourceDir}`);
  console.log(`🏷️ Category: ${category || 'None'}`);

  try {
    // 1. Connect to Database
    await connectDatabase();
    console.log('✅ Connected to MongoDB');

    // 2. Scan Directory for Images
    const files = await fs.readdir(sourceDir);
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.heic', '.webp'];
    const imageFiles = files.filter(file => 
      imageExtensions.includes(path.extname(file).toLowerCase())
    );

    if (imageFiles.length === 0) {
      console.log('❌ No image files found in the specified directory.');
      process.exit(0);
    }

    console.log(`📸 Found ${imageFiles.length} images to upload.`);

    // 3. Process Uploads (Concurrency Limit: 5)
    // Decreased concurrency slightly since memory buffers of 400 photos can get tight,
    // but 5 is usually safe for standard buffers.
    const CONCURRENCY = 5;
    let completed = 0;
    let failed = 0;

    for (let i = 0; i < imageFiles.length; i += CONCURRENCY) {
      const chunk = imageFiles.slice(i, i + CONCURRENCY);
      
      await Promise.all(chunk.map(async (fileName) => {
        const filePath = path.join(sourceDir, fileName);
        const ext = path.extname(fileName).toLowerCase();
        const baseName = path.basename(fileName, ext);

        try {
          let buffer;
          let finalFileName = fileName;

          // Convert HEIC if needed
          if (ext === '.heic') {
            const inputBuffer = await fs.readFile(filePath);
            const outputBuffer = await convert({
              buffer: inputBuffer,
              format: 'JPEG',
              quality: 0.9
            });
            buffer = Buffer.from(outputBuffer);
            finalFileName = `${baseName}.jpg`;
          } else {
             // Read directly to buffer for ImageKit
             buffer = await fs.readFile(filePath);
          }

          // Upload to ImageKit
          const uploadOptions = {
            file: buffer,
            fileName: finalFileName,
            folder: '/bhawna-foundation/gallery',
          };

          const result = await imagekit.upload(uploadOptions);

          // Create Database Entry
          await GalleryItem.create({
            title: baseName.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), // Prettify filename as title
            image: result.url,
            category: category,
            altText: `${category || 'Gallery'} photo: ${baseName}`
          });

          completed++;
          process.stdout.write(`✅ [${completed}/${imageFiles.length}] Uploaded ${fileName}\r`);
        } catch (err) {
          failed++;
          console.error(`\n❌ Error uploading ${fileName}:`, err.message);
        }
      }));
    }

    console.log(`\n\n🎯 Upload Finished!`);
    console.log(`✅ Success: ${completed}`);
    console.log(`❌ Failed: ${failed}`);

    process.exit(0);
  } catch (error) {
    console.error('\n💥 Critical Error:', error.message);
    process.exit(1);
  }
}

run();
