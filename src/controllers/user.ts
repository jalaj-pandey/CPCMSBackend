import {NextFunction, Request, Response} from "express";
import {User} from "../models/user.js"
import { NewUserRequestBody } from "../types/types.js";
import { TryCatch } from "../middlewares/error.js";
export const newUser = TryCatch(
    async (
        req: Request<{},{},NewUserRequestBody>, 
        res: Response, 
        next: NextFunction)=>{
            const {fname, lname,email, photo,gender, role, _id, dob} =  req.body;
            const user = await User.create({
                fname, 
                lname,
                email, 
                photo,
                gender, 
                role, 
                _id, 
                dob: new Date(dob),
            })
                return res.status(201).json({
                    success:true,
                    message:  `Welcome, ${user.fname}`
                })
    }
)