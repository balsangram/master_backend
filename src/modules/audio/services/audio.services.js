import mongoose from "mongoose";
import { audio_repo } from "../repository/audio.repository.js";
const createAudio = async (payload) => {
    return await audio_repo.createTrackRepo(payload);
}
const getAllTracks = async () => {
    return await audio_repo.getAllTracksRepo()
}
const getTrackById = async (trackId) => {
    return await audio_repo.getTrackByIdRepo(trackId)
}
const likeUnlikeTrack = async ({ userId, trackId }) => {
    console.log("hi2-serice");
    console.log("userId,trackId", userId, trackId);
    const trackObjectId = new mongoose.Types.ObjectId(trackId);
    const existingLiked = await audio_repo.findLikedTRack({ userId, likesSong:trackObjectId })
    console.log("existingLiked", existingLiked);

    if (existingLiked) {
        console.log("unlike");

        await audio_repo.unlikeTrack(existingLiked._id)
        return {
            liked: false,
            message: "Track unliked successfully",
        };
    }

    await audio_repo.createTrackLikeRepo({ userId, trackId })
    return {
        liked: true,
        message: "Track liked successfully",
    };
}

export const audio_services = {
    createAudio,
    getAllTracks,
    getTrackById,
    likeUnlikeTrack
}