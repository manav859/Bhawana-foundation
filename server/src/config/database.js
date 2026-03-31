import mongoose from 'mongoose';
import { env, isProduction } from './env.js';

/**
 * Connect to MongoDB with production-ready settings.
 */
export async function connectDatabase() {
  // Mongoose global settings
  mongoose.set('strictQuery', true);

  // Connection event handlers
  mongoose.connection.on('connected', () => {
    console.log(`[DB] MongoDB connected to ${isProduction ? '***' : env.MONGODB_URI}`);
  });

  mongoose.connection.on('error', (err) => {
    console.error('[DB] MongoDB connection error:', err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('[DB] MongoDB disconnected.');
  });

  // Graceful shutdown
  const shutdown = async (signal) => {
    console.log(`[DB] ${signal} received. Closing MongoDB connection...`);
    await mongoose.connection.close();
    process.exit(0);
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));

  // Connect with retry-friendly options
  await mongoose.connect(env.MONGODB_URI, {
    dbName: env.MONGODB_DB_NAME,
    maxPoolSize: isProduction ? 50 : 10,
    minPoolSize: isProduction ? 5 : 1,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    retryWrites: true,
  });
}