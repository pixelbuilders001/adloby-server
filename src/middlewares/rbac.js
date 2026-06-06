import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';

const permit = (...allowedRoles) => (req, res, next) => {
  if (!req.user || !allowedRoles.includes(req.user.role)) {
    return next(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
  }
  next();
};

export default permit;
