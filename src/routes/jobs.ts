import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import { getAdminJobs, getLatestJobs, getSingleJobs, newJob, updateJob } from "../controllers/jobs.js";
import { singleUpload } from "../middlewares/multer.js";

const app = express.Router();

//Create new job - /api/v1/job/new
app.post('/new', adminOnly, singleUpload, newJob);

// To get 10 latest jobs - /api/v1//job/latest
app.get('/latest', getLatestJobs);

// To get all jobs - /api/v1/job/admin-jobs
app.get('/admin-jobs', getAdminJobs);

app.route('/:id')
    .get(getSingleJobs)
    .put(singleUpload,updateJob)


export default app;