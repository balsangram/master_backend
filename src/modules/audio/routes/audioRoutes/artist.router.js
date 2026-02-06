import express from "express";
import { authenticate } from "../../../../middleware/authMiddleware.JS";
import { addNewArtists, deleteArtist, displayArtists, modifiedArtistDetaisl } from "../../controller/artist.controller";

const router = express.Router()

router.get("/",
    authenticate(["user", "admin"]),
    displayArtists);
router.post("/", addNewArtists);
router.patch("/:artistId", modifiedArtistDetaisl);
router.delete("/:artistId", deleteArtist);

export default router;