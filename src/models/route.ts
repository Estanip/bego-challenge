import { Schema, model } from "mongoose";
import { IRoute } from "../interfaces/Route";
import { NextFunction } from "express";

const RouteSchema: Schema = new Schema(
  {
    from: { type: String },
    to: { type: String },
    distance: { type: Number },
  },
  {
    timestamps: true,
  }
);

RouteSchema.pre<IRoute>("validate", async function (next: NextFunction) {
  if (this.to === this.from)
    throw new Error("Origin and destination cannot be the same");
  else return next();
});

export default model<IRoute>("Route", RouteSchema);
