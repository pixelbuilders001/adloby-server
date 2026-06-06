import mongoose from 'mongoose';
import config from '../config/env.js';
import logger from '../config/logger.js';

const connectDB = async () => {
  mongoose.set('strictQuery', true);
  await mongoose.connect(config.mongodbUri);
  logger.info('MongoDB connected');
};

export default connectDB;
