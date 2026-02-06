import { types } from "joi";
import mongoose from "mongoose";

const artistSchema = new mongoose.Schema(
    {
        name:{
            types:String,
            required: true
        },
        audio:[
            {
            types:mongoose.Schema.Types.ObjectId,
            ref:"Audio"
        }],
        img:{
            types:String,
            require:false
        }
    }
)

export const Artist = mongoose.model("Artist" ,artistSchema);