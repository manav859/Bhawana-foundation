import Joi from 'joi';

export const createVolunteerSchema = Joi.object({
  name: Joi.string().max(100).required().messages({
    'any.required': 'Name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email',
    'any.required': 'Email is required',
  }),
  phone: Joi.string().allow(''),
  skills: Joi.array().items(Joi.string()).default([]),
  interests: Joi.array().items(Joi.string()).default([]),
  availability: Joi.string().allow(''),
  resumeUrl: Joi.string().uri().allow(''),
  message: Joi.string().max(1000).allow(''),
});

export const updateVolunteerSchema = Joi.object({
  name: Joi.string().max(100),
  email: Joi.string().email(),
  phone: Joi.string().allow(''),
  skills: Joi.array().items(Joi.string()),
  interests: Joi.array().items(Joi.string()),
  availability: Joi.string().allow(''),
  resumeUrl: Joi.string().uri().allow(''),
  message: Joi.string().max(1000).allow(''),
  status: Joi.string().valid('new', 'reviewed', 'accepted', 'rejected'),
}).min(1);
