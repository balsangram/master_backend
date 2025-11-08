import express from "express";
import cors from "cors";
import adminRoutes from "./modules/admin/admin.router.js";
import userRouter from "./modules/user/userAuth.router.js"

const app = express();

app.use(cors({ origin: true, credential: true }))

app.get('/', (req, res) => {
    res.send("Welcome to Hell")
})

app.use("/admin", adminRoutes);
app.use("/user", userRouter);
// app.use('/social',)

export default app;