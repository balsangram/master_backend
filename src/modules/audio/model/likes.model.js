import { types } from "joi";
import mongoose from "mongoose";

const likesSchema = new mongoose.Schema({
user:{
    types:mongoose.Schema.Types.ObjectId,
    ref:"BaseAuth"
},
likesSong:{
    types:mongoose.Schema.Types.ObjectId,
    ref:"Audio"
},
likesPlayList:{
    types:mongoose.Schema.Types.ObjectId,
    req:"PlayList"
},

})

export const Likes = mongoose.model("Likes",likesSchema);