import { Router } from "express";
import { RoutesController } from "../controllers/routes";

export class RoutesRoutes {
  public router: Router = Router();
  public routesController: RoutesController = new RoutesController();

  constructor() {
    this.router.post("/", this.routesController.createRoute);
    this.router.get("/:id", this.routesController.getRouteById);
    this.router.put("/:id", this.routesController.updateRouteById);
    this.router.delete("/:id", this.routesController.deleteRouteById);
  }
}
