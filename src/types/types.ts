import { NextFunction, Request, Response } from "express";

export interface NewJobRequestBody {
  _id: string;
  name: string;
  photo: string;
  title: string;
  description: string;
  requirements: string;
  salary: number;
  location: string;
}

export interface NewUserRequestBody {
  _id: string;
  name: string;
  email: string;
  photo: string;
  role: "admin" | "user";
  gender: "male" | "female";
  dob: Date;
}

export type controllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;
