import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewJobRequestBody } from "../types/types.js";
import { Jobs } from "../models/jobs.js";
import ErrorHandler from "../types/utility-class.js";
import { rm } from "fs";

export const newJob = TryCatch(
  async (req: Request<{}, {}, NewJobRequestBody>, res, next) => {
    const { _id, name, title, description, requirements, salary, location } =
      req.body;
    const photo = req.file;

    if (!photo) return next(new ErrorHandler("Please provide a photo", 400));
    if(!_id || !name || !title || !description || !requirements || !salary || !location) 
    {
        rm(photo.path,()=>{
            console.log("deleted")
        })
        return next(new ErrorHandler("Please provide all fields", 400));
    }


    await Jobs.create({
      _id,
      name,
      title,
      description,
      requirements,
      salary,
      location,
      photo: photo.path,
    });

    return res.status(201).json({
      success: true,
      Message: "Job created successfully",
    });
  }
);
