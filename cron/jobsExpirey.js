import cron from "node-cron";
import mongoose from "mongoose";
import jobDetail from "../model/job";


mongoose.connect(process.env.MONGO_URI);
cron.schedule('0 0 * * *',async()=>{
    const expire =  new Date(Date.now()-30*24*60*60*100);

    try{
        const jobs=await jobDetail.find({
            status:true,
            createdAt:{$lte:expire}
        });
        if (jobsToExpire.length === 0) {
            console.log('No jobs need to be expired today.');
            return;
          }
      
          // 2. Update them
          const result = await Job.updateMany(
            { _id: { $in: jobsToExpire.map(job => job._id) } },
            { $set: { status: false } }
          );
          console.log(`[${new Date().toISOString()}] ${result.modifiedCount} jobs marked as expired.`);
    }catch(error){

    }
})