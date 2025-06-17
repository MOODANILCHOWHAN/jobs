import express from "express";
import createJob from '../controller/jobController.js'

const router = express.Router();

router.post('/createJob',createJob);

export default router;