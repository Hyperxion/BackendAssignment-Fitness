import express from 'express';
import {
  getPrograms,
  createProgram,
  getProgramById,
  updateProgram,
  deleteProgram,
} from '../controllers/program.controller';

const router = express.Router();

router.get('/', getPrograms);
router.post('/', createProgram);
router.get('/:id', getProgramById);
router.put('/:id', updateProgram);
router.delete('/:id', deleteProgram);

export default router;
