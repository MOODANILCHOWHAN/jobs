import mongoose, { Schema } from "mongoose";

const job = new Schema({

    jobName: { type: String, require: true }
    ,
    jobExperience: { type: Number, require: true },
    company: { type: String, require: true },
    description: { type: String, require: true },
    location: { type: String, require: true },
    interviewType: { type: String, require: true },
    link: { type: String, require: true }

});

const jobDetail=mongoose.model('Job',job);
export default jobDetail;