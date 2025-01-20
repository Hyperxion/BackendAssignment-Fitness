import { DataTypes, Model, Sequelize } from 'sequelize';
import { ProgramI } from '../interfaces/models/programI';
import Exercise from './exercise.model';

// Define the Program model
export class Program extends Model<ProgramI> {
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
        //exercises: {},
      },
      {
        paranoid: true,
        timestamps: true,
        sequelize,
        tableName: 'programs',
        modelName: 'program',
      },
    );
  }
}

// Exercise.belongsTo(Program, { foreignKey: 'programID', as: 'program' });
// Program.hasMany(Exercise, { foreignKey: 'programID', as: 'exercises' });

export default Program;
