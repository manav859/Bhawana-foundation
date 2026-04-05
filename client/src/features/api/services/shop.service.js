import { http } from '@/features/api/http.js';
import { getStoredBuyerSession } from '@/features/buyer-auth/buyer-auth.storage.js';

function withBuyerAuth(config = {}) {
  const session = getStoredBuyerSession();
  if (session?.token) {
    config.headers = { ...config.headers, Authorization: `Bearer ${session.token}` };
  }
  return config;
}

export const shopService = {
  getProducts(params) {
    return http.get('/shop/products', { params });
  },
  getProduct(slug) {
    return http.get(`/shop/products/${slug}`);
  },
  getCategories() {
    return http.get('/shop/categories');
  },
  getFeatured() {
    return http.get('/shop/featured');
  },
  createOrder(data) {
    return http.post('/shop/orders', data, withBuyerAuth());
  },
  getMyOrders(params) {
    return http.get('/shop/orders', { params, ...withBuyerAuth() });
  },
  getOrder(orderNumber) {
    return http.get(`/shop/orders/${orderNumber}`, withBuyerAuth());
  },
};
