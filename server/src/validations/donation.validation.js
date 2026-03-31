import Joi from 'joi';

export const createDonationSchema = Joi.object({
  amount: Joi.number().min(1).required().messages({
    'number.min': 'Donation amount must be at least 1',
    'any.required': 'Donation amount is required',
  }),
  currency: Joi.string().uppercase().default('INR'),
  donorName: Joi.string().max(100).allow(''),
  donorEmail: Joi.string().email().allow(''),
  donorPhone: Joi.string().allow(''),
  isAnonymous: Joi.boolean().default(false),
  message: Joi.string().max(500).allow(''),
  campaign: Joi.string().hex().length(24).allow(null, ''),
  paymentStatus: Joi.string().valid('pending', 'success', 'failed').default('pending'),
  paymentProvider: Joi.string().allow(''),
  transactionId: Joi.string().allow(''),
});

export const updateDonationSchema = Joi.object({
  amount: Joi.number().min(1),
  currency: Joi.string().uppercase(),
  donorName: Joi.string().max(100).allow(''),
  donorEmail: Joi.string().email().allow(''),
  donorPhone: Joi.string().allow(''),
  isAnonymous: Joi.boolean(),
  message: Joi.string().max(500).allow(''),
  campaign: Joi.string().hex().length(24).allow(null, ''),
  paymentStatus: Joi.string().valid('pending', 'success', 'failed'),
  paymentProvider: Joi.string().allow(''),
  transactionId: Joi.string().allow(''),
}).min(1);
