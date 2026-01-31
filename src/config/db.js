import mongoose from "mongoose";
import { DB_NAME, MONGODB_URI } from "./envConfig.js";

// const MONGODB_URI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.f6kvte0.mongodb.net/${DB_NAME}?appName=Cluster0`;
const MONGODB = `${MONGODB_URI}${DB_NAME}?appName=Cluster0`;


export async function connectDB() {
    try {
        console.log("📡 Connecting to local MongoDB...");
        const conn = await mongoose.connect(MONGODB, {
            serverSelectionTimeoutMS: 10000, // optional: waits 10s before error
        });
        console.log(`MongoDB connected at ${conn.connection.host}:${conn.connection.port}`);
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
}
