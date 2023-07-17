import { Router } from "express";
import { RoutesController } from "../controllers/routes";

export class RoutesRoutes {
    public router: Router = Router();
    public routesController: RoutesController = new RoutesController();

    constructor() {
    }
}