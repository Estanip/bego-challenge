import { NextFunction, Request, Response } from "express";
import Order from "../models/order";
import { IOrder, Orderstatus } from "../interfaces/Order";
export class OrdersController {
  public async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      await new Order(req.body).save();

      res
        .status(200)
        .send({ success: true, message: "Order succesfully created" });

      return next();
    } catch (error: unknown) {
      res.status(500).send({
        success: false,
        error,
        message: "Error when trying to create order",
      });
      return next(error);
    }
  }

  public async updateOrderStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id, status } = req.params;

      const order = await Order.findByIdAndUpdate(id, { status }).exec();

      if (!order) {
        return res
          .status(403)
          .send({ success: false, message: "Order does not exists" });
      }

      res
        .status(200)
        .send({ success: true, message: "Order succesfully updated" });

      return next();
    } catch (error: unknown) {
      res.status(500).send({
        success: false,
        error,
        message: "Error when trying to update order status",
      });
      return next(error);
    }
  }

  public async deleteOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const { status }: Orderstatus = await Order.findById(id, "status").exec();

      if (status === "inProcess") {
        res.status(403).send({
          success: false,
          message: "Cannot delete, order status is in process",
        });

        return next();
      } else {
        const order: IOrder = await Order.findByIdAndDelete(id).exec();

        if (order) {
          res
            .status(200)
            .send({ success: true, message: "Order successfully removed" });

          return next();
        }

        res
          .status(404)
          .send({ success: false, message: "Order does not exists" });

        return next();
      }
    } catch (error: unknown) {
      res.status(500).send({
        success: false,
        error,
        message: "Error when trying to delete order",
      });
      return next(error);
    }
  }

  public async updateOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const { status }: Orderstatus = await Order.findById(id, "status").exec();

      if (status === "inProcess") {
        res.status(403).send({
          success: false,
          message: "Cannot update, order status is in process",
        });

        return next();
      }

      await Order.findByIdAndUpdate(id, req.body).exec();

      res
        .status(200)
        .send({ success: true, message: "Order succesfully updated" });

      return next();
    } catch (error: unknown) {
      res.status(500).send({
        success: false,
        error,
        message: "Error when trying to update order",
      });
      return next(error);
    }
  }
}
