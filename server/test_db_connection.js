import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri = "mongodb+srv://manav_db_user:MhuDuYzAtHtWsjBC@bhawna.nskpfg8.mongodb.net/";

console.log('Attempting to connect to MongoDB Atlas...');
console.log('URI:', uri.replace(/:([^@]+)@/, ':****@')); // Hide password in logs

mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 })
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Connection failed!');
    console.error('Error Name:', err.name);
    console.error('Error Message:', err.message);
    if (err.reason) {
        console.error('Reason:', JSON.stringify(err.reason, null, 2));
    }
    process.exit(1);
  });
