import { Request, Response } from 'express';
import Exercise from '../models/exercise.model';

// GET all exercises
export const getExercises = async (req: Request, res: Response) => {
  try {
    const exercises = await Exercise.findAll();
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST a new exercise
export const createExercise = async (req: Request, res: Response) => {
  try {
    const { name, difficulty, programID } = req.body;
    const exercise = await Exercise.create({ name, difficulty, programID });
    res.status(201).json(exercise);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET a specific exercise by ID
export const getExerciseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const exercise = await Exercise.findByPk(id);
    if (!exercise) return res.status(404).json({ error: 'Exercise not found' });
    res.json(exercise);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT to update an exercise
export const updateExercise = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, difficulty, programID } = req.body;
    const exercise = await Exercise.findByPk(id);
    if (!exercise) return res.status(404).json({ error: 'Exercise not found' });

    exercise.name = name;
    exercise.difficulty = difficulty;
    exercise.programID = programID;
    await exercise.save();
    res.json(exercise);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE an exercise
export const deleteExercise = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const exercise = await Exercise.findByPk(id);
    if (!exercise) return res.status(404).json({ error: 'Exercise not found' });

    await exercise.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
