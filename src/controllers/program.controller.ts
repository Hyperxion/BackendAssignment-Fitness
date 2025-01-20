import { Request, Response } from 'express';
import Exercise from '../models/exercise.model';
import Program from '../models/program.model';

// GET all programs
export const getPrograms = async (req: Request, res: Response) => {
  try {
    const programs = await Program.findAll();
    res.json(programs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST a new program
export const createProgram = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const program = await Program.create({ name });
    res.status(201).json(program);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET a specific program by ID (with exercises)
export const getProgramById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const program = await Program.findByPk(id, {
      include: [{ model: Exercise, as: 'exercises' }],
    });
    if (!program) return res.status(404).json({ error: 'Program not found' });
    res.json(program);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT to update a program
export const updateProgram = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const program = await Program.findByPk(id);
    if (!program) return res.status(404).json({ error: 'Program not found' });

    program.name = name;
    await program.save();
    res.json(program);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE a program
export const deleteProgram = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const program = await Program.findByPk(id);
    if (!program) return res.status(404).json({ error: 'Program not found' });

    await program.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
