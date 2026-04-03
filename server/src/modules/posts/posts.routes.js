import express from 'express';
import { requireAdminAuth } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate-request.middleware.js';
import { createBlogSchema, updateBlogSchema } from '../../validations/blog.validation.js';
import {
  getPosts, getAllPosts, getPost, getAdminPost,
  createPost, updatePost, deletePost,
} from './posts.controller.js';

export const postsRouter = express.Router();

// Admin routes (must come before /:identifier)
postsRouter.get('/admin/all', requireAdminAuth, getAllPosts);
postsRouter.get('/admin/:id', requireAdminAuth, getAdminPost);
postsRouter.post('/', requireAdminAuth, validate(createBlogSchema), createPost);
postsRouter.patch('/:id', requireAdminAuth, validate(updateBlogSchema), updatePost);
postsRouter.delete('/:id', requireAdminAuth, deletePost);

// Public
postsRouter.get('/', getPosts);
postsRouter.get('/:identifier', getPost);