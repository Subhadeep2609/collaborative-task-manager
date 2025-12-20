import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      body: any;
      params: any;
      cookies?: {
        [key: string]: any;
      };
    }
  }
}

declare module "express";
