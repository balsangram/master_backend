import express from "express";
import AppRouter from "./app.js"
import { PORT } from "./envConfig.js"
const app = express();
app.use("/", AppRouter);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
})