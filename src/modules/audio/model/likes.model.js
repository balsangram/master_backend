import { types } from "joi";
import mongoose from "mongoose";

const likesSchema = new mongoose.Schema({
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"BaseAuth"
},
likesSong:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Audio"
},
likesPlayList:{
    type:mongoose.Schema.Types.ObjectId,
    req:"PlayList"
},

})

export const Likes = mongoose.model("Likes",likesSchema);