
import mongoose, { Schema } from "mongoose";

const adminLogIn = new Schema( {

    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})

const adminlogIn= mongoose.model('adminLogIn',adminLogIn);
export default adminlogIn;