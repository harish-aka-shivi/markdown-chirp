import dotenv from 'dotenv-safe'
dotenv.config({ allowEmptyValues: true });

export const DB_PORT = process.env.DB_PORT ? process.env.DB_PORT : '5432';;
export const PORT_INT = parseInt(DB_PORT, 10);
export const DB_HOST = process.env.DB_HOST;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;
export const JSON_WEB_SECRET_KEY = process.env.JSON_WEB_SECRET_KEY;

export const SERVER_PORT = parseInt(process.env.PORT ? process.env.PORT : '4000', 10);

console.log({
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME
})