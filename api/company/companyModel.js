import mongoose, { Schema } from "mongoose";

const companySchema = new Schema({
    name:{String,required:true},
    CompanyType:{String,required:true},
    description:{String,requied:true},
    headCouters:{String},
    employeeCount:{number,requied:true}
})

const company= mongoose.model('company',companySchema);

export default company;