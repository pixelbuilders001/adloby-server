import bcrypt from 'bcryptjs';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/token.js';
import userRepo from '../repositories/user.repository.js';

const buildTokens = async (user) => {
  const payload = { sub: user.id, role: user.role };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);
  const refreshTokenHash = await bcrypt.hash(refreshToken, 12);
  await userRepo.updateRefreshTokenHash(user.id, refreshTokenHash);
  return { accessToken, refreshToken };
};

export const register = async (payload) => {
  const existingUser = await userRepo.findByEmail(payload.email);
  if (existingUser) throw new ApiError(httpStatus.CONFLICT, 'Email already exists');
  const user = await userRepo.createUser(payload);
  const tokens = await buildTokens(user);
  return { user, tokens };
};

export const login = async ({ email, password }) => {
  const user = await userRepo.findByEmail(email, true);
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid email or password');
  }
  const tokens = await buildTokens(user);
  return { user, tokens };
};

export const refreshToken = async (token) => {
  let payload;
  try {
    payload = verifyRefreshToken(token);
  } catch {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid refresh token');
  }

  const user = await userRepo.findByIdWithSecrets(payload.sub);
  if (!user || !user.refreshTokenHash) throw new ApiError(httpStatus.UNAUTHORIZED, 'Refresh token not found');

  const matches = await bcrypt.compare(token, user.refreshTokenHash);
  if (!matches) throw new ApiError(httpStatus.UNAUTHORIZED, 'Refresh token reused or expired');

  const tokens = await buildTokens(user);
  return { user, tokens };
};

export default { register, login, refreshToken };
