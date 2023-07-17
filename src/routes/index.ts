import { AuthRoutes } from "./auth";
import { TrucksRoutes } from "./trucks";

export class Routes {
    public authRoutes: AuthRoutes = new AuthRoutes();
    public trucksroutes: TrucksRoutes = new TrucksRoutes();
};