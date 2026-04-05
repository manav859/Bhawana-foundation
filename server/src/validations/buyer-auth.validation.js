import Joi from 'joi';

export const registerBuyerSchema = Joi.object({
  name: Joi.string().max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(128).required(),
  phone: Joi.string().allow(''),
});

export const loginBuyerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const updateBuyerProfileSchema = Joi.object({
  name: Joi.string().max(100),
  phone: Joi.string().allow(''),
  address: Joi.object({
    line1: Joi.string().allow(''),
    line2: Joi.string().allow(''),
    city: Joi.string().allow(''),
    state: Joi.string().allow(''),
    pincode: Joi.string().allow(''),
    country: Joi.string().allow(''),
  }),
}).min(1);
