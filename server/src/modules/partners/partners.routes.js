import express from 'express';
import { requireAdminAuth } from '../../middlewares/auth.middleware.js';
import {
  getPartners, getAllPartners, getPartner,
  createPartner, updatePartner, deletePartner,
} from './partners.controller.js';

export const partnersRouter = express.Router();

partnersRouter.get('/', getPartners);
partnersRouter.get('/admin/all', requireAdminAuth, getAllPartners);
partnersRouter.get('/:id', getPartner);
partnersRouter.post('/', requireAdminAuth, createPartner);
partnersRouter.patch('/:id', requireAdminAuth, updatePartner);
partnersRouter.delete('/:id', requireAdminAuth, deletePartner);