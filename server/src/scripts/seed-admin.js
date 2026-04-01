import mongoose from 'mongoose';
import { env } from '../config/env.js';
import User from '../models/User.js';

async function seedAdmin() {
  try {
    console.log('🌱 Seeding initial admin base...');

    // Attempting standalone connection
    await mongoose.connect(env.MONGODB_URI, {
      dbName: env.MONGODB_DB_NAME,
      maxPoolSize: 1,
      serverSelectionTimeoutMS: 5000,
    });

    console.log('✅ Connected to MongoDB.');

    const adminEmail = 'admin@bhawnafoundation.org';
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log('⚠️ Admin user already exists. Skipping seed.');
      process.exit(0);
    }

    const admin = new User({
      name: 'Super Admin',
      email: adminEmail,
      password: 'Admin@123', // Will be hashed via pre-save hook
      role: 'super_admin',
    });

    await admin.save();
    console.log('✅ Default super_admin seeded successfully!');
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: Admin@123`);
  } catch (error) {
    if (error.name === 'MongooseServerSelectionError' && env.NODE_ENV !== 'production') {
      console.log('⚠️ Local MongoDB connection failed. Falling back to in-memory db.');
      // Import dynamicly so it doesn't error in prod if missing
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create({ instance: { dbName: env.MONGODB_DB_NAME } });
      const uri = mongoServer.getUri();
      
      await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
      console.log(`✅ In-memory database successfully initialized at ${uri}`);
      
      const admin = new User({
        name: 'Super Admin',
        email: 'admin@bhawnafoundation.org',
        password: 'Admin@123',
        role: 'super_admin',
      });
      await admin.save();
      
      console.log('✅ Default super_admin seeded successfully in Memory DB!');
      console.log('Note: In-memory DB data is wiped on restart. You will need to seed this again if the nodemon process restarts.');
    } else {
      console.error('❌ Error seeding admin:', error.message);
    }
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seedAdmin();
