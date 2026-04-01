import { http } from '@/features/api/http.js';

export const adminService = {
  list(resource, params) {
    return http.get(`/${resource}/admin/all`, { params });
  },
  get(resource, id) {
    return http.get(`/${resource}/admin/${id}`);
  },
  create(resource, payload) {
    return http.post(`/${resource}`, payload);
  },
  update(resource, id, payload) {
    return http.patch(`/${resource}/${id}`, payload);
  },
  remove(resource, id) {
    return http.delete(`/${resource}/${id}`);
  },
};