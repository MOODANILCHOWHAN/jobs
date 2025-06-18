import express from "express";
import jobs from '../controller/jobController.js'

const router = express.Router();

router.post('/createJob',jobs.createJob);
router.get('/getAllJobs',jobs.getJobs);

export default router;