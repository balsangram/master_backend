import mongoose from "mongoose";

const playListSchema = new mongoose.Schema({
    coverImg: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    audio: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Audio"
    }],
    songCount: {
        type: number
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    isCollaborative: {
        type: Boolean
    },

    followersCount: {
        type: number
    },
    isActive: {
        type: Boolean,
        default: false

    }
})

export const PlayList = mongoose.model("PlayList", playListSchema);
