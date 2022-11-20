import { Model, INTEGER, FLOAT } from 'sequelize';
import db from '../..';

class Accounts extends Model {
  id!: number;

  balance!: number;
}

Accounts.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    balance: {
      type: FLOAT,
      allowNull: false,
      defaultValue: 100,
    },
  },
  {
    timestamps: false,
    underscored: true,
    sequelize: db,
    tableName: 'Accounts',
  },
);

export default Accounts;
