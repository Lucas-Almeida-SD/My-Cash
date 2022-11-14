import { Options } from 'sequelize';
import 'dotenv/config';

const {
  POSTGRE_SQL_USERNAME,
  POSTGRE_SQL_PASSWORD,
  POSTGRE_SQL_HOST,
  POSTGRE_SQL_DB,
  POSTGRE_SQL_PORT,
} = process.env;

const config: Options = {
  username: POSTGRE_SQL_USERNAME || 'postgres',
  password: POSTGRE_SQL_PASSWORD || 'password',
  host: POSTGRE_SQL_HOST || 'localhost',
  database: POSTGRE_SQL_DB || 'ng_cash',
  port: Number(POSTGRE_SQL_PORT) || 5432,
  dialect: 'postgres',
};

export = config;
