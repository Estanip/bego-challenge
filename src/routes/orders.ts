import { OrdersController } from '../controllers/orders';
import { Router } from 'express';

export class OrdersRoutes {
    public ordersController: OrdersController = new OrdersController();
    public router: Router = Router();

    constructor() {
    }
}