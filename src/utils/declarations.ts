// Merge Declarations

import { Document } from "mongoose";
declare module "mongoose" {
  interface Document {
    password: string;
  }
}

import { Request, Response } from "express";
declare module "express" {
  interface Request {
    user: {
      id: any;
      email: string;
      kombuchas: [object];
    };
  }
}
