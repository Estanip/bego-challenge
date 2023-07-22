import jwt from "jsonwebtoken";
import { env } from "../env";

async function generateToken(userId: string) {
  try {
    return jwt.sign({ user_id: userId }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRE,
    });
  } catch (error) {
    throw new Error(error);
  }
}

export { generateToken };
