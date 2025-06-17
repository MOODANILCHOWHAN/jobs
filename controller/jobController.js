import jobDetail from "../model/job.js";
const createJob= async(req,res)=>{
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
}

export default createJob;