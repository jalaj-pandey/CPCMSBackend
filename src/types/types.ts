import { NextFunction, Request, Response } from "express";




export interface NewUserRequestBody {
    _id: string;
    fname: string;
    lname: string;
    email: string;
    photo: string;
    role: "admin" | "user";
    gender: "male" | "female";
    dob: Date;
    createdAt: Date;
    updatedAt: Date;
    age: number;
}

export type controllerType = (
    req: Request<{},{},NewUserRequestBody>, 
    res: Response, 
    next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;