import express from 'express';
import programRoutes from './programs.route';
import exerciseRoutes from './exercises.route';

const router = express.Router();

// Use sub-routers
router.use('/programs', programRoutes); // Base route for programs
router.use('/exercises', exerciseRoutes); // Base route for exercises

export default router;
