import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { newApplicationRequestBody } from "../types/types.js";
import { Apply } from "../models/application.js";
import ErrorHandler from "../types/utility-class.js";


export const newApplication = TryCatch(async (req:Request<{},{},newApplicationRequestBody>,res,next) => {

    const {jobInfo, userInfo} = req.body

    if(!jobInfo || !userInfo){
        return next(new ErrorHandler("Please enter required fields",400))
    }

    await Apply.create({
        jobInfo, userInfo
    })
    return res.status(201).json({
        success: true,
        message: "Applied successfully"
    })
})