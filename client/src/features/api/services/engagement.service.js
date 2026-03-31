import { http } from '@/features/api/http.js';

export const engagementService = {
  submitContact(payload) {
    return http.post('/contacts', payload);
  },
  subscribeNewsletter(payload) {
    return http.post('/newsletter', payload);
  },
  submitVolunteer(payload) {
    return http.post('/volunteers', payload);
  },
  createDonationIntent(payload) {
    return http.post('/donations', payload);
  },
};