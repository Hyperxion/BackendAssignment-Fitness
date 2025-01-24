import express from 'express';
import {
  createNewExercise,
  removeExercise,
  updateExistingExercise,
} from '../controllers/exercise.controller';
import { ensureAdmin } from '../middlewares/auth.middleware';
import {
  getAllUsers,
  getUserDetails,
  updateUser,
} from '../controllers/user.controller';

const router = express.Router();

// Exercise management
router.post('/exercises', ensureAdmin, createNewExercise);
router.put('/exercises/:id', ensureAdmin, updateExistingExercise);
router.delete('/exercises/:id', ensureAdmin, removeExercise);

// User management
router.get('/users', ensureAdmin, getAllUsers); // Get all users
router.get('/users/:id', ensureAdmin, getUserDetails); // Get user details
router.put('/users/:id', ensureAdmin, updateUser); // Update a user

export default router;
