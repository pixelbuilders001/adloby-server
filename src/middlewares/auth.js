import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import { verifyAccessToken } from '../utils/token.js';
import userRepo from '../repositories/user.repository.js';

const auth = async (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) throw new ApiError(httpStatus.UNAUTHORIZED, 'Missing token');

    const payload = verifyAccessToken(token);
    const user = await userRepo.findById(payload.sub);
    if (!user || !user.isActive) throw new ApiError(httpStatus.UNAUTHORIZED, 'User not found or inactive');

    req.user = user;
    next();
  } catch (error) {
    next(error.statusCode ? error : new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized'));
  }
};

export default auth;
