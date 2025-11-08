import * as dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;
const DB_NAME = process.env.DB_NAME;
const CORS_ORIGIN = process.env.CORS_ORIGIN;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

export {
    PORT,
    DB_NAME,
    CORS_ORIGIN,
    DB_USERNAME,
    DB_PASSWORD
}