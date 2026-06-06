import { Router } from 'express';
import userController from '../controllers/user.controller.js';
import auth from '../middlewares/auth.js';
import permit from '../middlewares/rbac.js';
import { ROLES } from '../constants/roles.js';

const router = Router();

router.get('/me', auth, userController.getMe);
router.get('/', auth, permit(ROLES.ADMIN), userController.listUsers);

export default router;
