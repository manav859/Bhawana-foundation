import express from 'express';
import { requireAdminAuth } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate-request.middleware.js';
import { subscribeSchema } from '../../validations/newsletter.validation.js';
import {
  subscribe, unsubscribe, getSubscribers, deleteSubscriber,
} from './newsletter.controller.js';

export const newsletterRouter = express.Router();

newsletterRouter.post('/', validate(subscribeSchema), subscribe);
newsletterRouter.post('/unsubscribe', validate(subscribeSchema), unsubscribe);
newsletterRouter.get('/', requireAdminAuth, getSubscribers);
newsletterRouter.delete('/:id', requireAdminAuth, deleteSubscriber);