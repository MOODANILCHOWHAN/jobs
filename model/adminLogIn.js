
import mongoose, { Schema } from "mongoose";

const adminLogIn = new Schema( {

    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})

const adminlogIns= mongoose.model('adminLogIn',adminLogIn);
export default adminlogIns;