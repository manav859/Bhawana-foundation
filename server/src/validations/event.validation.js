import Joi from 'joi';

export const createEventSchema = Joi.object({
  title: Joi.string().max(200).required(),
  slug: Joi.string().allow(''),
  shortDescription: Joi.string().max(300).allow(''),
  fullDescription: Joi.string().allow(''),
  date: Joi.date().iso().allow(null),
  time: Joi.string().allow(''),
  location: Joi.string().allow(''),
  category: Joi.string().allow(''),
  image: Joi.string().allow(''),
  isFeatured: Joi.boolean().default(false),
  status: Joi.string().valid('upcoming', 'past', 'draft').default('draft'),
});

export const updateEventSchema = Joi.object({
  title: Joi.string().max(200),
  slug: Joi.string().allow(''),
  shortDescription: Joi.string().max(300).allow(''),
  fullDescription: Joi.string().allow(''),
  date: Joi.date().iso().allow(null),
  time: Joi.string().allow(''),
  location: Joi.string().allow(''),
  category: Joi.string().allow(''),
  image: Joi.string().allow(''),
  isFeatured: Joi.boolean(),
  status: Joi.string().valid('upcoming', 'past', 'draft'),
}).min(1);
