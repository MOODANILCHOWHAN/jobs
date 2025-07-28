
import jobDetail from "../model/job.js";
const dump = async (req,res)=>{
try {
    const jobs = Array.isArray(req.body) ? req.body : [req.body];
        const result = await jobDetail.insertMany(jobs);
        res.status(201).json({ message: "Jobs inserted successfully", data: result });
} catch (error) {
    res.status(500).json({ message: error.message });
}
}

export default dump;