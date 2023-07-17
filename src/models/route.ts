import { Schema, model } from "mongoose";
import { IRoute } from "../interfaces/Route";

const RouteSchema: Schema = new Schema({
    from: { type: String },
    to: { type: String },
    distance: { type: Number }
},
    {
        timestamps: true
    }
);

export default model<IRoute>('Route', RouteSchema);