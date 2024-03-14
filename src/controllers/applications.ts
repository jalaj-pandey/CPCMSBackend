import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { newApplicationRequestBody } from "../types/types.js";
import { Apply } from "../models/application.js";
import ErrorHandler from "../types/utility-class.js";
import { myCache } from "../app.js";
import { invalidateCache } from "../utils/features.js";

export const newApplication = TryCatch(
  async (req: Request<{}, {}, newApplicationRequestBody>, res, next) => {
    const { user, jobInfo, userInfo } = req.body;

    if (!user || !jobInfo || !userInfo) {
      return next(new ErrorHandler("Please enter required fields", 400));
    }

    await Apply.create({
      user,
      jobInfo,
      userInfo,
      
    });
    await invalidateCache({
      jobs: true,
      apply: true,
      admin: true,
      userId: user,
    });
    return res.status(201).json({
      success: true,
      message: "Applied successfully",
    });
  }
);

export const myApplications = TryCatch(async (req, res, next) => {
  const { id: user } = req.query;
  const key = `applies-${user}`;
  let applies = [];
  if (myCache.has(key)) applies = JSON.parse(myCache.get(key) as string);
  else {
    applies = await Apply.find({ user });
    myCache.set(key, JSON.stringify(applies));
  }

  return res.status(200).json({
    success: true,
    applies,
  });
});

export const allApplications = TryCatch(async (req, res, next) => {
  const key = `all-applies`;
  let applies = [];
  if (myCache.has(key)) applies = JSON.parse(myCache.get(key) as string);
  else {
    applies = await Apply.find();
    myCache.set(key, JSON.stringify(applies));
  }

  return res.status(200).json({
    success: true,
    applies,
  });
});

export const getSingleJob = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const key = `applies-${id}`;

  let apply;

  if (myCache.has(key)) apply = JSON.parse(myCache.get(key) as string);
  else {
    apply = await Apply.findById(id);
    if (!apply) return next(new ErrorHandler("Application Not Found", 404));
    myCache.set(key, JSON.stringify(apply));
  }

  return res.status(200).json({
    success: true,
    apply,
  });
});

export const processApplication = TryCatch(async (req, res, next) => {
  const { id } = req.params;

  const application = await Apply.findById(id);

  if (!application) return next(new ErrorHandler("Application Not Found", 404));

  switch (application.status) {
    case "Applied":
      application.status = "Shortlisted";
      break;
    case "Shortlisted":
      application.status = "Interview Call";
      break;
    default:
      application.status = "Interview Call";
      break;
  }

  await application.save();

  await invalidateCache({
    jobs: false,
    apply: true,
    admin: true,
    userId: application.user,
    applyId: String(application._id),
  });

  return res.status(200).json({
    success: true,
    message: "Application Processed successfully",
  });
});
