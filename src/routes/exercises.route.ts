import express from 'express';
import {
  fetchAllExercises,
  fetchExerciseById,
  createNewExercise,
  updateExistingExercise,
  removeExercise,
} from '../controllers/exercise.controller';
import { ensureAuthenticated } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', ensureAuthenticated, fetchAllExercises);
router.get('/:id', ensureAuthenticated, fetchExerciseById);

export default router;
