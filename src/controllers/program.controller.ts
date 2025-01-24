import { Request, Response } from 'express';
import {
  getAllPrograms,
  getProgramById,
  createProgram,
  updateProgram,
  deleteProgram,
} from '../services/program.service';
import { errorResponse, successResponse } from '../utils/response';

// Get all programs
export const fetchAllPrograms = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search as string;
    const filters = {
      name: req.query.name,
      id: req.query.id,
    };

    const programs = await getAllPrograms(page, limit, filters, search);

    res
      .status(200)
      .json(successResponse(programs, req.t('success.operation_completed')));
  } catch (error: any) {
    console.error('Error fetching programs:', error);
    res.status(500).json(errorResponse(req.t('error.internal')));
  }
};

// Get a single program by ID
export const fetchProgramById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const program = await getProgramById(id);

    if (!program) {
      res.status(404).json(errorResponse(req.t('program.not_found')));
    }

    res
      .status(200)
      .json(successResponse(program, req.t('success.operation_completed')));
  } catch (error: any) {
    console.error('Error fetching program:', error);
    res.status(500).json(errorResponse(req.t('error.internal')));
  }
};

// Create a new program
export const createNewProgram = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res
        .status(400)
        .json(
          errorResponse(req.t('validation.required_field', { field: 'name' })),
        );
    }

    const program = await createProgram({ name });

    res.status(201).json(successResponse(program, req.t('program.created')));
  } catch (error: any) {
    console.error('Error creating program:', error);
    res.status(500).json(errorResponse(req.t('error.internal')));
  }
};

// Update an existing program
export const updateExistingProgram = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const name = req.body;

    if (!name) {
      return res
        .status(400)
        .json(
          errorResponse(req.t('validation.required_field', { field: 'name' })),
        );
    }

    const program = await updateProgram(id, { name });

    res.status(200).json(successResponse(program, req.t('program.updated')));
  } catch (error: any) {
    console.error('Error updating program:', error);
    res.status(500).json(errorResponse(req.t('error.internal')));
  }
};

// Delete a program
export const deleteExistingProgram = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await deleteProgram(id);

    if (!result) {
      res.status(404).json(errorResponse(req.t('program.not_found')));
    }

    res.status(200).json(successResponse(null, req.t('program.deleted')));
  } catch (error: any) {
    console.error('Error deleting programs:', error);
    res.status(500).json(errorResponse(req.t('error.internal')));
  }
};
