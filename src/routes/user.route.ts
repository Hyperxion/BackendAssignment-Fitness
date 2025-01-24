import express from 'express';
import { ensureAuthenticated } from '../middlewares/auth.middleware';
import { getOwnProfile, getAllUsers } from '../controllers/user.controller';

const router = express.Router();

router.get('/', ensureAuthenticated, getAllUsers);
router.get('/profile', ensureAuthenticated, getOwnProfile);

export default router;
