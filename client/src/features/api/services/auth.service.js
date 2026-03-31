import { http } from '@/features/api/http.js';

function delay(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export const authService = {
  async login(credentials) {
    const mode = import.meta.env.VITE_ADMIN_AUTH_MODE || 'mock';

    if (mode === 'mock') {
      await delay(350);

      return {
        token: 'dev-admin-token',
        admin: {
          id: 'dev-admin',
          name: 'Foundation Admin',
          email: credentials.email,
          role: 'super_admin',
        },
      };
    }

    const response = await http.post('/auth/admin/login', credentials);
    return response.data.data;
  },

  async getCurrentAdmin() {
    const response = await http.get('/auth/admin/me');
    return response.data.data;
  },

  async logout() {
    const mode = import.meta.env.VITE_ADMIN_AUTH_MODE || 'mock';

    if (mode === 'mock') {
      return { success: true };
    }

    const response = await http.post('/auth/admin/logout');
    return response.data;
  },
};