import * as express from "express";
import bodyParser = require("body-parser");
import connection from './db/connection';
import { Routes } from "./routes/index";
import { validateToken } from "./middlewares/validateToken";

import 'dotenv/config';

class App {
    public app: express.Application;
    public routes: Routes = new Routes();
    public connection = connection();

    constructor() {
        this.app = express();

        this.setConfig();
        this.setRoutes();
    }

    private setConfig(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private setRoutes(): void {
        /* Routes without token */
        this.app.use('/auth', this.routes.authRoutes.router);

        /* Routes with token */
        this.app.use(validateToken);
        this.app.use('/orders', this.routes.ordersRoutes.router);
        this.app.use('/points', this.routes.pointsRoutes.router);
        this.app.use('/trucks', this.routes.trucksroutes.router);
        this.app.use('/routes', this.routes.routesRoutes.router);
    }
}

export default new App().app;