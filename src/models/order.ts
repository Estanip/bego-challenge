import Route from "./route";
import Truck from "./truck";
import { NextFunction } from "express";
import { IOrder } from "../interfaces/Order";
import { IRoute } from "../interfaces/Route";
import { ITruck } from "../interfaces/Truck";
import { Schema, model, Types } from "mongoose";

const OrderSchema: Schema = new Schema(
  {
    type: { type: String },
    description: { type: String },
    status: {
      type: String,
      enum: ["delayed", "inProcess", "completed"],
    },
    route: {
      type: Types.ObjectId,
      ref: "Route",
    },
    truck: {
      type: Types.ObjectId,
      ref: "Truck",
    },
  },
  {
    timestamps: true,
  }
);

OrderSchema.pre<IOrder>("save", async function (next: NextFunction) {
  const route: IRoute = await Route.findById(this.route).exec();
  const truck: ITruck = await Truck.findById(this.truck).exec();

  if (!truck) throw new Error("Truck does not exists");
  if (!route) throw new Error("Route does not exists");

  if (route && truck) return next();
});

export default model<IOrder>("Order", OrderSchema);
