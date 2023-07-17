import { TrucksController } from "../controllers/trucks";
import { Router } from "express";

export class TrucksRoutes {
    public trucksController: TrucksController = new TrucksController();
    public router: Router = Router();

    constructor() {
        this.router.get('/', this.trucksController.getTrucks);
    }
}