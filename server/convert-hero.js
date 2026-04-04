import fs from 'fs';
import convert from 'heic-convert';
import path from 'path';

async function convertHero() {
  const inputPath = 'd:/siteonlab/Bhawana-foundation/client/public/uploads/home-hero.HEIC';
  const outputPath = 'd:/siteonlab/Bhawana-foundation/client/public/uploads/home-hero.jpg';

  try {
    const inputBuffer = fs.readFileSync(inputPath);
    const outputBuffer = await convert({
      buffer: inputBuffer,
      format: 'JPEG',
      quality: 0.95
    });

    fs.writeFileSync(outputPath, Buffer.from(outputBuffer));
    console.log('Conversion successful: ' + outputPath);
  } catch (err) {
    console.error('Conversion failed:', err);
  }
}

convertHero();
