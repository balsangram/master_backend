import express from("express");
import artistRouter from "./audioRoutes/artist.router.js";
import audioSchema from "./audioRoutes/audio.router.js";
import likesRouter from "./audioRoutes/likes.router.js";
import playListRouter from "./audioRoutes/playlist.router.js";

const router = express.Router();

router.use("/artist", artistRouter);
router.use('/audio', audioSchema);
router.use('/likes', likesRouter);
router.use('/playlist', playListRouter);

export default router;