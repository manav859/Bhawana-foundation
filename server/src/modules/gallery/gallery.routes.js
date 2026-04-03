import express from 'express';
import { requireAdminAuth } from '../../middlewares/auth.middleware.js';
import {
  getGalleryItems, getGalleryItem,
  createGalleryItem, updateGalleryItem, deleteGalleryItem,
} from './gallery.controller.js';

export const galleryRouter = express.Router();

// Public
galleryRouter.get('/', getGalleryItems);

// Admin
galleryRouter.get('/admin/all', requireAdminAuth, getGalleryItems);
galleryRouter.get('/admin/:id', requireAdminAuth, getGalleryItem);
galleryRouter.get('/:id', getGalleryItem);
galleryRouter.post('/', requireAdminAuth, createGalleryItem);
galleryRouter.patch('/:id', requireAdminAuth, updateGalleryItem);
galleryRouter.delete('/:id', requireAdminAuth, deleteGalleryItem);