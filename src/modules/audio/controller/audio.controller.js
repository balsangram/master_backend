import { ApiResponse } from "../../../utils/common/ApiResponse.js";
import { asyncHandler } from "../../../utils/common/asyncHandler.js";
import { audio_services } from "../services/audio.services.js";
const createTrack = asyncHandler(async (req, res) => {
    console.log("hi")
    if (!req.body) {
        return res.status(400).json(new ApiResponse(400, null, "req body is empty"))
    }
    const album = await audio_services.createAudio(req.body)
    return res.status(200).json(new ApiResponse(200, album, "created the audio"))
}
)

const getAllTracks = asyncHandler(async (req, res) => {
    const allTracks = await audio_services.getAllTracks()
    return res.status(200).json(new ApiResponse(200, allTracks, "all tracks fetched successfully"))
})

const likeUnlikeTrack = asyncHandler(async (req, res) => {
    const userId = req.user._id
    console.log("hi--track like")
    const { trackId } = req.params
    const data =await audio_services.likeUnlikeTrack({ userId, trackId })
    // console.log(data.message);
    
    return res.status(200).json(new ApiResponse(200, data, "success"))
})
export const audio_controller = {
    createTrack,
    getAllTracks,
    likeUnlikeTrack
}