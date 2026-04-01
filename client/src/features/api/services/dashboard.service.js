import { http } from '@/features/api/http.js';

export const dashboardService = {
  async getDashboardStats() {
    const response = await http.get('/dashboard/stats');
    return response.data.data;
  },
};
