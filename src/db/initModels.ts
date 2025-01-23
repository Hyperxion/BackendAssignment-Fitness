import Exercise from '../models/exercise.model';
import Program from '../models/program.model';
import TrackedExercise from '../models/trackedExercise.model';
import User from '../models/user.model';
import sequelize from './sequelize';

// Initialize all models and define associations
export const initModels = () => {
  Program.initialize(sequelize);
  Exercise.initialize(sequelize);
  User.initialize(sequelize);
  TrackedExercise.initialize(sequelize);

  Program.hasMany(Exercise, { foreignKey: 'programId', as: 'exercises' });
  Exercise.belongsTo(Program, { foreignKey: 'programId', as: 'program' });

  User.hasMany(TrackedExercise, {
    foreignKey: 'userId',
    as: 'trackedExercises',
  });

  TrackedExercise.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
  });
};
