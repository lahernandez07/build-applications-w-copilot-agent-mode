import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const db = mongoose.connection;

mongoose
  .connect(connectionString)
  .then(() => {
    console.log('Connected to octofit_db');
  })
  .catch((error) => {
    console.warn('MongoDB connection failed; continuing without database for local route validation.', error instanceof Error ? error.message : error);
  });

db.on('error', (error) => {
  console.warn('MongoDB connection error:', error instanceof Error ? error.message : error);
});

export default db;
