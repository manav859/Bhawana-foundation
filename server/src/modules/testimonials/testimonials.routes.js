import { createResourceRouter } from '../shared/resource.factory.js';

export const testimonialsRouter = createResourceRouter('testimonials', { slugField: 'id' });