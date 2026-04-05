import Joi from 'joi';

const orderItemSchema = Joi.object({
  product: Joi.string().hex().length(24).required(),
  quantity: Joi.number().integer().min(1).required(),
});

const shippingAddressSchema = Joi.object({
  name: Joi.string().max(100).required(),
  phone: Joi.string().allow(''),
  line1: Joi.string().max(200).required(),
  line2: Joi.string().max(200).allow(''),
  city: Joi.string().max(100).required(),
  state: Joi.string().max(100).required(),
  pincode: Joi.string().max(10).required(),
  country: Joi.string().max(100).default('India'),
});

export const createOrderSchema = Joi.object({
  items: Joi.array().items(orderItemSchema).min(1).required(),
  shippingAddress: shippingAddressSchema.required(),
  donationExtra: Joi.number().min(0).default(0),
  notes: Joi.string().max(500).allow(''),
});

export const updateOrderStatusSchema = Joi.object({
  status: Joi.string().valid('pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled'),
  trackingInfo: Joi.object({
    carrier: Joi.string().allow(''),
    trackingNumber: Joi.string().allow(''),
    trackingUrl: Joi.string().allow(''),
  }),
  notes: Joi.string().max(500).allow(''),
}).min(1);
