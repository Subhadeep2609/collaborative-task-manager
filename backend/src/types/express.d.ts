declare module 'express';
declare module 'cookie-parser';
declare module 'bcrypt';
declare module 'jsonwebtoken';
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export interface AuthRequest extends Request {
  userId: string;
  body: any;
  params: any;
  query: any;
}