import { ConnectionOptions } from 'typeorm'
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER, PORT_INT } from './envVariables';

export const ENV = process.env.NODE_ENV === 'production' ? 'production' : 'development';

export const TYPEORMConfig: ConnectionOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: PORT_INT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  dropSchema: false,
  synchronize: true,
  cache: true,
  logging: false,
  entities: [`${__dirname}/../models/**/*`],
  };
