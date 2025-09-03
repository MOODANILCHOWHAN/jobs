
import mongoose, { Schema } from "mongoose";

const adminLogIn = new Schema( {

    email:{type:String,required:true,unique:true, match: /^\S+@\S+\.\S+$/},
    password:{type:String,required:true,
            match: /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/
        }
})

const adminlogIns= mongoose.model('adminLogIn',adminLogIn);
export default adminlogIns;