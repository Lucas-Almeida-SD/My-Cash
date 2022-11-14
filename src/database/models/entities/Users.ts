import { Model, INTEGER, STRING } from 'sequelize';
import db from '../..';

class Users extends Model {
  id!: number;

  username!: string;

  password!: string;

  accountId!: number;
}

Users.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    username: {
      type: STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: STRING,
      allowNull: false,
    },
    accountId: {
      type: INTEGER,
      allowNull: false,
      unique: true,
      field: 'account_id',
      references: {
        model: 'Accounts',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  },
  {
    timestamps: false,
    underscored: true,
    sequelize: db,
    tableName: 'Users',
  },
);

export default Users;
