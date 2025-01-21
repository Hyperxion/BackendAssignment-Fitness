import express from 'express';
import {
  getPrograms,
  getProgram,
  createProgramHandler,
  updateProgramHandler,
  deleteProgramHandler,
} from '../controllers/program.controller';

const router = express.Router();

// Get all programs
router.get('/', getPrograms);

// Get a single program by ID
router.get('/:id', getProgram);

// Create a new program
router.post('/', createProgramHandler);

// Update an existing program
router.put('/:id', updateProgramHandler);

// Delete a program
router.delete('/:id', deleteProgramHandler);

export default router;
