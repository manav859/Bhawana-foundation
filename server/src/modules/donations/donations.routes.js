import { createResourceRouter } from '../shared/resource.factory.js';

export const donationsRouter = createResourceRouter('donations', { slugField: 'id', publicRead: false, allowPublicCreate: true });