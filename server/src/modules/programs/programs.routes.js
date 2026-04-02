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

// Admin routes (must come before /:identifier)
programsRouter.get('/admin/all', requireAdminAuth, getAllPrograms);
programsRouter.get('/admin/:id', requireAdminAuth, async (req, res, next) => {
  // Reuse getProgram but bypass published filter
  const Program = (await import('../../models/Program.js')).default;
  const { sendResponse } = await import('../../utils/send-response.js');
  const { ApiError } = await import('../../utils/api-error.js');
  const program = await Program.findById(req.params.id);
  if (!program) throw new ApiError(404, 'Program not found.');
  sendResponse(res, { data: program, message: 'Admin program fetched.' });
});
programsRouter.post('/', requireAdminAuth, validate(createProgramSchema), createProgram);
programsRouter.patch('/:id', requireAdminAuth, validate(updateProgramSchema), updateProgram);
programsRouter.delete('/:id', requireAdminAuth, deleteProgram);

// Public
programsRouter.get('/', getPrograms);
programsRouter.get('/:identifier', getProgram);