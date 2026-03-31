import { createResourceRouter } from '../shared/resource.factory.js';

export const newsletterRouter = createResourceRouter('newsletter', { slugField: 'id', publicRead: false, allowPublicCreate: true });