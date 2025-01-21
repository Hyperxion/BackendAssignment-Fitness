import express from 'express';
import programRoutes from './programs.route';
import exerciseRoutes from './exercises.route';
import authRoutes from './auth.route';
import adminRoutes from './admin.routes';

const router = express.Router();

router.use('/programs', programRoutes);
router.use('/exercises', exerciseRoutes);
router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);

export default router;
