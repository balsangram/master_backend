import express from "express";
import AppRouter from "./app.js"
import { PORT } from "./envConfig.js"
import { seeder } from "./seeder/index.js";
import { connectDB } from "./db/db.js";
const app = express();
app.use("/", AppRouter);

async function startServer() {
    try {
        await seeder()
        await connectDB()
        app.listen(PORT, () => {
            console.log(`Example app listening on port ${PORT}`);
        })
    } catch (error) {
        console.log("server startup failed", error)
    }
}

startServer()