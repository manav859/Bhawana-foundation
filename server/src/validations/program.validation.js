import Joi from 'joi';

export const createProgramSchema = Joi.object({
  title: Joi.string().max(200).required(),
  slug: Joi.string().allow(''),
  shortDescription: Joi.string().max(300).allow(''),
  fullDescription: Joi.string().allow(''),
  image: Joi.string().allow(''),
  category: Joi.string().allow(''),
  isFeatured: Joi.boolean().default(false),
  status: Joi.string().valid('draft', 'published').default('draft'),
});

export const updateProgramSchema = Joi.object({
  title: Joi.string().max(200),
  slug: Joi.string().allow(''),
  shortDescription: Joi.string().max(300).allow(''),
  fullDescription: Joi.string().allow(''),
  image: Joi.string().allow(''),
  category: Joi.string().allow(''),
  isFeatured: Joi.boolean(),
  status: Joi.string().valid('draft', 'published'),
}).min(1);
