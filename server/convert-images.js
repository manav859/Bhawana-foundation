import fs from 'fs';
import convert from 'heic-convert';
import path from 'path';

async function convertImages() {
  const uploadsDir = 'd:/siteonlab/Bhawana-foundation/client/public/uploads/';
  const files = ['home-hero.HEIC', 'about-us.HEIC', 'our-journey.HEIC', 'project-hero.heic', 'event-hero.HEIC', 'blog-hero.HEIC'];

  for (const file of files) {
    const inputPath = path.join(uploadsDir, file);
    const outputPath = path.join(uploadsDir, file.replace(/\.heic$/i, '.jpg').replace(/\.HEIC$/i, '.jpg'));

    try {
      if (!fs.existsSync(inputPath)) {
        console.log(`File not found: ${inputPath}`);
        continue;
      }
      
      const inputBuffer = fs.readFileSync(inputPath);
      const outputBuffer = await convert({
        buffer: inputBuffer,
        format: 'JPEG',
        quality: 0.95
      });

      fs.writeFileSync(outputPath, Buffer.from(outputBuffer));
      console.log(`Conversion successful: ${outputPath}`);
    } catch (err) {
      console.error(`Conversion failed for ${file}:`, err);
    }
  }
}

convertImages();
