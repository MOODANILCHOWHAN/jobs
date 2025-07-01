
import mongoose, { Schema } from "mongoose";

const job = new Schema({

    jobName: { type: String, required: true },
    jobType:{type:String,required:true},
    city:{type:String,reuired:true},
    skils:{type:[String],required:true},
    jobExperience: { type: Number, required: true },
    company: { type: String, required: true },
    description: { type: String, required: false },
    location: { type: String, required: true },
    interviewType: { type: String, required: true },
    link: { type: String, required: true },
    status:{type:Boolean,default:true},
    image:{type:Buffer,required:false}
},{timestamps:true});

const jobDetail=mongoose.model('Job',job);
export default jobDetail;