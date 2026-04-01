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
  try {
    await mongoose.connect(env.MONGODB_URI, {
      dbName: env.MONGODB_DB_NAME,
      maxPoolSize: isProduction ? 50 : 10,
      minPoolSize: isProduction ? 5 : 1,
      serverSelectionTimeoutMS: 2000,
      socketTimeoutMS: 45000,
      retryWrites: true,
    });
  } catch (error) {
    if (!isProduction) {
      console.warn(`[DB] Local MongoDB connection failed (${error.message}).`);
      console.log(`[DB] Automatically starting in-memory database fallback...`);
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create({ instance: { dbName: env.MONGODB_DB_NAME } });
      const uri = mongoServer.getUri();
      await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
      console.log(`[DB] In-memory database successfully initialized at ${uri}`);
      
      // Auto-seed admin user for dev memory DB testing
      const { default: User } = await import('../models/User.js');
      const adminEmail = 'admin@bhawnafoundation.org';
      if (!(await User.exists({ email: adminEmail }))) {
        await User.create({
          name: 'Super Admin',
          email: adminEmail,
          password: 'Admin@123',
          role: 'super_admin'
        });
        console.log(`[DB] Seeded test admin: ${adminEmail} / Admin@123`);
      }
    } else {
      console.error('[DB] Failed to connect to production database.');
      throw error;
    }
  }
}