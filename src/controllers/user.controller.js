import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync.js';
import userService from '../services/user.service.js';

export const getMe = catchAsync(async (req, res) => {
  const user = await userService.getMe(req.user.id);
  res.status(httpStatus.OK).json({ success: true, data: user });
});

export const listUsers = catchAsync(async (req, res) => {
  const users = await userService.listUsers();
  res.status(httpStatus.OK).json({ success: true, data: users });
});

export default { getMe, listUsers };
