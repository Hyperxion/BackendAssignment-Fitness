import express from 'express';
import {
  getExercises,
  createExercise,
  getExerciseById,
  updateExercise,
  deleteExercise,
} from '../controllers/exercise.controller';

const router = express.Router();

router.get('/', getExercises);
router.post('/', createExercise);
router.get('/:id', getExerciseById);
router.put('/:id', updateExercise);
router.delete('/:id', deleteExercise);

export default router;
