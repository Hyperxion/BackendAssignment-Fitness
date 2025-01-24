import { ExerciseI } from '../interfaces/models/exerciseI';
import Exercise from '../models/exercise.model';
import Program from '../models/program.model';
import TrackedExercise from '../models/trackedExercise.model';
import { EXERCISE_DIFFICULTY } from '../utils/enums';
import { buildWhereClause } from '../utils/filterHelper';
import { paginate } from '../utils/paginationHelper';

// Fetch all exercises
export const getAllExercises = async (
  page: number,
  limit: number,
  filters: Record<string, any>,
) => {
  const where = buildWhereClause(filters, ['difficulty', 'programId', 'name']);

  return await paginate(
    Exercise,
    { where, attributes: ['id', 'name', 'difficulty', 'programId'] },
    page,
    limit,
  );
};

// Fetch a single exercise by ID
export const getExerciseById = async (id: string) => {
  const exercise = await Exercise.findByPk(id, {
    include: [
      {
        model: Program,
        as: 'program',
        attributes: ['id', 'name'],
      },
    ],
  });

  if (!exercise) {
    throw new Error('Exercise not found');
  }

  return exercise;
};

// Create a new exercise
export const createExercise = async (data: {
  name: string;
  difficulty: EXERCISE_DIFFICULTY;
  programId: string;
}) => {
  let exercise: ExerciseI = {
    programId: data.programId,
    difficulty: data.difficulty,
    name: data.name,
  };

  // Validate that the program exists
  if (exercise.programId) {
    const program = await Program.findByPk(exercise.programId);
    if (!program) {
      exercise.programId = null;
    }
  }

  return await Exercise.create(exercise);
};

// Update an existing exercise
export const updateExercise = async (
  id: string,
  updates: Partial<{
    name: string;
    difficulty: 'easy' | 'medium' | 'hard';
    programId: string;
  }>,
) => {
  const exercise = await Exercise.findByPk(id);

  if (!exercise) {
    throw new Error('Exercise not found');
  }

  // If programId is being updated, ensure the new program exists
  if (updates.programId) {
    const program = await Program.findByPk(updates.programId);
    if (!program) {
      throw new Error('Program does not exist');
    }
  }

  // Update exercise fields
  await exercise.update(updates);

  return exercise;
};

// Delete an exercise
export const deleteExercise = async (id: string) => {
  const exercise = await Exercise.findByPk(id);

  if (!exercise) {
    throw new Error('Exercise not found');
  }

  // Delete the exercise
  await exercise.destroy();

  return { message: 'Exercise deleted successfully' };
};

export const removeTrackedExercise = async (
  trackedExerciseId: string,
  userId: string,
): Promise<void> => {
  const trackedExercise = await TrackedExercise.findOne({
    where: {
      id: trackedExerciseId,
      userId,
    },
  });

  if (!trackedExercise) {
    throw new Error('Tracked exercise not found.');
  }

  // Remove the tracked exercise
  await trackedExercise.destroy();
};
