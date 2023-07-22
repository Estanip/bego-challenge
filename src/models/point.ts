import { IPoint } from "../interfaces/Point";
import { Schema, model } from "mongoose";

const PointSchema: Schema = new Schema({
  location: {
    name: { type: String },
    placeId: { type: String },
  },
});

export default model<IPoint>("Point", PointSchema);
