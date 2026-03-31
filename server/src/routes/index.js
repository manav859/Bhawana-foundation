import express from 'express';
import { API_PREFIX, API_VERSION } from '../constants/app.constants.js';
import { v1Router } from './v1/index.js';

export const apiRouter = express.Router();

apiRouter.use(`${API_PREFIX}/${API_VERSION}`, v1Router);