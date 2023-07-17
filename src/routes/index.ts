import { AuthRoutes } from "./auth";
import { TrucksRoutes } from "./trucks";
import { PointsRoutes } from "./points";
import { RoutesRoutes } from "./routes";
import { OrdersRoutes } from "./orders";

export class Routes {
    public authRoutes: AuthRoutes = new AuthRoutes();
    public trucksroutes: TrucksRoutes = new TrucksRoutes();
    public pointsRoutes: PointsRoutes = new PointsRoutes();
    public routesRoutes: RoutesRoutes = new RoutesRoutes();
    public ordersRoutes: OrdersRoutes = new OrdersRoutes();
};