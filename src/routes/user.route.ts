import express from 'express';
import { ensureAuthenticated } from '../middlewares/auth.middleware';
import {
  getUsersBasicInfo,
  getOwnProfile,
} from '../controllers/user.controller';

const router = express.Router();

router.get('/', ensureAuthenticated, getUsersBasicInfo);
router.get('/profile', ensureAuthenticated, getOwnProfile);

export default router;
