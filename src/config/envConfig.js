import * as dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME;
const CORS_ORIGIN = process.env.CORS_ORIGIN;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES;

export {
    PORT,
    MONGODB_URI,
    DB_NAME,
    CORS_ORIGIN,
    DB_USERNAME,
    DB_PASSWORD,
    JWT_SECRET,
    JWT_REFRESH_SECRET,
    JWT_EXPIRES
}