import { env } from './env.js';

export function buildCorsOptions() {
  return {
    origin(origin, callback) {
      if (!origin || env.CLIENT_URLS.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('Origin is not allowed by CORS.'));
    },
    credentials: true,
  };
}