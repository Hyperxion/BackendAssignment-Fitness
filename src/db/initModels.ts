import Exercise from '../models/exercise.model';
import Program from '../models/program.model';
import { User } from '../models/user.model';
import sequelize from './sequelize';

// Initialize all models and define associations
export const initModels = () => {
  // Initialize models with sequelize instance
  Program.initialize(sequelize);
  Exercise.initialize(sequelize);
  User.initialize(sequelize);

  // Define associations
  Program.hasMany(Exercise, { foreignKey: 'programID', as: 'exercises' });
  Exercise.belongsTo(Program, { foreignKey: 'programID', as: 'program' });
};
