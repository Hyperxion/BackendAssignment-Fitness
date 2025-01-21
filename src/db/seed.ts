import Exercise from '../models/exercise.model';
import Program from '../models/program.model';
import { EXERCISE_DIFFICULTY } from '../utils/enums';
import { initModels } from './initModels';
import sequelize from './sequelize';

export const seedDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established.');

    initModels();

    // Clear existing data
    await Program.destroy({ where: {} });
    await Exercise.destroy({ where: {} });

    // Seed Program data
    const program1 = await Program.create({
      id: '0191e0e2-32a8-4314-9d9f-400cf59db07f',
      name: 'Strength Training Program',
    });
    const program2 = await Program.create({
      id: 'ccd5f3e2-32ff-4a7d-84b4-dd37d3827b5d',
      name: 'Cardio Training Program',
    });

    console.log('Programs seeded.');

    // Seed Exercise data
    await Exercise.bulkCreate([
      {
        id: '977ac95a-e733-44ec-8882-9e3e3f0dcb28',
        name: 'Push-ups',
        difficulty: EXERCISE_DIFFICULTY.MEDIUM,
        programId: program1.id,
      },
      {
        name: 'Squats',
        difficulty: EXERCISE_DIFFICULTY.HARD,
        programId: program1.id,
      },
      {
        name: 'Running',
        difficulty: EXERCISE_DIFFICULTY.EASY,
        programId: program2.id,
      },
      {
        name: 'Cycling',
        difficulty: EXERCISE_DIFFICULTY.MEDIUM,
        programId: program2.id,
      },
    ]);

    console.log('Exercises seeded.');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};
