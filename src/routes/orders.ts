import { OrdersController } from "../controllers/orders";
import { Router } from "express";

export class OrdersRoutes {
  public ordersController: OrdersController = new OrdersController();
  public router: Router = Router();

  constructor() {
    this.router.post("/", this.ordersController.createOrder);
    this.router.delete("/:id", this.ordersController.deleteOrder);
    this.router.put("/:id", this.ordersController.updateOrder);
    this.router.put(
      "/:id/status/:status",
      this.ordersController.updateOrderStatus
    );
  }
}
