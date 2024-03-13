import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { newApplicationRequestBody } from "../types/types.js";


export const newApplication = TryCatch(async (req:Request<{},{},newApplicationRequestBody>,res,next) => {

    const {jobs, user} = req.body

})