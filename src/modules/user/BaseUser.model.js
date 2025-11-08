import mongoose from "mongoose";
const options = {
    discriminatorKey: "role",
    timestamps: true
}
const BaseUserSchema = new mongoose.Schema(
    {
        "name": {
            type: String,
            required: false,
            trim: true
        },
        "mobile": {
            type: Number,
            required: false,
            trim: true
        },
        "email": {
            type: String,
            required: false,
            trim: true
        },
        "username": {
            type: String,
            require: false,
            trim: true
        }
    },
    options
)
export const BaseUser = mongoose.model("BaseUser", BaseUserSchema);
