import userRepo from '../repositories/user.repository.js';

export const getMe = (userId) => userRepo.findById(userId);
export const listUsers = () => userRepo.listUsers();

export default { getMe, listUsers };
