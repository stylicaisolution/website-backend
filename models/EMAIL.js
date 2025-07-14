import mongoose from "mongoose";

const emailSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            required:true
        }
    }
)

export default mongoose.model('email',emailSchema)