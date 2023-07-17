import { AuthRoutes } from "./auth";
import { TrucksRoutes } from "./trucks";
import { PointsRoutes } from "./points";

export class Routes {
    public authRoutes: AuthRoutes = new AuthRoutes();
    public trucksroutes: TrucksRoutes = new TrucksRoutes();
    public pointsRoutes: PointsRoutes = new PointsRoutes();
};