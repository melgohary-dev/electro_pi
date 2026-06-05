import jwt from "jsonwebtoken";

const rawSecret = process.env.JWT_SECRET;

if (!rawSecret) {
  throw new Error("JWT_SECRET environment variable is required");
}

const JWT_SECRET: string = rawSecret;

/** Payload stored in the JWT token. */
export interface JwtPayload {
  userId: string;
  email: string;
  name: string;
}

/** Signs a JWT token with 1-day expiration. */
export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}

/** Verifies and decodes a JWT token. Throws if invalid or expired. */
export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}
