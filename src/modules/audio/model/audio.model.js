import mongoose from "mongoose";

const audioSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    img: {
      type: String,
      required: false
    },
    songUrl: {
      type: String,
      required: true
    },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist"
    },
    isActive: {
      type: Boolean,
      default: true
    }

  }
)

export const Audio = mongoose.model('Audio', audioSchema);