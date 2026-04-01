import express from 'express';
import { requireAdminAuth } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate-request.middleware.js';
import { createContactSchema, updateContactSchema } from '../../validations/contact.validation.js';
import {
  createContact, getContacts, getContact,
  updateContact, deleteContact,
} from './contacts.controller.js';

export const contactsRouter = express.Router();

contactsRouter.post('/', validate(createContactSchema), createContact);
contactsRouter.get('/', requireAdminAuth, getContacts);
contactsRouter.get('/:id', requireAdminAuth, getContact);
contactsRouter.patch('/:id', requireAdminAuth, validate(updateContactSchema), updateContact);
contactsRouter.delete('/:id', requireAdminAuth, deleteContact);