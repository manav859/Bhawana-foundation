import express from 'express';
import { requireAdminAuth } from '../../middlewares/auth.middleware.js';
import {
  getTestimonials, getTestimonial,
  createTestimonial, updateTestimonial, deleteTestimonial,
} from './testimonials.controller.js';

export const testimonialsRouter = express.Router();

testimonialsRouter.get('/', getTestimonials);
testimonialsRouter.get('/:id', getTestimonial);
testimonialsRouter.post('/', requireAdminAuth, createTestimonial);
testimonialsRouter.patch('/:id', requireAdminAuth, updateTestimonial);
testimonialsRouter.delete('/:id', requireAdminAuth, deleteTestimonial);