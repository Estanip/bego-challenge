import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { env } from "../env";
interface User {
  user_id: string;
  iat: number;
  exp: number;
}

async function validateToken(req: Request, res: Response, next: NextFunction) {
  try {
    if (req?.url?.includes("/api-docs/") || req?.url?.includes("/auth"))
      return next();
    else if (req?.url != "/api-docs/") {
      const token = req.headers.access_token as string;

      if (token) {
        jwt.verify(token, env.JWT_SECRET, (error: Error, user: User) => {
          if (user) res.locals.user_id = user?.user_id;

          if (error)
            return res
              .status(400)
              .send({ success: false, message: "Expired Token" });
          next();
        });
      } else {
        return res
          .status(400)
          .send({ success: false, message: "Token validation error" });
      }
    }
  } catch (error) {
    return res.status(500).send(error);
  }
}

export { validateToken };
