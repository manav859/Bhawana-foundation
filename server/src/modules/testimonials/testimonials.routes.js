import express from 'express';
import { requireAdminAuth } from '../../middlewares/auth.middleware.js';
import {
  getTestimonials, getTestimonial,
  createTestimonial, updateTestimonial, deleteTestimonial,
} from './testimonials.controller.js';

export const testimonialsRouter = express.Router();

// Public
testimonialsRouter.get('/', getTestimonials);

// Admin
testimonialsRouter.get('/admin/all', requireAdminAuth, getTestimonials);
testimonialsRouter.get('/:id', getTestimonial);
testimonialsRouter.post('/', requireAdminAuth, createTestimonial);
testimonialsRouter.patch('/:id', requireAdminAuth, updateTestimonial);
testimonialsRouter.delete('/:id', requireAdminAuth, deleteTestimonial);