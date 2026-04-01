import { http } from '@/features/api/http.js';

export const authService = {
  async login(credentials) {
    const response = await http.post('/auth/admin/login', credentials);
    return response.data.data; 
  },

  async getCurrentAdmin() {
    const response = await http.get('/auth/admin/me');
    return response.data.data;
  },

  async logout() {
    const response = await http.post('/auth/admin/logout');
    return response.data.data;
  },
};