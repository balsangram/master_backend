import express from "express";
import AppRouter from "./app.js"
import { PORT } from "./config/envConfig.js"
import { seeder } from "./seeder/index.js";
import {createServer} from "http"
import { connectDB } from "./config/db.js";

const app = express();
const server = createServer(app);
app.use("/", AppRouter);

async function startServer() {
    try {
        await connectDB()
            // ⚠️ Seeder best practice
    if (process.env.NODE_ENV !== "production") {
        await seeder()
    }
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        })
    } catch (error) {
        console.log("server startup failed", error)
    }
}

startServer()