import mongoose from "mongoose";

const audioSchema = new mongoose.Schema(
    {
      name:{
        types:String,
        required :true
      },
      img:{
        types:String,
        required:false
      },
      song:{
        types:String,
        required:true
      },
      artist:{
        types:mongoose.Schema.Types.ObjectId,
        ref:"Artist"
      }
    }
)

export const Audio = mongoose.model('Audio', audioSchema);