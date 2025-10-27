import express from "express";
import jobs from '../controller/jobController.js'
import multer from "multer";
import dump from "../controller/dummpingJobs.js";
const router = express.Router();


// Multer setup — limit: 1MB, allow only image types
const upload = multer({
    limits: { fileSize: 1 * 1024 * 1024 }, // 1MB max
    fileFilter(req, file, cb) {
      if (!file.mimetype.startsWith("image/")) {
        return cb(new Error("Only image files are allowed!"));
      }
      cb(null, true);
    },
  });

router.post('/createJob', upload.single("image"),jobs.createJob);
router.get('/getAllJobs/:page',jobs.getJobs);
router.get('/getJob/:id',jobs.getSingleJob);
router.get('/getByField', jobs.getJobByNames);
router.get('/getSuggestions/:id',jobs.getJObsSuggestions);
router.get('/getJobByInd/:industry', jobs.getJobByIndusty);
router.post('/dump',dump);
export default router;