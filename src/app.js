import express from "express";
import cors from "cors";
import adminRoutes from "./modules/admin/router/admin.router.js";
import authRouter from "./modules/auth/router/auth.router.js"
import messageRouter from "./modules/message/router/messagerouter.js"
import musicRouter from "./modules/audio/routes/audio.router.js"
const app = express();

// parse json 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: true, credentials: true }))

app.get('/', (req, res) => {
    res.send("Welcome to master backend")
})

app.use("/admin", adminRoutes);
app.use("/auth", authRouter);
app.use("/message", messageRouter);
app.use("/music", musicRouter);

// app.use('/social',)

export default app;