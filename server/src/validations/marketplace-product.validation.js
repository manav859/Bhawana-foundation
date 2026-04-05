import Joi from 'joi';

const childStorySchema = Joi.object({
  name: Joi.string().max(100).allow('', null),
  age: Joi.number().min(0).max(25).allow(null, ''),
  story: Joi.string().max(2000).allow('', null),
  photo: Joi.string().allow('', null),
}).allow(null);

export const createMarketplaceProductSchema = Joi.object({
  title: Joi.string().max(200).required(),
  slug: Joi.string().allow(''),
  description: Joi.string().allow(''),
  shortDescription: Joi.string().max(300).allow(''),
  childStory: childStorySchema.default({}),
  price: Joi.number().min(0).required(),
  compareAtPrice: Joi.number().min(0).allow(null),
  category: Joi.string().hex().length(24).allow(null, ''),
  images: Joi.array().items(Joi.string()).max(5).default([]),
  stock: Joi.number().integer().min(0).default(0),
  lowStockThreshold: Joi.number().integer().min(0).default(5),
  sku: Joi.string().allow(''),
  tags: Joi.array().items(Joi.string()).default([]),
  isFeatured: Joi.boolean().default(false),
  isDonationOnly: Joi.boolean().default(false),
  impactMessage: Joi.string().max(300).allow(''),
  status: Joi.string().valid('draft', 'published').default('draft'),
});

export const updateMarketplaceProductSchema = Joi.object({
  title: Joi.string().max(200),
  slug: Joi.string().allow(''),
  description: Joi.string().allow(''),
  shortDescription: Joi.string().max(300).allow(''),
  childStory: childStorySchema,
  price: Joi.number().min(0),
  compareAtPrice: Joi.number().min(0).allow(null),
  category: Joi.string().hex().length(24).allow(null, ''),
  images: Joi.array().items(Joi.string()).max(5),
  stock: Joi.number().integer().min(0),
  lowStockThreshold: Joi.number().integer().min(0),
  sku: Joi.string().allow(''),
  tags: Joi.array().items(Joi.string()),
  isFeatured: Joi.boolean(),
  isDonationOnly: Joi.boolean(),
  impactMessage: Joi.string().max(300).allow(''),
  status: Joi.string().valid('draft', 'published'),
}).min(1);
