import express from "express";
import { album_controller } from "../../controller/album.controller.js";
import { validateMultiple } from "../../../../middleware/validateMultiple.js";
import { createAlbumSchema } from "../../validators/album.validator.js";
const router = express.Router()

router.post('/create-album',validateMultiple({body:createAlbumSchema}), album_controller.create)
router.post('/get-all-albums', album_controller.getAllAlbums)
export default router;