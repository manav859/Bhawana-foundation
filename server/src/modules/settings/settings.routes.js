import express from 'express';
import { requireAdminAuth } from '../../middlewares/auth.middleware.js';
import { getAdminSettings, getPublicShellSettings, updateAdminSettings } from './settings.controller.js';

export const settingsRouter = express.Router();

settingsRouter.get('/public-shell', getPublicShellSettings);
settingsRouter.get('/', requireAdminAuth, getAdminSettings);
settingsRouter.patch('/', requireAdminAuth, updateAdminSettings);