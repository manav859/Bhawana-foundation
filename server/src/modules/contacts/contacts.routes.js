import { createResourceRouter } from '../shared/resource.factory.js';

export const contactsRouter = createResourceRouter('contacts', { slugField: 'id', publicRead: false, allowPublicCreate: true });