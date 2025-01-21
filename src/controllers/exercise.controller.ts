import { Request, Response } from 'express';
import {
  createExercise,
  deleteExercise,
  getAllExercises,
  getExerciseById,
  updateExercise,
} from '../services/exercise.service';

// Get all exercises
export const fetchAllExercises = async (req: Request, res: Response) => {
  try {
    const exercises = await getAllExercises();
    res.status(200).json(exercises);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get an exercise by ID
export const fetchExerciseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const exercise = await getExerciseById(id);
    res.status(200).json(exercise);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

// Create a new exercise
export const createNewExercise = async (req: Request, res: Response) => {
  try {
    const { name, difficulty, programID } = req.body;
    const exercise = await createExercise({
      name,
      difficulty,
      programId: programID,
    });
    res.status(201).json(exercise);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Update an exercise
export const updateExistingExercise = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const exercise = await updateExercise(id, updates);
    res.status(200).json(exercise);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

// Delete an exercise
export const removeExercise = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await deleteExercise(id);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};
