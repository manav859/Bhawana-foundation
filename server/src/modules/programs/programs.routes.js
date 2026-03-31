import express from 'express';
import { requireAdminAuth } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate-request.middleware.js';
import { createProgramSchema, updateProgramSchema } from '../../validations/program.validation.js';
import {
  getPrograms,
  getAllPrograms,
  getProgram,
  createProgram,
  updateProgram,
  deleteProgram,
} from './programs.controller.js';

export const programsRouter = express.Router();

// Public
programsRouter.get('/', getPrograms);
programsRouter.get('/:identifier', getProgram);

// Admin
programsRouter.get('/admin/all', requireAdminAuth, getAllPrograms);
programsRouter.post('/', requireAdminAuth, validate(createProgramSchema), createProgram);
programsRouter.patch('/:id', requireAdminAuth, validate(updateProgramSchema), updateProgram);
programsRouter.delete('/:id', requireAdminAuth, deleteProgram);