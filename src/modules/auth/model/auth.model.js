import mongoose from "mongoose";
import { BaseAuth } from "./baseAuth.model.js";
const authSchema = new mongoose.Schema(
    {
        dob: {
            type: Date,
            require: false,
        },
        age: {
            type: Number,
            require: false
        }
    }
)

export const auth = BaseAuth.discriminator("auth", authSchema);