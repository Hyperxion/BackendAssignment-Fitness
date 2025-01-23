import * as fs from 'fs';
import * as path from 'path';
import Program from './program.model';
import Exercise from './exercise.model';
import User from './user.model';
import TrackedExercise from './trackedExercise.model';
import { Sequelize } from 'sequelize';

// Export all models
export const models = {
  Program,
  Exercise,
  User,
  TrackedExercise,
};

// Function to dynamically count files in the models directory
const countModelFiles = () => {
  const modelsPath = path.join(__dirname);
  return fs
    .readdirSync(modelsPath)
    .filter((file) => file.endsWith('.model.ts') || file.endsWith('.model.js'))
    .length;
};

// Initialize all models and validate
export const initModels = (sequelize: Sequelize) => {
  const modelFileCount = countModelFiles();
  const modelCount = Object.keys(models).length;

  if (modelFileCount !== modelCount) {
    throw new Error(
      `Model count mismatch: ${modelFileCount} files found in the "models" folder, but ${modelCount} models are registered in "models/index.ts".`,
    );
  }

  // Initialize each model
  Object.values(models).forEach((model) => {
    if (typeof model.initialize === 'function') {
      model.initialize(sequelize);
    }
  });

  // Define associations
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

  TrackedExercise.belongsTo(Exercise, {
    foreignKey: 'exerciseId',
    as: 'exercise',
  });
  Exercise.hasMany(TrackedExercise, {
    foreignKey: 'exerciseId',
    as: 'trackedExercises',
  });

  console.log('All models initialized successfully!');
};
