import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';

const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
  if (error) {
    const message = error.details.map((detail) => detail.message).join(', ');
    return next(new ApiError(httpStatus.BAD_REQUEST, message));
  }
  req.body = value;
  next();
};

export default validate;
