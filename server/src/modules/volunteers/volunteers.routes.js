import { createResourceRouter } from '../shared/resource.factory.js';

export const volunteersRouter = createResourceRouter('volunteers', { slugField: 'id', publicRead: false, allowPublicCreate: true });