import express from 'express';
import { requireAdminAuth } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate-request.middleware.js';
import { createMarketplaceProductSchema, updateMarketplaceProductSchema } from '../../validations/marketplace-product.validation.js';
import { createCategorySchema, updateCategorySchema } from '../../validations/marketplace-category.validation.js';
import { updateOrderStatusSchema } from '../../validations/marketplace-order.validation.js';
import {
  listProducts, getProduct, createProduct, updateProduct, deleteProduct,
  listCategories, createCategory, updateCategory, deleteCategory,
  listOrders, getOrder, updateOrderStatus, exportOrdersCsv,
  getAnalytics,
} from './admin-shop.controller.js';

export const adminShopRouter = express.Router();

// All routes require admin auth
adminShopRouter.use(requireAdminAuth);

// Products
adminShopRouter.get('/products', listProducts);
adminShopRouter.get('/products/:id', getProduct);
adminShopRouter.post('/products', validate(createMarketplaceProductSchema), createProduct);
adminShopRouter.patch('/products/:id', validate(updateMarketplaceProductSchema), updateProduct);
adminShopRouter.delete('/products/:id', deleteProduct);

// Categories
adminShopRouter.get('/categories', listCategories);
adminShopRouter.post('/categories', validate(createCategorySchema), createCategory);
adminShopRouter.patch('/categories/:id', validate(updateCategorySchema), updateCategory);
adminShopRouter.delete('/categories/:id', deleteCategory);

// Orders
adminShopRouter.get('/orders/export/csv', exportOrdersCsv);
adminShopRouter.get('/orders', listOrders);
adminShopRouter.get('/orders/:id', getOrder);
adminShopRouter.patch('/orders/:id/status', validate(updateOrderStatusSchema), updateOrderStatus);

// Analytics
adminShopRouter.get('/analytics', getAnalytics);
