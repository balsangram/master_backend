import mongoose from "mongoose";

const artistSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required: true
        },
        // audio:[
        //     {
        //     type:mongoose.Schema.Types.ObjectId,
        //     ref:"Audio"
        // }],
        img:{
            type:String,
            require:false
        }
    }
)

export const Artist = mongoose.model("Artist" ,artistSchema);