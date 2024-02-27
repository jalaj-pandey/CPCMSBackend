import {NextFunction, Request, Response} from "express";
import {User} from "../models/user.js"
import { NewUserRequestBody } from "../types/types.js";
export const newUser = async (
    req: Request<{},{},NewUserRequestBody>, 
    res: Response, 
    next: NextFunction)=>{
    try {
        const {fname, lname,email, photo,gender, role, _id, dob} =  req.body;
        const user = await User.create({
            fname, lname,email, photo,gender, role, _id, dob
        })
            return res.status(200).json({
                success:true,
                message:  `Welcome, ${user.fname}`
            })
        
        
    } catch (error) {
        return res.status(200).json({
            success:true,
            message:  error
        })
    }
};