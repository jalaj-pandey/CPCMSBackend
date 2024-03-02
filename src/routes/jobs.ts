import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import { newJob } from "../controllers/jobs.js";
import { singleUpload } from "../middlewares/multer.js";

const app = express.Router();

app.post('/new', adminOnly, singleUpload, newJob)

export default app;