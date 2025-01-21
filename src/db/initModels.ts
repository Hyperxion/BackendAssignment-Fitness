import Exercise from '../models/exercise.model';
import Program from '../models/program.model';
import { User } from '../models/user.model';
import sequelize from './sequelize';

// Initialize all models and define associations
export const initModels = () => {
  Program.initialize(sequelize);
  Exercise.initialize(sequelize);
  User.initialize(sequelize);

  Program.hasMany(Exercise, { foreignKey: 'programId', as: 'exercises' });
  Exercise.belongsTo(Program, { foreignKey: 'programId', as: 'program' });
};
