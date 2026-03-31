import Joi from 'joi';

export const createBlogSchema = Joi.object({
  title: Joi.string().max(200).required(),
  slug: Joi.string().allow(''),
  excerpt: Joi.string().max(500).allow(''),
  content: Joi.string().allow(''),
  featuredImage: Joi.string().allow(''),
  category: Joi.string().allow(''),
  tags: Joi.array().items(Joi.string()).default([]),
  author: Joi.string().allow(''),
  isFeatured: Joi.boolean().default(false),
  status: Joi.string().valid('draft', 'published').default('draft'),
});

export const updateBlogSchema = Joi.object({
  title: Joi.string().max(200),
  slug: Joi.string().allow(''),
  excerpt: Joi.string().max(500).allow(''),
  content: Joi.string().allow(''),
  featuredImage: Joi.string().allow(''),
  category: Joi.string().allow(''),
  tags: Joi.array().items(Joi.string()),
  author: Joi.string().allow(''),
  isFeatured: Joi.boolean(),
  status: Joi.string().valid('draft', 'published'),
}).min(1);
