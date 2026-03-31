import express from 'express';
import { requireAdminAuth } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate-request.middleware.js';
import { loginSchema } from '../../validations/auth.validation.js';
import { adminLogin, adminLogout, adminMe } from './auth.controller.js';

export const authRouter = express.Router();

authRouter.post('/admin/login', validate(loginSchema), adminLogin);
authRouter.get('/admin/me', requireAdminAuth, adminMe);
authRouter.post('/admin/logout', requireAdminAuth, adminLogout);