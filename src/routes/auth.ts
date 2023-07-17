import { AuthController } from '../controllers/auth';
import { Router } from 'express';

export class AuthRoutes {
    public authController: AuthController = new AuthController();
    public router: Router = Router();

    constructor() {
    }
}