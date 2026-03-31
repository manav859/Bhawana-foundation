import mongoose from 'mongoose';
import { env } from '../../config/env.js';
import { sendResponse } from '../../utils/send-response.js';

export function getHealth(_req, res) {
  sendResponse(res, {
    data: {
      status: 'ok',
      environment: env.NODE_ENV,
      databaseState: mongoose.connection.readyState,
      timestamp: new Date().toISOString(),
    },
    message: 'Health check completed.',
  });
}