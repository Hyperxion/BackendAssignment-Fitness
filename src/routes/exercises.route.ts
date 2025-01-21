import express from 'express';
import {
  fetchAllExercises,
  fetchExerciseById,
  createNewExercise,
  updateExistingExercise,
  removeExercise,
} from '../controllers/exercise.controller';

const router = express.Router();

router.get('/', fetchAllExercises); // Get all exercises
router.get('/:id', fetchExerciseById); // Get a single exercise by ID
router.post('/', createNewExercise); // Create a new exercise
router.put('/:id', updateExistingExercise); // Update an exercise
router.delete('/:id', removeExercise); // Delete an exercise

export default router;
