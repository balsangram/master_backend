import express from "express";
import { Port } from "./envConfig.js";
const app = express();

app.get('/', (req, res) => {
    res.send("hello", dotEnv)
})
console.log("hello", Port)

export default app;