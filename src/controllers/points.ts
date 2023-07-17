import { Request, Response } from "express";
import { getLocationCoordinates } from "../services/google-maps";

import Point from "../models/point";

export class PointsController {
    public async getPoints(req: Request, res: Response) {
        try {
            const points = await Point.find().exec();

            return res.status(200).send(points);
        } catch (error) {
            return res.status(500).send({ success: false, message: error?.message });
        }
    };

    public async getPointCoordinates(req: Request, res: Response) {
        try {
            const { placeId } = req.params;
            const coordinates = await getLocationCoordinates(placeId);

            return res.status(200).send(coordinates);
        } catch (error) {
            return res.status(500).send({ success: false, message: error?.message });
        }
    };

}