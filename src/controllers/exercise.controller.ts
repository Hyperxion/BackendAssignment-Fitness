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
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search as string;

    const filters = {
      difficulty: req.query.difficulty,
      programId: req.query.programId,
      name: req.query.name,
    };

    const exercises = await getAllExercises(page, limit, filters, search);

    res
      .status(200)
      .json(successResponse(exercises, req.t('success.operation_completed')));
  } catch (error: any) {
    console.error('Error fetching exercises:', error);
    res.status(500).json(errorResponse(req.t('error.internal')));
  }
};

// Get an exercise by ID
export const fetchExerciseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const exercise = await getExerciseById(id);

    if (!exercise) {
      res.status(404).json(errorResponse(req.t('exercise.not_found')));
    }

    res
      .status(200)
      .json(successResponse(exercise, req.t('success.operation_completed')));
  } catch (error: any) {
    console.error('Error fetching exercise:', error);
    res.status(500).json(errorResponse(req.t('error.internal')));
  }
};

// Create a new exercise
export const createNewExercise = async (req: Request, res: Response) => {
  try {
    const { name, difficulty, programId } = req.body;

    if (!name) {
      return res
        .status(400)
        .json(
          errorResponse(req.t('validation.required_field', { field: 'name' })),
        );
    }
    if (!difficulty) {
      return res
        .status(400)
        .json(
          errorResponse(
            req.t('validation.required_field', { field: 'difficulty' }),
          ),
        );
    }
    if (!programId) {
      return res
        .status(400)
        .json(
          errorResponse(
            req.t('validation.required_field', { field: 'programId' }),
          ),
        );
    }

    const exercise = await createExercise({
      name,
      difficulty,
      programId,
    });

    res.status(201).json(successResponse(exercise, req.t('exercise.created')));
  } catch (error: any) {
    console.error('Error creating exercise:', error);
    res.status(500).json(errorResponse(req.t('error.internal')));
  }
};

// Update an exercise
export const updateExistingExercise = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, difficulty, programId } = req.body;
    const exercise = await getExerciseById(id);

    if (!name) {
      return res
        .status(400)
        .json(
          errorResponse(req.t('validation.required_field', { field: 'name' })),
        );
    }
    if (!difficulty) {
      return res
        .status(400)
        .json(
          errorResponse(
            req.t('validation.required_field', { field: 'difficulty' }),
          ),
        );
    }
    if (!programId) {
      return res
        .status(400)
        .json(
          errorResponse(
            req.t('validation.required_field', { field: 'programId' }),
          ),
        );
    }

    if (!exercise) {
      return res.status(404).json(errorResponse(req.t('exercise.not_found')));
    }

    await updateExercise(id, { name, difficulty, programId });

    res.status(200).json(successResponse(exercise, req.t('exercise.updated')));
  } catch (error: any) {
    console.error('Error updating exercise:', error);
    res.status(500).json(errorResponse(req.t('error.internal')));
  }
};

// Delete an exercise
export const removeExercise = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await deleteExercise(id);

    if (!result) {
      return res.status(404).json(errorResponse(req.t('exercise.not_found')));
    }

    res.status(200).json(successResponse(null, req.t('exercise.deleted')));
  } catch (error: any) {
    console.error('Error deleting exercise:', error);
    res.status(500).json(errorResponse(req.t('error.internal')));
  }
};

export const startExercise = async (req: Request, res: Response) => {
  try {
    const user = req.user as any;
    const { id } = req.params;
    const exercise = await getExerciseById(id);

    if (!exercise) {
      return res.status(404).json(errorResponse(req.t('exercise.not_found')));
    }

    const startDate = new Date();
    const trackedExercise = await startExerciseService(user.id, id, startDate);

    res
      .status(201)
      .json(successResponse(trackedExercise, req.t('exercise.started')));
  } catch (error) {
    console.error('Error starting exercise:', error);
    res.status(500).json(errorResponse(req.t('error.internal')));
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
      .json(successResponse(trackedExercise, req.t('trackedExercise.ended')));
  } catch (error) {
    console.error('Error ending exercise:', error);
    res.status(500).json(errorResponse(req.t('error.internal')));
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
        .json(
          errorResponse(
            req.t('validation.required_field', { field: 'trackedExerciseId' }),
          ),
        );
    }
    const trackedExercise = await removeTrackedExercise(
      trackedExerciseId,
      user.id,
    );

    res
      .status(200)
      .json(successResponse(trackedExercise, req.t('trackedExercise.removed')));
  } catch (error) {
    console.error('Error removing tracked exercise:', error);
    res.status(500).json(errorResponse(req.t('error.internal')));
  }
};
