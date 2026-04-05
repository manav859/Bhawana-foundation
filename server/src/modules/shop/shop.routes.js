import express from 'express';
import { requireBuyerAuth } from '../../middlewares/buyer-auth.middleware.js';
import { validate } from '../../middlewares/validate-request.middleware.js';
import { createOrderSchema } from '../../validations/marketplace-order.validation.js';
import {
  getProducts, getProduct, getCategories, getFeatured,
  createOrder, getMyOrders, getMyOrder,
} from './shop.controller.js';

export const shopRouter = express.Router();

// Public
shopRouter.get('/products', getProducts);
shopRouter.get('/products/:slug', getProduct);
shopRouter.get('/categories', getCategories);
shopRouter.get('/featured', getFeatured);

// Buyer authenticated
shopRouter.post('/orders', requireBuyerAuth, validate(createOrderSchema), createOrder);
shopRouter.get('/orders', requireBuyerAuth, getMyOrders);
shopRouter.get('/orders/:orderNumber', requireBuyerAuth, getMyOrder);
