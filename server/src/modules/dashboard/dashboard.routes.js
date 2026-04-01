import express from 'express';
import { requireAdminAuth } from '../../middlewares/auth.middleware.js';
import { getDashboardStats } from './dashboard.controller.js';

export const dashboardRouter = express.Router();

dashboardRouter.get('/stats', requireAdminAuth, getDashboardStats);
