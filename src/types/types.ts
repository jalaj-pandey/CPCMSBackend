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
  resume: string;
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

export type searchRequestQuery = {
  search?: string;
  company?: string;
  salary?: string;
  sort?: string;
  page?: string;
};

export interface BaseQuery {
  name?: {
    $regex: string;
    $options: string;
  };
  salary?: {
    $lte: Number;
  };
  title?: {
    $regex: string;
    $options: string;
  };
}

export type InvalidateCacheProps = {
  jobs?: boolean;
  apply?: boolean;
  admin?: boolean;
  userId?: string;
  applyId?: string;
  jobId?: string;
};

export type jobInfoType = {
  name: String;
  title: String;
  salary: Number;
  location: String;
  jobId: String;
};

export type userInfoType = {
  name: String;
  email: String;
  photo: String;
  gender: String;
  dob: Date;
  userId: String;
};

export interface newApplicationRequestBody {
  user: string;
  userInfo: userInfoType[];
  jobInfo: jobInfoType[];
}
