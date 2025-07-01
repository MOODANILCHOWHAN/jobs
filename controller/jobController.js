import res from "express/lib/response.js";
import jobDetail from "../model/job.js";
// import { sortData } from "../services/sort.js";
const jobs= {
   createJob: async(req,res)=>{
    try {
        const {  jobName,jobType,city,jobExperience,company,description,location,interviewType,link,
        status,createdAt}= req.body;
        const imgBuffer= req.file?req.file.buffer:null;
        const job= new jobDetail(
            { jobName,jobType,city,jobExperience,company,description,location,interviewType,link,
              status,createdAt,image:imgBuffer
            }
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
      const data = await jobDetail.find().sort(-1); // this is the issue area
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
  },
  getJobByNames: async(req,res)=>{
    const allowFileds=['jobName','jobExperience','company','location','interviewType']
    const {field,value} = req.query;

    if(!allowFileds.includes(field)){
      return res.status(404).json({message:'invalid field'});
    }

    try {
      const query={};
      query[field]=value;
      const data = await jobDetail.find(query).sort(-1);

      if(!data){
        res.status(404).json({message:'no data found'});
      }
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error)
    }
  }
}
export default jobs;
