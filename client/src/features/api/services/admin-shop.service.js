import { http } from '@/features/api/http.js';

export const adminShopService = {
  // Products
  listProducts(params) { return http.get('/admin-shop/products', { params }); },
  getProduct(id) { return http.get(`/admin-shop/products/${id}`); },
  createProduct(data) { return http.post('/admin-shop/products', data); },
  updateProduct(id, data) { return http.patch(`/admin-shop/products/${id}`, data); },
  deleteProduct(id) { return http.delete(`/admin-shop/products/${id}`); },

  // Categories
  listCategories(params) { return http.get('/admin-shop/categories', { params }); },
  createCategory(data) { return http.post('/admin-shop/categories', data); },
  updateCategory(id, data) { return http.patch(`/admin-shop/categories/${id}`, data); },
  deleteCategory(id) { return http.delete(`/admin-shop/categories/${id}`); },

  // Orders
  listOrders(params) { return http.get('/admin-shop/orders', { params }); },
  getOrder(id) { return http.get(`/admin-shop/orders/${id}`); },
  updateOrderStatus(id, data) { return http.patch(`/admin-shop/orders/${id}/status`, data); },
  exportOrdersCsv(params) { return http.get('/admin-shop/orders/export/csv', { params, responseType: 'blob' }); },

  // Analytics
  getAnalytics() { return http.get('/admin-shop/analytics'); },
};
