import mongoose from "mongoose"
const locationSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["Point"],
        default: "Point",
    },
    coordinates: {
        type: [Number], // [lng, lat]
        required: true,
    },


}, {
    timestamps: true
})
export const location=mongoose.model("location",locationSchema)