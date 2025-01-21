import { DataTypes, Model, Sequelize } from 'sequelize';
import { EXERCISE_DIFFICULTY } from '../utils/enums';
import { ExerciseI } from '../interfaces/models/exerciseI';
import Program from './program.model';

export class Exercise extends Model<ExerciseI> {
  static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        difficulty: {
          type: DataTypes.ENUM(...Object.values(EXERCISE_DIFFICULTY)),
          allowNull: false,
        },
        programId: {
          type: DataTypes.UUID,
          allowNull: true,
        },
      },
      {
        paranoid: true,
        timestamps: true,
        sequelize,
        tableName: 'exercises',
        modelName: 'exercise',
      },
    );
  }
}

export default Exercise;
