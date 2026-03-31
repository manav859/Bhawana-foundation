import fs from 'node:fs';
import path from 'node:path';
import multer from 'multer';
import { env } from '../config/env.js';

fs.mkdirSync(env.UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, env.UPLOAD_DIR);
  },
  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname);
    const name = path.basename(file.originalname, extension).replace(/[^a-zA-Z0-9-_]/g, '-').toLowerCase();
    callback(null, `${Date.now()}-${name}${extension}`);
  },
});

export const upload = multer({
  storage,
  limits: {
    fileSize: env.MAX_FILE_SIZE_MB * 1024 * 1024,
  },
});