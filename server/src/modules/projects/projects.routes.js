import express from 'express';
import { requireAdminAuth } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate-request.middleware.js';
import { createProjectSchema, updateProjectSchema } from '../../validations/project.validation.js';
import {
  getProjects, getAllProjects, getProject,
  createProject, updateProject, deleteProject,
} from './projects.controller.js';

export const projectsRouter = express.Router();

projectsRouter.get('/', getProjects);
projectsRouter.get('/:identifier', getProject);
projectsRouter.get('/admin/all', requireAdminAuth, getAllProjects);
projectsRouter.post('/', requireAdminAuth, validate(createProjectSchema), createProject);
projectsRouter.patch('/:id', requireAdminAuth, validate(updateProjectSchema), updateProject);
projectsRouter.delete('/:id', requireAdminAuth, deleteProject);