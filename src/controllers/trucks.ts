import { NextFunction, Request, Response } from "express";
import Truck from "../models/truck";

export class TrucksController {
  public async getTrucks(req: Request, res: Response, next: NextFunction) {
    try {
      const trucks = await Truck.find().exec();

      res.status(200).send(trucks);
      return next();
    } catch (error) {
      res.status(500).send({
        success: false,
        error,
        message: "Error when trying to get routes",
      });
      return next(error.message);
    }
  }
}
