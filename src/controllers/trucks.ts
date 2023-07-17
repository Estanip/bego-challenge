import { Request, Response } from "express";
import Truck from '../models/truck';

export class TrucksController {

    public async getTrucks(req: Request, res: Response) {
        try {
            const trucks = await Truck.find().exec();
            return res.status(200).send(trucks);
        } catch (error) {
            return res.status(500).send({ success: false, message: error?.message });
        }
    };

};