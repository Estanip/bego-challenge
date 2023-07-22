import { ITruck } from "../interfaces/Truck";
import { Schema, model } from "mongoose";

const TruckSchema: Schema = new Schema({
  model: { type: String },
  make: { type: String },
  year: { type: Number },
  color: { type: String },
  transportWeight: { type: Number },
  created_at: {
    type: Date,
    default: new Date(),
  },
});

export default model<ITruck>("Truck", TruckSchema);
