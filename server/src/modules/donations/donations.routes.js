import express from 'express';
import { requireAdminAuth } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate-request.middleware.js';
import { createDonationSchema, updateDonationSchema } from '../../validations/donation.validation.js';
import {
  createDonation, getDonations, getDonation,
  updateDonation, deleteDonation,
} from './donations.controller.js';

export const donationsRouter = express.Router();

// Public
donationsRouter.post('/', validate(createDonationSchema), createDonation);

// Admin
donationsRouter.get('/', requireAdminAuth, getDonations);
donationsRouter.get('/admin/:id', requireAdminAuth, getDonation);
donationsRouter.get('/:id', requireAdminAuth, getDonation);
donationsRouter.patch('/:id', requireAdminAuth, validate(updateDonationSchema), updateDonation);
donationsRouter.delete('/:id', requireAdminAuth, deleteDonation);