import express from 'express';
import { requireBuyerAuth } from '../../middlewares/buyer-auth.middleware.js';
import { validate } from '../../middlewares/validate-request.middleware.js';
import {
  registerBuyerSchema,
  loginBuyerSchema,
  updateBuyerProfileSchema,
} from '../../validations/buyer-auth.validation.js';
import { register, login, getProfile, updateProfile } from './buyer-auth.controller.js';

export const buyerAuthRouter = express.Router();

buyerAuthRouter.post('/register', validate(registerBuyerSchema), register);
buyerAuthRouter.post('/login', validate(loginBuyerSchema), login);
buyerAuthRouter.get('/me', requireBuyerAuth, getProfile);
buyerAuthRouter.patch('/profile', requireBuyerAuth, validate(updateBuyerProfileSchema), updateProfile);
