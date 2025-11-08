import mongoose from "mongoose";
import { BaseUser } from "../user/BaseUser.model.js";
const AdminSchema = new mongoose.Schema({
    "isActive": {
        type: Boolean,
        default: true
    }
})

export const AdminUSer = BaseUser.discriminator("admin", AdminSchema);