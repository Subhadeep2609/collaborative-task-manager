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
  body: any;  // Add body property
  params: any; // Add params property
}

/**
 * Authentication middleware
 */
export const requireAuth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies?.token;

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const payload = verifyToken(token);
    req.userId = payload.userId;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};