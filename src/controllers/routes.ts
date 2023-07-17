import { Request, Response } from "express";
import { getDistanceBetweenTwoPoints } from "../services/google-maps";
import { IPoint } from "../interfaces/Point";
import { IRoute } from "../interfaces/Route";
import Point from "../models/point";
import Route from "../models/route";
import Order from "../models/order";

export class RoutesController {

    public async getRouteById(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const route: IRoute = await Route.findById(id).exec();

            return res.status(200).send(route);
        } catch (error) {
            return res.status(500).send({ success: false, message: error?.message });
        }
    };

    public async deleteRouteById(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const validateRouteAtOrder = await Order.aggregate([{$match: {route: id, status: 'inProcess'}}])

            if (validateRouteAtOrder?.length > 0) return res.status(400).send({ success: false, message: 'Cannot delete, route is in an order in process' });
            else {
                const route: IRoute = await Route.findByIdAndDelete(id).exec();

                if (route) return res.status(200).send({ success: true, message: 'Route successfully removed' });
                else return res.status(400).send({ success: false, message: 'Route does not exists' });
            }
        } catch (error) {
            return res.status(500).send({ success: false, message: error?.message });
        }
    };

    public async updateRouteById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { pointAId, pointBId } = req.body;

            const validateRouteAtOrder = await Order.findOne({ route: id, status: 'inProcess' }).exec();

            if (validateRouteAtOrder) return res.status(400).send({ success: false, message: 'Cannot update, route is in an order in process' });
            else {
                const validateRouteExists = await Route.findById(id).exec();

                if (validateRouteExists) {
                    if (pointAId && pointBId) {
                        const pointA: IPoint = await Point.findById(pointAId).exec();
                        const pointB: IPoint = await Point.findById(pointBId).exec();

                        if (!pointA || !pointB) return res.status(400).send({ success: false, message: 'Point does not exists' });

                        await Route.findByIdAndUpdate(id, { from: pointA?.location?.name, to: pointB?.location?.name }).exec();
                    }

                    if (pointAId && !pointBId) {
                        const pointA: IPoint = await Point.findById(pointAId).exec();

                        if (!pointA) return res.status(400).send({ success: false, message: 'Point does not exists' });

                        await Route.findByIdAndUpdate(id, { from: pointA?.location?.name }).exec();
                    }

                    if (!pointAId && pointBId) {
                        const pointB: IPoint = await Point.findById(pointBId).exec();

                        if (!pointB) return res.status(400).send({ success: false, message: 'Point does not exists' });

                        await Route.findByIdAndUpdate(id, { to: pointB?.location?.name }).exec();
                    }

                    return res.status(200).send({ success: true, message: 'Route successfully updated' });
                }
            }
        } catch (error) {
            return res.status(500).send({ success: false, message: error?.message });
        }
    };

    public async createRoute(req: Request, res: Response) {
        try {
            const { pointAId, pointBId } = req.body;

            const pointA: IPoint = await Point.findById(pointAId).exec();
            const pointB: IPoint = await Point.findById(pointBId).exec();

            if (pointA && pointB) {

                const validateRouteExists = await Route.findOne({ from: pointA?.location?.name, to: pointB?.location?.name }).exec();

                if (validateRouteExists) return res.status(400).send({ success: false, message: 'Route already exists' });
                else {

                    let distance = await getDistanceBetweenTwoPoints(pointA?.location?.name, pointB?.location?.name);
                    if (distance) distance = Math.floor(Number(distance) / 1000);

                    const newRoute: IRoute = new Route({
                        from: pointA?.location?.name,
                        to: pointB?.location?.name,
                        distance
                    })

                    await newRoute.save();

                    return res.status(200).send({ success: true, message: 'Route succesfully created' });
                }
            } else return res.status(400).send({ success: false, message: 'Cannot find point' });
        } catch (error) {
            return res.status(500).send({ success: false, message: error?.message });
        }
    };

};