import { Request, Response } from "express";
import Order from "../models/order";
import { IOrder } from "../interfaces/Order";

export class OrdersController {

    public async createOrder(req: Request, res: Response) {
        try {
            const { type, description, status, route, truck } = req.body;

            const newOrder: IOrder = new Order({
                type,
                description,
                status,
                route,
                truck
            });

            await newOrder.save();

            return res.status(200).send({ success: true, message: 'Order succesfully created' });
        } catch (error) {
            return res.status(500).send({ success: false, message: error?.message });
        }
    };

    public async updateOrderStatus(req: Request, res: Response) {
        try {
            const { id, status } = req.params;

            const order = await Order.findByIdAndUpdate(id, { status }).exec();

            if (!order) return res.status(200).send({ success: false, message: 'Order does not exists' });
            return res.status(200).send({ success: true, message: 'Order succesfully updated' });
        } catch (error) {
            return res.status(500).send({ success: false, message: error?.message });
        }
    };

    public async deleteOrder(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const { status } = await Order.findById(id, 'status').exec();

            if (status === 'inProcess') return res.status(400).send({ success: false, message: 'Cannot delete, order status is in process' });
            else {
                const order: IOrder = await Order.findByIdAndDelete(id).exec();

                if (order) return res.status(200).send({ success: true, message: 'Order successfully removed' });
                else return res.status(400).send({ success: false, message: 'Order does not exists' });
            }
        } catch (error) {
            return res.status(500).send({ success: false, message: error?.message });
        }
    };

    public async updateOrder(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const { status } = await Order.findById(id, 'status').exec();

            if (status === 'inProcess') return res.status(400).send({ success: false, message: 'Cannot update, order status is in process' });
            else {
                await Order.findByIdAndUpdate(id, req.body).exec();
                return res.status(200).send({ success: true, message: 'Order succesfully updated' });
            }
        } catch (error) {
            return res.status(500).send({ success: false, message: error?.message });
        }
    };

};