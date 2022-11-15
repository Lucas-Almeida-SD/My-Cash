import { Options } from 'sequelize';
import 'dotenv/config';

const {
  POSTGRE_SQL_USERNAME,
  POSTGRE_SQL_PASSWORD,
  POSTGRE_SQL_HOST,
  POSTGRE_SQL_DB,
  POSTGRE_SQL_PORT,
  NODE_ENV,
} = process.env;

const DB_NAME_SUFIX = (NODE_ENV) ? `-${NODE_ENV}` : '-dev';

const config: Options = {
  username: POSTGRE_SQL_USERNAME || 'postgres',
  password: POSTGRE_SQL_PASSWORD || 'password',
  host: POSTGRE_SQL_HOST || 'localhost',
  database: `${POSTGRE_SQL_DB || 'ng_cash'}${DB_NAME_SUFIX}`,
  port: Number(POSTGRE_SQL_PORT) || 5432,
  dialect: 'postgres',
};

export = config;
