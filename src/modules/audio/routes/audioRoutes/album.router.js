import express from "express";
import { album_controller } from "../../controller/album.controller.js";
import { validateMultiple } from "../../../../middleware/validateMultiple.js";
import { createAlbumSchema } from "../../validators/album.validator.js";
import { upload } from "../../../../middleware/upload.middleware.js";
const router = express.Router()

router.post('/create-album', upload.single('coverImg'), validateMultiple({ body: createAlbumSchema }), album_controller.create)
router.get('/get-all-albums', album_controller.getAllAlbums)
export default router;  