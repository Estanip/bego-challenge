import express from "express";
import cors from "cors";
import { connection } from "./db/connection";
import { Routes } from "./routes/index";
import { validateToken } from "./middlewares/validateToken";
import { setSwaggerResponse, setSwaggerRequest } from "./utils/swagger";
import { loadEnv } from "./env";

class App {
  public app = express();
  public routes: Routes = new Routes();

  constructor() {
    loadEnv();
    setSwaggerResponse(this.app);
    this.setConfig();
    this.setRoutes();
    connection();
    setSwaggerRequest();
  }

  private setConfig(): void {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private setRoutes(): void {
    /* Routes without token */
    this.app.use("/auth", this.routes.authRoutes.router);

    /* Routes with token */
    this.app.use(validateToken);
    this.app.use("/orders", this.routes.ordersRoutes.router);
    this.app.use("/points", this.routes.pointsRoutes.router);
    this.app.use("/trucks", this.routes.trucksroutes.router);
    this.app.use("/routes", this.routes.routesRoutes.router);
  }
}

export default new App().app;
