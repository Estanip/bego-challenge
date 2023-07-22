import { NextFunction, Request, Response } from "express";
import { getLocationCoordinates } from "../services/google-maps";

import Point from "../models/point";

export class PointsController {
  public async getPoints(req: Request, res: Response, next: NextFunction) {
    try {
      const points = await Point.find().exec();

      res.status(200).send(points);

      return next();
    } catch (error: unknown) {
      res.status(500).send({
        success: false,
        error,
        message: "Error when trying to get points",
      });
      return next(error);
    }
  }

  public async getPointCoordinates(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { placeId } = req.params;
      const coordinates = await getLocationCoordinates(placeId);

      res.status(200).send(coordinates);
      return next();
    } catch (error: unknown) {
      res.status(500).send({
        success: false,
        error,
        message: "Error when trying to get coordinates",
      });
      return next(error);
    }
  }
}
