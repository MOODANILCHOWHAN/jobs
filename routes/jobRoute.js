import express from "express";
import jobs from '../controller/jobController.js'
import multer from "multer";
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
router.get('/getAllJobs',jobs.getJobs);
router.get('/getJob/:id',jobs.getSingleJob);
router.get('/getByField', jobs.getJobByNames)

export default router;