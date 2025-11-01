import res from "express/lib/response.js";
import jobDetail from "../model/job.js";
import { sortData } from "../services/sort.js";
const jobs = {
  createJob: async (req, res) => {
    try {
      const { jobName, jobType, city, industryType, jobExperience, company, description, location, interviewType, link,
        status, createdAt, } = req.body;
      const imgBuffer = req.file ? req.file.buffer : null;
      const job = new jobDetail(
        {
          jobName, jobType, city, industryType, jobExperience, company, description, location, interviewType, link,
          status, createdAt, image: imgBuffer
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
      const { page = 1, company, location, jobName, industryType } = req.query;
  
      // Build dynamic OR query
      const orConditions = [];
      if (company) orConditions.push({ company: { $regex: company, $options: 'i' } });
      if (location) orConditions.push({ location: { $regex: location, $options: 'i' } });
      if (jobName) orConditions.push({ jobName: { $regex: jobName, $options: 'i' } });
      if (industryType) orConditions.push({ industryType: { $regex: industryType, $options: 'i' } });
  
      const query = orConditions.length > 0 ? { $or: orConditions } : {};
  
      const limit = 10;
      const skip = (page - 1) * limit;
      const currentPages=page;
      const dataDB = await jobDetail.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit);
      const totalJobs=  await jobDetail.countDocuments(query);
      // const data = sortData(dataDB, page); // assuming this paginates correctly
      res.status(200).json({ jobs: dataDB, totalJobs: totalJobs,currentPage:currentPages });
    } catch (error) {
      console.error("GET error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getSingleJob: async (req, res) => {
    try {
      const id = req.params.id
      const data = await jobDetail.findById(id);

      if (!data) {
        return res.status(400).json({ message: 'no data found for this id' })
      }
      res.status(200).json(data);
    } catch (error) {
      res.status(501).json(error)
    }
  },
  getJobByNames: async (req, res) => {
    const allowFileds = ['jobName', 'jobExperience', 'company', 'location', 'interviewType']
    const { field, value } = req.query;

    if (!allowFileds.includes(field)) {
      return res.status(404).json({ message: 'invalid field' });
    }

    try {
      const query = {};
      query[field] = value;
      const data = await jobDetail.find(query).sort({ createdAt: -1 });

      if (!data) {
        res.status(404).json({ message: 'no data found' });
      }
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error)
    }
  },
  getJobByIndusty:async(req,res)=>{
    try {
      let industryTypes = req.params.industry;
      industryTypes=industryTypes.toUpperCase();
      console.log(industryTypes)
      let data = await jobDetail.find( { industryType:  industryTypes}).sort({ createdAT: -1 });
      console.log(data)
      data = data.slice(0, 3); // safer than splice
  
      if (data.length === 0) {
        return res.status(204).json({ message: 'No jobs are found.' });
      }
  
      res.status(200).json({ jobs: data });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getJObsSuggestions: async (req,res)=>{
    try {
      const reffJobId=req.params.id;
      const reffJob = await jobDetail.findById(reffJobId);
      if(!reffJob){
        return res.status(204).json({message:'Job reference was not found.'})
      }
      
      const suggestionJobs= await jobDetail.aggregate([
        {
          $match:{
            $or :[
            // {jobExperience:reffJob.jobExperience},
            {jobName:reffJob.jobName},
            {industryType:reffJob.industryType}
            ]
          }
        } 
      ]
      );
      if(suggestionJobs.length<8){
        const suggestionJOb2 = await jobDetail.aggregate([
          {
            $match:{
              $or:[
                {company:reffJob.company}
              ]
            }
          }
        ])
        suggestionJobs.push(suggestionJOb2);
      }
      res.status(200).json(suggestionJobs.slice(0,8));
    } catch (error) {
      res.status(500).json({message:error.message})
    }
  }
}
export default jobs;
