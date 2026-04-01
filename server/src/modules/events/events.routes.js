import express from 'express';
import { requireAdminAuth } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate-request.middleware.js';
import { createEventSchema, updateEventSchema } from '../../validations/event.validation.js';
import {
  getEvents, getAllEvents, getEvent, getAdminEvent,
  createEvent, updateEvent, deleteEvent,
} from './events.controller.js';

export const eventsRouter = express.Router();

eventsRouter.get('/', getEvents);
eventsRouter.get('/admin/all', requireAdminAuth, getAllEvents);
eventsRouter.get('/admin/:id', requireAdminAuth, getAdminEvent);
eventsRouter.get('/:identifier', getEvent);
eventsRouter.post('/', requireAdminAuth, validate(createEventSchema), createEvent);
eventsRouter.patch('/:id', requireAdminAuth, validate(updateEventSchema), updateEvent);
eventsRouter.delete('/:id', requireAdminAuth, deleteEvent);