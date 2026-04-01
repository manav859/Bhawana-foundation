import express from 'express';
import { requireAdminAuth } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate-request.middleware.js';
import { createVolunteerSchema, updateVolunteerSchema } from '../../validations/volunteer.validation.js';
import {
  createVolunteer, getVolunteers, getVolunteer,
  updateVolunteer, deleteVolunteer,
} from './volunteers.controller.js';

export const volunteersRouter = express.Router();

volunteersRouter.post('/', validate(createVolunteerSchema), createVolunteer);
volunteersRouter.get('/', requireAdminAuth, getVolunteers);
volunteersRouter.get('/:id', requireAdminAuth, getVolunteer);
volunteersRouter.patch('/:id', requireAdminAuth, validate(updateVolunteerSchema), updateVolunteer);
volunteersRouter.delete('/:id', requireAdminAuth, deleteVolunteer);