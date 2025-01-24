import express from 'express';
import { ensureAuthenticated } from '../middlewares/auth.middleware';
import { getOwnProfile, getAllUsers } from '../controllers/user.controller';
import { validateRequest } from '../middlewares/validateRequest.middleware';
import { filterValidationSchema } from '../validations/filter.validation';

const router = express.Router();

router.get(
  '/',
  validateRequest(filterValidationSchema, 'query'),
  ensureAuthenticated,
  getAllUsers,
);
router.get('/profile', ensureAuthenticated, getOwnProfile);

export default router;
