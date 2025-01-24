import express from 'express';
import {
  fetchAllPrograms,
  fetchProgramById,
  createNewProgram,
  updateExistingProgram,
  deleteExistingProgram,
} from '../controllers/program.controller';
import { ensureAuthenticated } from '../middlewares/auth.middleware';
import { validateRequest } from '../middlewares/validateRequest.middleware';
import { filterValidationSchema } from '../validations/filter.validation';

const router = express.Router();

router.get(
  '/',
  validateRequest(filterValidationSchema, 'query'),
  ensureAuthenticated,
  fetchAllPrograms,
);
router.get('/:id', ensureAuthenticated, fetchProgramById);
router.post('/', ensureAuthenticated, createNewProgram);
router.put('/:id', ensureAuthenticated, updateExistingProgram);
router.delete('/:id', ensureAuthenticated, deleteExistingProgram);

export default router;
