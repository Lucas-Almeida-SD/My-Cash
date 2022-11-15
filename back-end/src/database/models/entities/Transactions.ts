import {
  Model, INTEGER, FLOAT, DATE, NOW,
} from 'sequelize';
import db from '../..';

class Transactions extends Model {
  id!: number;

  debitedAccountId!: number;

  creditedAccountId!: number;

  value!: number;

  createdAt!: Date;
}

Transactions.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    debitedAccountId: {
      type: INTEGER,
      allowNull: false,
      field: 'debited_account_id',
      references: {
        model: 'Accounts',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    creditedAccountId: {
      type: INTEGER,
      allowNull: false,
      field: 'credited_account_id',
      references: {
        model: 'Accounts',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    value: {
      type: FLOAT,
      allowNull: false,
    },
    createdAt: {
      type: DATE,
      allowNull: false,
      field: 'created_at',
      defaultValue: NOW,
    },
  },
  {
    timestamps: false,
    underscored: true,
    sequelize: db,
    tableName: 'Transactions',
  },
);

export default Transactions;
