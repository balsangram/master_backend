import mongoose from "mongoose";

const playListSchema = new mongoose.Schema({
coverImg:{
    types :String,
    required:false
},
name:{
    types:String,
    required:true
},
audio:{
    types: mongoose.Schema.Types.ObjectId,
    ref:"Audio"
}
}) 

export const PlayList = mongoose.model("PlayList",playListSchema);
