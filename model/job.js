
import mongoose, { Schema } from "mongoose";

const job = new Schema({

    jobName: { type: String, require: true },
    jobType:{type:String,require:true},
    city:{type:String,reuire:true},
    jobExperience: { type: Number, require: true },
    company: { type: String, require: true },
    description: { type: String, require: true },
    location: { type: String, require: true },
    interviewType: { type: String, require: true },
    link: { type: String, require: true },
    status:{type:Boolean,default:true},
    createdAt:{type:Date,default:Date.now()},
    image:{type:Buffer,require:false}
});

const jobDetail=mongoose.model('Job',job);
export default jobDetail;