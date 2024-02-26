import {NextFunction, Request, Response} from "express";
import {User} from "../models/user.js"
import { NewUserRequestBody } from "../types/types.js";
export const newUser = async (
    req: Request<{},{},NewUserRequestBody>, 
    res: Response, 
    next: NextFunction)=>{
    try {
        const {fname, lname,photo,gender } =  req.body;
        const user = await User.create({})
            return res.status(200).json({
                success:true,
                message:  `Welcome, ${user.fname}`
            })
        
        
    } catch (error) {
        
    }
};