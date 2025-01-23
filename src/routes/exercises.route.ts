import express from 'express';
import {
  fetchAllExercises,
  fetchExerciseById,
  endExercise,
  startExercise,
} from '../controllers/exercise.controller';
import { ensureAuthenticated } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', ensureAuthenticated, fetchAllExercises);
router.get('/:id', ensureAuthenticated, fetchExerciseById);

router.post('/:id/start', ensureAuthenticated, startExercise);
router.patch('/end/:trackedExerciseId', ensureAuthenticated, endExercise);

router;

export default router;
