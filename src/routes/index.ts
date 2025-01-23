import express from 'express';
import programRoutes from './programs.route';
import exerciseRoutes from './exercises.route';
import authRoutes from './auth.route';
import adminRoutes from './admin.routes';
import userRoutes from './user.route';

const router = express.Router();

router.use('/programs', programRoutes);
router.use('/exercises', exerciseRoutes);
router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/users', userRoutes);

export default router;
