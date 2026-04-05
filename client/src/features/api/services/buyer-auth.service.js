import { http } from '@/features/api/http.js';
import { getStoredBuyerSession } from '@/features/buyer-auth/buyer-auth.storage.js';

function buyerHttp() {
  const session = getStoredBuyerSession();
  if (session?.token) {
    http.defaults.headers.common['Authorization'] = `Bearer ${session.token}`;
  }
  return http;
}

export const buyerAuthService = {
  register(data) {
    return http.post('/buyer-auth/register', data);
  },
  login(data) {
    return http.post('/buyer-auth/login', data);
  },
  getProfile() {
    return buyerHttp().get('/buyer-auth/me');
  },
  updateProfile(data) {
    return buyerHttp().patch('/buyer-auth/profile', data);
  },
};
