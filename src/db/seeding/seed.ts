import { initModels } from '../../models';
import Exercise from '../../models/exercise.model';
import Program from '../../models/program.model';
import User from '../../models/user.model';
import { EXERCISE_DIFFICULTY } from '../../utils/enums';
import sequelize from '../sequelize';
import {
  exercisesNames,
  programsNames,
  userFirstNames,
  userLastNames,
} from './metadata';
import { generateExercises, generatePrograms, generateUsers } from './util';

export const seedDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established.');

    initModels(sequelize);

    // Clear existing data
    await Program.destroy({ where: {} });
    await Exercise.destroy({ where: {} });
    await User.destroy({ where: {} });

    const users = generateUsers(userFirstNames, userLastNames, 20);
    const programs = generatePrograms(programsNames);
    const exercises = generateExercises(exercisesNames, programs);

    await User.bulkCreate(users);
    console.log('Users seeded.');

    await Program.bulkCreate(programs);
    console.log('Programs seeded.');

    await Exercise.bulkCreate(exercises);
    console.log('Exercises seeded.');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};
