import express from "express";
import AppRouter from "./app.js"
const app = express();
const PORT = process.env.PORT || 5000;

app.use("/", AppRouter);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
})