import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

/**
 * AuthRequest
 * Extends Express Request to include userId and cookies
 */
export interface AuthRequest extends Request {
  userId?: string;
  cookies: {
    token?: string;
    [key: string]: any;
  };
}

/**
 * Authentication middleware
 */
export const requireAuth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const payload = verifyToken(token);
    req.userId = payload.userId;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};
