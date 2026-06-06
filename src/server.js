import mongoose from 'mongoose';
import app from './app.js';
import config from './config/env.js';
import logger from './config/logger.js';
import connectDB from './database/connection.js';

let server;

connectDB().then(() => {
  server = app.listen(config.port, () => {
    logger.info(`Server running on port ${config.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      mongoose.connection.close(false).then(() => process.exit(0));
    });
  } else {
    process.exit(0);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
process.on('SIGTERM', exitHandler);
