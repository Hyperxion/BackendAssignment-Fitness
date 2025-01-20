import Exercise from '../models/exercise.model';
import Program from '../models/program.model';
import { EXERCISE_DIFFICULTY } from '../utils/enums';
import { initModels } from './initModels';
import sequelize from './sequelize';

export const seedDatabase = async () => {
  try {
    // Initialize database connection and models
    await sequelize.authenticate();
    console.log('Database connection established.');

    // Initialize models
    initModels();

    // Clear existing data
    await Program.destroy({ where: {} });
    await Exercise.destroy({ where: {} });

    // Seed Program data
    const program1 = await Program.create({
      name: 'Strength Training Program',
    });
    const program2 = await Program.create({
      name: 'Cardio Training Program',
    });

    console.log('Programs seeded.');

    // Seed Exercise data
    await Exercise.bulkCreate([
      {
        name: 'Push-ups',
        difficulty: EXERCISE_DIFFICULTY.MEDIUM,
        programID: program1.id,
      },
      {
        name: 'Squats',
        difficulty: EXERCISE_DIFFICULTY.HARD,
        programID: program1.id,
      },
      {
        name: 'Running',
        difficulty: EXERCISE_DIFFICULTY.EASY,
        programID: program2.id,
      },
      {
        name: 'Cycling',
        difficulty: EXERCISE_DIFFICULTY.MEDIUM,
        programID: program2.id,
      },
    ]);

    console.log('Exercises seeded.');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};
