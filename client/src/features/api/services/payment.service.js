import { http } from '@/features/api/http.js';
import { getStoredBuyerSession } from '@/features/buyer-auth/buyer-auth.storage.js';

function withBuyerAuth(config = {}) {
  const session = getStoredBuyerSession();
  if (session?.token) {
    config.headers = { ...config.headers, Authorization: `Bearer ${session.token}` };
  }
  return config;
}

export const paymentService = {
  createRazorpayOrder(data) {
    return http.post('/payment/create-order', data, withBuyerAuth());
  },
  verifyPayment(data) {
    return http.post('/payment/verify', data, withBuyerAuth());
  },
};
