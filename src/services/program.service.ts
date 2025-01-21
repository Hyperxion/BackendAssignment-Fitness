import Exercise from '../models/exercise.model';
import Program from '../models/program.model';

// Get all programs
export const getAllPrograms = async () => {
  return await Program.findAll({
    include: [
      {
        model: Exercise,
        as: 'exercises',
        attributes: ['id', 'name', 'difficulty'],
      },
    ],
  });
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
