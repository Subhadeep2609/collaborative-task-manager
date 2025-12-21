import jwt, { JwtPayload as JwtLibPayload } from "jsonwebtoken";

/**
 * Ensure JWT secret exists at runtime
 */
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("❌ JWT_SECRET is not defined in environment variables");
}

/**
 * Custom payload used across the app
 */
export interface AppJwtPayload {
  userId: string;
}

/**
 * Sign JWT token
 */
export const signToken = (payload: AppJwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
};

/**
 * Verify JWT token
 */
export const verifyToken = (token: string): AppJwtPayload => {
  const decoded = jwt.verify(token, JWT_SECRET) as JwtLibPayload;

  if (!decoded || typeof decoded !== "object" || !("userId" in decoded)) {
    throw new Error("Invalid token payload");
  }

  return {
    userId: decoded.userId as string,
  };
};