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
router.post('/', ensureAuthenticated, createNewExercise);
router.put('/:id', ensureAuthenticated, updateExistingExercise);
router.delete('/:id', ensureAuthenticated, removeExercise);

export default router;
