import express from "express";
import { authenticate } from "../../../../middleware/authMiddleware.js";
import { addNewArtists, deleteArtist, modifiedArtistDetaisl,getAllArtistsController } from "../../controller/artist.controller.js";
import { artistSchema } from "../../validators/artist.validator.js";
import { validateMultiple } from "../../../../middleware/validateMultiple.js";
const router = express.Router()

router.get("/get-all-artists",
    getAllArtistsController);
router.post("/",validateMultiple({body:artistSchema}) ,addNewArtists);
router.patch("/:artistId", modifiedArtistDetaisl);
router.delete("/:artistId", deleteArtist);

export default router;