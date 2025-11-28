import mongoose from "mongoose";
const options = {
    discriminatorKey: "role",
    timestamps: true
}
const BaseAuthSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: false,
            trim: true
        },
        phone: {
            type: String,
            required: false,
            trim: true
        },
        email: {
            type: String,
            required: false,
            trim: true
        },
        username: {
            type: String,
            required: false,
            trim: true
        },
        isActive: {
            type: Boolean,
            default: false
        }
    },
    options
)
export const BaseAuth = mongoose.model("BaseAuth", BaseAuthSchema);
