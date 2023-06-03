import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class UsersModel extends Model {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

UsersModel.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING(30),
    allowNull: false,
  },
  role: {
    type: STRING(30),
    allowNull: false,
  },
  email: {
    type: STRING(30),
    allowNull: false,
  },
  password: {
    type: STRING(30),
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default UsersModel;
