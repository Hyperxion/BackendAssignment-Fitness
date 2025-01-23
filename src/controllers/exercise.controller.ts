import { Request, Response } from 'express';
import {
  createExercise,
  deleteExercise,
  getAllExercises,
  getExerciseById,
  removeTrackedExercise,
  updateExercise,
} from '../services/exercise.service';
import { errorResponse, successResponse } from '../utils/response';
import { getProgramById } from '../services/program.service';
import {
  endExerciseService,
  startExerciseService,
} from '../services/trackedExercise.service';

// Get all exercises
export const fetchAllExercises = async (req: Request, res: Response) => {
  try {
    const exercises = await getAllExercises();

    res.status(200).json(successResponse(exercises, 'List of exercises'));
  } catch (error: any) {
    res.status(500).json(errorResponse('Failed to get exercises'));
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
    const { name, difficulty, programId } = req.body;

    if (!name || !difficulty) {
      return res
        .status(400)
        .json(errorResponse('Name and difficulty are required.', 400));
    }

    const exercise = await createExercise({
      name,
      difficulty,
      programId,
    });

    res
      .status(201)
      .json(
        successResponse({ id: exercise.id }, 'Exercise created successfully'),
      );
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json(errorResponse('Failed to create exercise'));
  }
};

// Update an exercise
export const updateExistingExercise = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { programId } = req.body;
    const updates = req.body;
    // Find the exercise to ensure it exists
    const exercise = await getExerciseById(id);
    if (!exercise) {
      return res.status(404).json(errorResponse('Exercise not found.', 404));
    }

    // If a programId is provided, check if the program exists
    if (programId) {
      const program = await getProgramById(programId);
      if (!program) {
        return res.status(404).json(errorResponse('Program not found.', 404));
      }
    }

    await updateExercise(id, updates);

    res
      .status(201)
      .json(
        successResponse({ id: exercise.id }, 'Exercise updated successfully'),
      );
  } catch (error: any) {
    res.status(500).json(errorResponse('Failed to update exercise'));
  }
};

// Delete an exercise
export const removeExercise = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await deleteExercise(id);

    res
      .status(200)
      .json(successResponse({ id }, 'Exercise deleted successfully'));
  } catch (error: any) {
    res.status(500).json(errorResponse('Failed to delete exercise'));
  }
};

export const startExercise = async (req: Request, res: Response) => {
  try {
    const user = req.user as any;
    const { id: exerciseId } = req.params;

    const startDate = new Date();
    const trackedExercise = await startExerciseService(
      user.id,
      exerciseId,
      startDate,
    );

    res
      .status(201)
      .json(successResponse(trackedExercise, 'Exercise started successfully.'));
  } catch (error) {
    console.error('Error starting exercise:', error);
    res.status(500).json(errorResponse(error.message));
  }
};

export const endExercise = async (req: Request, res: Response) => {
  try {
    const user = req.user as any;
    const { trackedExerciseId } = req.params;

    const trackedExercise = await endExerciseService(
      user.id,
      trackedExerciseId,
    );

    res
      .status(200)
      .json(successResponse(trackedExercise, 'Exercise ended successfully.'));
  } catch (error) {
    console.error('Error ending exercise:', error);
    res.status(500).json(errorResponse(error.message));
  }
};

export const removeTrackedExerciseController = async (
  req: Request,
  res: Response,
) => {
  try {
    const user = req.user as any;
    const { trackedExerciseId } = req.params;

    if (!trackedExerciseId) {
      return res
        .status(400)
        .json(errorResponse('Tracked exercise ID is required.'));
    }

    await removeTrackedExercise(trackedExerciseId, user.id);

    res
      .status(200)
      .json(successResponse(null, 'Tracked exercise removed successfully.'));
  } catch (error) {
    console.error('Error removing tracked exercise:', error);
    res
      .status(500)
      .json(
        errorResponse(error.message || 'Failed to remove tracked exercise.'),
      );
  }
};
