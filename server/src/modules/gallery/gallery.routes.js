import { createResourceRouter } from '../shared/resource.factory.js';

export const galleryRouter = createResourceRouter('gallery', { slugField: 'id' });