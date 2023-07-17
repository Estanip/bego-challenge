import { Document } from "mongoose";

export interface IRoute extends Document {
    from: string;
    to: string;
    distance: number;
};