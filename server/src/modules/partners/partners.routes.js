import { createResourceRouter } from '../shared/resource.factory.js';

export const partnersRouter = createResourceRouter('partners', { slugField: 'id' });