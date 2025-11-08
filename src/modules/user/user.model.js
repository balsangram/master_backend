import mongoose from "mongoose";
import { BaseUser } from "./BaseUser.model.js";
const UserSchema = new mongoose.Schema(
    {
        "dob": {
            type: Date,
            require: false,
        },
        "age": {
            type: Number,
            require: false
        }
    }
)

export const User = BaseUser.discriminator("user", UserSchema);