import { AuthController } from "../controllers/auth";
import { Router } from "express";

export class AuthRoutes {
  public authController: AuthController = new AuthController();
  public router: Router = Router();

  constructor() {
    this.router.post("/register", this.authController.register);
    this.router.post("/login", this.authController.login);
  }
}
