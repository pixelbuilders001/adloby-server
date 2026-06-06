import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import logger from '../config/logger.js';

export const notFoundHandler = (req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, `Route not found: ${req.originalUrl}`));
};

export const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (!statusCode) statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  if (!message) message = 'Internal Server Error';
  logger.error({ message, stack: err.stack });
  res.status(statusCode).json({ success: false, message });
};
