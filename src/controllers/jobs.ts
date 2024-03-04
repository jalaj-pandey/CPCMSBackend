import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { BaseQuery, NewJobRequestBody, searchRequestQuery } from "../types/types.js";
import { Jobs } from "../models/jobs.js";
import ErrorHandler from "../types/utility-class.js";
import { rm } from "fs";

export const newJob = TryCatch(
  async (req: Request<{}, {}, NewJobRequestBody>, res, next) => {
    const { _id, name, title, description, requirements, salary, location } = req.body;
    const photo = req.file;

    if (!photo) return next(new ErrorHandler("Please provide a photo", 400));
    
    if (
      !name ||
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location
    ) {
      rm(photo.path, () => {
        console.log("deleted");
      });
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

export const getLatestJobs = TryCatch(async (req, res, next) => {
  const jobs = await Jobs.find({}).sort({ createdAt: -1 }).limit(5);

  return res.status(201).json({
    success: true,
    jobs,
  });
});

export const getAdminJobs = TryCatch(async (req, res, next) => {
  const jobs = await Jobs.find({});
  return res.status(201).json({
    success: true,
    jobs,
  });
});

export const getSingleJob = TryCatch(async (req, res, next) => {
  const job = await Jobs.findById(req.params.id);
  if(!job) return next(new ErrorHandler("Job not found", 404))

  return res.status(201).json({
    success: true,
    job,
  });
});

export const updateJob = TryCatch(
  async (req, res, next) => {
    const id = req.params.id;
    const { name, title, description, requirements, salary, location } = req.body;
    const photo = req.file;
    const job = await Jobs.findById(id);

    if(!job) return next(new ErrorHandler("Job not found", 404))


    if (photo) {
      rm(job.photo!, () => {
        console.log("Old photo deleted");
      });
      job.photo = photo.path;
    }


    if(name) job.name = name;
    if(title) job.title = title;
    if(description) job.description = description;
    if(requirements) job.requirements = requirements;
    if(salary) job.salary = salary;
    if(location) job.location = location;

    await job.save();

    return res.status(200).json({
      success: true,
      Message: "Job updated successfully",
    });
  }
);



export const deleteJob = TryCatch(async (req, res, next) => {
  const job = await Jobs.findById(req.params.id);
  if(!job) return next(new ErrorHandler("Job Not Found", 404))

  rm(job.photo!, () => {
        console.log("Job photo deleted");
      });
  await job.deleteOne();
  return res.status(201).json({
    success: true,
    Message: "Job deleted successfully",

  });
});




export const getAllJobs = TryCatch(
  async (req: Request<{},{},{},searchRequestQuery>, res, next) => {

  const {search,sort,salary,company} = req.query;

  const page = Number(req.query.page) || 1;

  const limit = Number(process.env.JOBS_PER_PAGE) || 8;
  const skip = limit*(page - 1);


  const baseQuery: BaseQuery = {
    
    
  }

  if(search) baseQuery.name = {
    $regex: search, 
    $options: "i",
  };

  if(salary) baseQuery.salary = {
    $lte: Number(salary),
  }

  if(company) baseQuery.company = {
    $regex: company, 
    $options: "i",
  }
  const jobs = await Jobs.find(baseQuery);

  return res.status(201).json({
    success: true,
    jobs,
  });
});