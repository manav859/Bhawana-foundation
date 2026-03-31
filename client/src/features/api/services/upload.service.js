import { http } from '@/features/api/http.js';

export const uploadService = {
  upload(formData) {
    return http.post('/uploads', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};