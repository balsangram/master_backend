import express from "express";

const router = express.Router()
import { audio_controller } from "../../controller/audio.controller.js";
import { validateMultiple } from "../../../../middleware/validateMultiple.js"
import { trackSchema } from "../../validators/track.validator.js"
// router.get("/",displayAudio);
// router.post("/",)
router.post('/like/:trackId', audio_controller.likeUnlikeTrack)

router.post('/create-track', validateMultiple({ body: trackSchema }), audio_controller.createTrack)

router.get('/get-all-tracks', audio_controller.getAllTracks)

export default router;