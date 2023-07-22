import { NextFunction, Request, Response } from "express";
import { IUser } from "../interfaces/User";
import User from "../models/user";

export class AuthController {
  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const user: IUser = await User.findOne({ email }).exec();

      if (user) {
        res
          .status(403)
          .send({ success: false, message: "User already exists" });

        return next();
      }

      await new User({ email, password }).save();

      res.status(200).send({
        success: true,
        message: "User register successfully",
      });

      return next();
    } catch (error: unknown) {
      res.status(500).send({
        success: false,
        error,
        message: "Error when trying to register",
      });
      return next(error);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(403).send({ success: false, message: "Invalid data" });
        return next();
      }

      const user: IUser = await User.findOne({ email }).exec();

      if (!user) {
        res
          .status(404)
          .send({ success: false, message: "User does not exists" });
        return next();
      }

      if (user) {
        const validatePassword: boolean = await user.validatePassword(password);

        if (!validatePassword) {
          res
            .status(403)
            .send({ success: false, message: "Incorrect password" });

          return next();
        }

        if (validatePassword) {
          const token = await user.generateToken();

          res
            .status(200)
            .send({ success: true, message: "Login successfully", token });

          return next();
        }
      }
    } catch (error: unknown) {
      res.status(500).send({
        success: false,
        error,
        message: "Error when trying to register",
      });
      return next(error);
    }
  }
}
