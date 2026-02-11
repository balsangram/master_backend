import mongoose from "mongoose";
const albumSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        audio: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Audio'
        }
        ],
        artist: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Artist'
        },
        genre: {
            type: String,
        },
        coverImg: {
            type: String
        },
        releaseDate: {
            type: Date,
          
        }

    }
)
export const Album = mongoose.model('Album', albumSchema);