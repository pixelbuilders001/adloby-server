import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync.js';
import authService from '../services/auth.service.js';

export const register = catchAsync(async (req, res) => {
  const result = await authService.register(req.body);
  res.status(httpStatus.CREATED).json({ success: true, data: result });
});

export const login = catchAsync(async (req, res) => {
  const result = await authService.login(req.body);
  res.status(httpStatus.OK).json({ success: true, data: result });
});

export const refreshToken = catchAsync(async (req, res) => {
  const result = await authService.refreshToken(req.body.refreshToken);
  res.status(httpStatus.OK).json({ success: true, data: result });
});

export default { register, login, refreshToken };
