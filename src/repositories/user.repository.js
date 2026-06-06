import User from '../models/user.model.js';

export const createUser = (payload) => User.create(payload);
export const findByEmail = (email, includePassword = false) => {
  const query = User.findOne({ email });
  if (includePassword) query.select('+password +refreshTokenHash');
  return query;
};
export const findById = (id) => User.findById(id);
export const findByIdWithSecrets = (id) => User.findById(id).select('+refreshTokenHash');
export const listUsers = () => User.find().sort({ createdAt: -1 });
export const updateRefreshTokenHash = (userId, refreshTokenHash) =>
  User.findByIdAndUpdate(userId, { refreshTokenHash }, { new: true });

export default {
  createUser,
  findByEmail,
  findById,
  findByIdWithSecrets,
  listUsers,
  updateRefreshTokenHash,
};
