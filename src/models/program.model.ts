import { DataTypes, Model, Sequelize } from 'sequelize';
import { ProgramI } from '../interfaces/models/programI';
import Exercise from './exercise.model';

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

export default Program;
