import { http } from '@/features/api/http.js';

export const publicService = {
  getHealth() {
    return http.get('/health');
  },
  getShellConfig() {
    return http.get('/settings/public-shell');
  },
  getPrograms(params) {
    return http.get('/programs', { params });
  },
  getProgram(slug) {
    return http.get(`/programs/${slug}`);
  },
  getProjects(params) {
    return http.get('/projects', { params });
  },
  getProject(slug) {
    return http.get(`/projects/${slug}`);
  },
  getEvents(params) {
    return http.get('/events', { params });
  },
  getEvent(slug) {
    return http.get(`/events/${slug}`);
  },
  getPosts(params) {
    return http.get('/posts', { params });
  },
  getPost(slug) {
    return http.get(`/posts/${slug}`);
  },
  getGallery(params) {
    return http.get('/gallery', { params });
  },
  getTestimonials(params) {
    return http.get('/testimonials', { params });
  },
  getPartners(params) {
    return http.get('/partners', { params });
  },
};