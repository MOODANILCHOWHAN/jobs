import res from "express/lib/response.js";
import jobDetail from "../model/job.js";
const jobs= {
   createJob: async(req,res)=>{
    try {
        const {jobName,jobExperience,company,description,location,interviewType,link}= req.body;
        const job= new jobDetail(
            {jobName,jobExperience,company,description,location,interviewType,link}
        )
        await job.save()
        res.status(201).json(job);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
},
getJobs: async(req,resp)=>{
    try {
        const data= await jobDetail.find();
        console.log("data",json(data));
        resp.status(201).json(data);
    } catch (error) {
        console.log(error)
        resp.status(400).json(error)
    }
}
}
export default jobs;
