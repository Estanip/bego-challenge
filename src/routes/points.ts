import { PointsController } from "../controllers/points";
import { Router } from "express";

export class PointsRoutes {
    public pointsController: PointsController = new PointsController();
    public router: Router = Router();

    constructor() {
        this.router.get('/', this.pointsController.getPoints);
        this.router.get('/coordinates/:placeId', this.pointsController.getPointCoordinates);
    }
}