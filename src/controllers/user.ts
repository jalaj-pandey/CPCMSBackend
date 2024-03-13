import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.js";
import { NewUserRequestBody } from "../types/types.js";
import { TryCatch } from "../middlewares/error.js";
import ErrorHandler from "../types/utility-class.js";
import { rm } from "fs";

export const newUser = TryCatch(
  
  async (
    req: Request<{}, {}, NewUserRequestBody>,
    res,
    next
  ) => {
    console.log("chla?")

    const { name, email, gender, role, _id, dob } = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
const photo = files?.['photo']?.[0];
const resume = files?.['resume']?.[0];

    console.log("aarha h?")
    let user = await User.findById(_id);
    
    if (!photo || !resume) return next(new ErrorHandler("Please provide a photo", 400));

    console.log("aaya")

    if (user)
      return res.status(200).json({
        success: true,
        message: `Welcome ${user.name}`,
      });

    if (!_id || !name || !email || !gender || !role || !dob){
      rm(photo.path, () => {
        console.log("deleted");
      });
      rm(resume.path, () => {
        console.log("deleted");
      });
      return next(new ErrorHandler("Please provide all fields", 400));
    }

    user = await User.create({
      name,
      email,
      gender,
      role,
      _id,
      dob: new Date(dob),
      photo: photo.path,
      resume: resume.path,
    });
    return res.status(201).json({
      success: true,
      message: `Welcome, ${user.name}`,
    });
  }
);

export const getAllUsers = TryCatch(async (req, res, next) => {
  const users = await User.find({});
  return res.status(201).json({
    success: true,
    users,
  });
});

export const getUser = TryCatch(async (req, res, next) => {
  // const id = (req.params as { id: string }).id;
  const id = req.params.id;
  const user = await User.findById(id);

  if (!user) return next(new ErrorHandler("Invalid Id", 400));

  return res.status(200).json({
    success: true,
    user,
  });
});

export const deleteUser = TryCatch(async (req, res, next) => {
  const id = (req.params as { id: string }).id;
  // const id = req.params.id;
  const user = await User.findById(id);

  if (!user) return next(new ErrorHandler("Invalid Id", 400));

  await user.deleteOne();

  return res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});
