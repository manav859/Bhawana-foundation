import express from 'express';
import { requireAdminAuth } from '../../middlewares/auth.middleware.js';
import {
  getTestimonials, getTestimonial,
  createTestimonial, updateTestimonial, deleteTestimonial,
  submitTestimonial,
} from './testimonials.controller.js';

export const testimonialsRouter = express.Router();

// Public
testimonialsRouter.get('/', getTestimonials);
testimonialsRouter.post('/submit', submitTestimonial);

// Admin
testimonialsRouter.get('/admin/all', requireAdminAuth, getTestimonials);
testimonialsRouter.get('/:id', getTestimonial);
testimonialsRouter.post('/', requireAdminAuth, createTestimonial);
testimonialsRouter.patch('/:id', requireAdminAuth, updateTestimonial);
testimonialsRouter.delete('/:id', requireAdminAuth, deleteTestimonial);