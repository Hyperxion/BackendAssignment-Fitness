import express from 'express';
import programRoutes from './programs.route';
import exerciseRoutes from './exercises.route';
// import authRoutes from './auth.route';

const router = express.Router();

router.use('/programs', programRoutes);
router.use('/exercises', exerciseRoutes);
// router.use('/auth', authRoutes);

export default router;
