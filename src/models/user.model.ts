import { DataTypes, Model, Sequelize } from 'sequelize';
import { UserI } from '../interfaces/models/userI';
import { ROLES } from '../utils/enums';

export class User extends Model<UserI> {
  static initialize(sequelize: Sequelize) {
    User.init(
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
        surname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        nickName: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
          validate: {
            isEmail: true,
          },
        },
        age: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        role: {
          type: DataTypes.ENUM(...Object.values(ROLES)),
          defaultValue: 'USER',
          allowNull: false,
        },
      },
      {
        paranoid: true,
        timestamps: true,
        sequelize,
        tableName: 'users',
        modelName: 'user',
      },
    );
  }
}
