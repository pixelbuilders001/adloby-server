import { Router } from 'express';
import authController from '../controllers/auth.controller.js';
import validate from '../middlewares/validate.js';
import authValidator from '../validators/auth.validator.js';

const router = Router();

router.post('/register', validate(authValidator.register), authController.register);
router.post('/login', validate(authValidator.login), authController.login);
router.post('/refresh-token', validate(authValidator.refreshToken), authController.refreshToken);

export default router;
