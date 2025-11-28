import mongoose from "mongoose";
import { BaseAuth } from "../../auth/model/baseAuth.model.js";
const AdminSchema = new mongoose.Schema({
    isActive: {
        type: Boolean,
        default: true
    }
})

export const AdminAuth = BaseAuth.discriminator("admin", AdminSchema);