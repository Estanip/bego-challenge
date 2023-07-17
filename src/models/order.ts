import { IOrder } from '../interfaces/Order';
import { Schema, model, Types } from 'mongoose';

const OrderSchema: Schema = new Schema({
    type: { type: String },
    description: { type: String },
    status: {
        type: String,
        enum: ['delayed', 'inProcess', 'completed'],
    },
    route: {
        type: Types.ObjectId,
        ref: 'Route'
    },
    truck: {
        type: Types.ObjectId,
        ref: 'Truck'
    },
},
    {
        timestamps: true
    }
);

export default model<IOrder>("Order", OrderSchema);