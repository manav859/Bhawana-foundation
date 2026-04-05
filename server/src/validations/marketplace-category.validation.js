import Joi from 'joi';

export const createCategorySchema = Joi.object({
  name: Joi.string().max(100).required(),
  slug: Joi.string().allow(''),
  description: Joi.string().max(500).allow(''),
  image: Joi.string().allow(''),
  isActive: Joi.boolean().default(true),
  sortOrder: Joi.number().integer().min(0).default(0),
});

export const updateCategorySchema = Joi.object({
  name: Joi.string().max(100),
  slug: Joi.string().allow(''),
  description: Joi.string().max(500).allow(''),
  image: Joi.string().allow(''),
  isActive: Joi.boolean(),
  sortOrder: Joi.number().integer().min(0),
}).min(1);
