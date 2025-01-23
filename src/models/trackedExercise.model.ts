import { DataTypes, Model, Sequelize } from 'sequelize';
import { TrackedExerciseI } from '../interfaces/models/trackedExerciseI';

export class TrackedExercise extends Model<TrackedExerciseI> {
  static initialize(sequelize: Sequelize) {
    TrackedExercise.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        exerciseId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        duration: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        startDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        endDate: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'tracked_exercises',
        modelName: 'TrackedExercise',
        timestamps: true,
      },
    );
  }
}

export default TrackedExercise;
