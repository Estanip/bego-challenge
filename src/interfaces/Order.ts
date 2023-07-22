import { Document, Types } from "mongoose";

export interface IOrder extends Document {
  type: string;
  description: string;
  status: string;
  route: Types.ObjectId;
  truck: Types.ObjectId;
}

export type Orderstatus = Pick<IOrder, "status">;