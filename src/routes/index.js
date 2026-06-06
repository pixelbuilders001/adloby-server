import { Router } from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';

const router = Router();

router.get('/health', (req, res) => res.json({ success: true, message: 'API is healthy' }));
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

export default router;
