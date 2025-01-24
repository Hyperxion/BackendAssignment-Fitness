import { Request, Response } from 'express';
import {
  getAllPrograms,
  getProgramById,
  createProgram,
  updateProgram,
  deleteProgram,
  getPaginatedPrograms,
} from '../services/program.service';
import { errorResponse, successResponse } from '../utils/response';
import { getExerciseById } from '../services/exercise.service';

// Get all programs
export const fetchAllPrograms = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const programs = await getPaginatedPrograms(page, limit);

    res.status(200).json(successResponse(programs, 'List of programs'));
  } catch (error: any) {
    res.status(500).json(errorResponse('Failed to fetch programs'));
  }
};

// Get a single program by ID
export const fetchProgramById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const program = await getProgramById(id);

    res.status(200).json(program);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

// Create a new program
export const createNewProgram = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res
        .status(400)
        .json(errorResponse('Program name is required.', 400));
    }

    const program = await createProgram({ name });
    res
      .status(201)
      .json(
        successResponse({ id: program.id }, 'Program created successfully'),
      );
  } catch (error: any) {
    res.status(500).json(errorResponse('Failed to create program', 400));
  }
};

// Update an existing program
export const updateExistingProgram = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const program = await updateProgram(id, updates);
    res
      .status(201)
      .json(
        successResponse({ id: program.id }, 'Program updated successfully'),
      );
  } catch (error: any) {
    res.status(500).json(errorResponse('Failed to update program'));
  }
};

/**
 * Add/Changes exercise to program assignment
 */
export const addExerciseToProgram = async (req: Request, res: Response) => {
  try {
    const { programId, exerciseId } = req.params;

    const program = await getProgramById(programId);
    if (!program) {
      return res.status(404).json(errorResponse('Program not found.'));
    }

    const exercise = await getExerciseById(exerciseId);
    if (!exercise) {
      return res.status(404).json(errorResponse('Exercise not found.'));
    }

    exercise.programId = programId; // Associate the exercise with the program
    await exercise.save();

    res
      .status(200)
      .json(successResponse(exercise, 'Exercise added to program.'));
  } catch (error) {
    console.error('Error adding exercise to program:', error);
    res.status(500).json(errorResponse('Failed to add exercise to program.'));
  }
};

// Delete a program
export const deleteExistingProgram = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await deleteProgram(id);
    res
      .status(200)
      .json(successResponse({ id }, 'Program deleted successfully'));
  } catch (error: any) {
    res.status(500).json(errorResponse('Failed to delete program'));
  }
};
