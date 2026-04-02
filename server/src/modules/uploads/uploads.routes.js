import express from 'express';
import { requireAdminAuth } from '../../middlewares/auth.middleware.js';
import { upload } from '../../middlewares/upload.middleware.js';
import { uploadFile, deleteFile } from './uploads.controller.js';

export const uploadsRouter = express.Router();

uploadsRouter.post('/', requireAdminAuth, upload.single('file'), uploadFile);
uploadsRouter.delete('/', requireAdminAuth, deleteFile);