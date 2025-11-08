import * as dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;
const DB_NAME = process.env.DB_NAME;
const CORS_ORIGIN = process.env.CORS_ORIGIN;
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

export {
    PORT,
    DB_NAME,
    CORS_ORIGIN,
    USERNAME,
    PASSWORD
}