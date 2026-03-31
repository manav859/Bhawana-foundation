import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().max(100).required().messages({
    'any.required': 'Name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email',
    'any.required': 'Email is required',
  }),
  phone: Joi.string().allow(''),
  subject: Joi.string().max(200).required().messages({
    'any.required': 'Subject is required',
  }),
  message: Joi.string().max(2000).required().messages({
    'any.required': 'Message is required',
  }),
});

export const updateContactSchema = Joi.object({
  status: Joi.string().valid('new', 'read', 'replied'),
}).min(1);
