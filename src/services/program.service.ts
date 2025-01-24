import Exercise from '../models/exercise.model';
import Program from '../models/program.model';
import { buildWhereClause } from '../utils/filterHelper';
import { paginate } from '../utils/paginationHelper';

// Get all programs
export const getAllPrograms = async (
  page: number,
  limit: number,
  filters: Record<string, any>,
  search?: string,
) => {
  const where = buildWhereClause(
    { ...filters, search },
    ['name', 'id'],
    'name',
  );

  return await paginate(
    Program,
    {
      where,
      include: [
        {
          model: Exercise,
          as: 'exercises',
          attributes: ['id', 'name', 'difficulty'],
        },
      ],

      attributes: ['id', 'name'],
    },
    page,
    limit,
  );
};

// Get a single program by ID
export const getProgramById = async (id: string) => {
  const program = await Program.findByPk(id, {
    include: [
      {
        model: Exercise,
        as: 'exercises',
        attributes: ['id', 'name', 'difficulty'],
      },
    ],
  });

  if (!program) {
    throw new Error('Program not found');
  }

  return program;
};

// Create a new program
export const createProgram = async (data: { name: string }) => {
  const { name } = data;
  const program = await Program.create({ name });
  return program;
};

// Update an existing program
export const updateProgram = async (
  id: string,
  updates: Partial<{ name: string }>,
) => {
  const program = await Program.findByPk(id);

  if (!program) {
    throw new Error('Program not found');
  }

  await program.update(updates);
  return program;
};

// Delete a program
export const deleteProgram = async (id: string) => {
  const program = await Program.findByPk(id);

  if (!program) {
    throw new Error('Program not found');
  }

  await program.destroy();
  return { message: 'Program deleted successfully' };
};
