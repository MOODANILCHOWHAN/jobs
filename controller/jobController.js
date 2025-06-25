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
getJobs: async (req, res) => {
    try {
      const data = await jobDetail.find(); // this is the issue area
      console.log("Fetched data:", data);
      res.status(200).json(data);
    } catch (error) {
      console.error("GET error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getSingleJob: async (req,res)=>{
    try {
      const id = req.params.id
      const data = await jobDetail.findById(id);

      if(!data){
        return res.status(400).json({message:'no data found for this id'})
      }
      res.status(200).json(data);
    } catch (error) {
      res.status(501).json(error)
    }
  }
}
export default jobs;
