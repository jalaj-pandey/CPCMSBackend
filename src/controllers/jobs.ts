import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewJobRequestBody } from "../types/types.js";
import {Jobs} from "../models/jobs.js";

export const newJob = TryCatch(
    async (req: Request<{}, {}, NewJobRequestBody>,res,next) =>{
        const {_id,name,title,description,requirements,salary,location} = req.body;
        const photo = req.file;

        await Jobs.create({_id,name,title,description,requirements,salary,location,photo:photo?.path})


        return res.status(201).json({
            success: true,
            Message: "Job created successfully"
        })
})