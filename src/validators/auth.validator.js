import Joi from 'joi';

export const register = Joi.object({
  name: Joi.string().min(2).max(80).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const refreshToken = Joi.object({
  refreshToken: Joi.string().required(),
});

export default { register, login, refreshToken };
