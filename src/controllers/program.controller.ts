import { Request, Response } from 'express';
import {
  getAllPrograms,
  getProgramById,
  createProgram,
  updateProgram,
  deleteProgram,
} from '../services/program.service';

// Get all programs
export const getPrograms = async (req: Request, res: Response) => {
  try {
    const programs = await getAllPrograms();
    res.status(200).json(programs);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single program by ID
export const getProgram = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const program = await getProgramById(id);
    res.status(200).json(program);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

// Create a new program
export const createProgramHandler = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const program = await createProgram({ name });
    res.status(201).json(program);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Update an existing program
export const updateProgramHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const program = await updateProgram(id, updates);
    res.status(200).json(program);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

// Delete a program
export const deleteProgramHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await deleteProgram(id);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};
