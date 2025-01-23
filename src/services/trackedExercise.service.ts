import { TrackedExercise } from '../models/trackedExercise.model';
import { Exercise } from '../models/exercise.model';

export const startExerciseService = async (
  userId: string,
  exerciseId: string,
  startDate: Date,
) => {
  const exercise = await Exercise.findByPk(exerciseId);
  if (!exercise) {
    throw new Error('Exercise not found.');
  }

  const trackedExercise = await TrackedExercise.create({
    userId,
    exerciseId,
    startDate,
    endDate: null,
    duration: 0,
  });

  return trackedExercise;
};

export const endExerciseService = async (
  userId: string,
  trackedExerciseId: string,
) => {
  const trackedExercise = await TrackedExercise.findOne({
    where: {
      id: trackedExerciseId,
      userId,
    },
  });

  if (!trackedExercise) {
    throw new Error('Tracked exercise not found.');
  }

  if (trackedExercise.endDate) {
    throw new Error('Exercise has already been completed.');
  }

  const endDate = new Date();
  const duration = Math.round(
    (endDate.getTime() - new Date(trackedExercise.startDate).getTime()) / 1000,
  );

  if (duration <= 0) {
    throw new Error('Invalid duration calculated.');
  }

  await trackedExercise.update({
    endDate,
    duration,
  });

  return trackedExercise;
};
